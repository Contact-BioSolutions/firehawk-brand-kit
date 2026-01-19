#!/usr/bin/env node

/**
 * Design Token Generation Script
 * Generates design tokens from processed brand assets
 */

const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '../src/assets');
const TOKENS_DIR = path.join(__dirname, '../src/tokens');
const LOGS_DIR = path.join(__dirname, '../logs');

// Ensure logs directory exists
if (!fs.existsSync(LOGS_DIR)) {
  fs.mkdirSync(LOGS_DIR, { recursive: true });
}

const logFile = path.join(LOGS_DIR, `token-generation-${new Date().toISOString().split('T')[0]}.log`);

function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  console.log(logMessage);
  fs.appendFileSync(logFile, logMessage + '\n');
}

function generateColorTokens() {
  log('Generating color tokens from processed assets...');
  
  // Check if there are color specifications to process
  const colorSpecs = {};
  const inboxColors = path.join(__dirname, '../brand-assets-inbox/colors');
  
  if (fs.existsSync(inboxColors)) {
    const colorFiles = fs.readdirSync(inboxColors).filter(f => 
      !f.startsWith('.') && !f.endsWith('.md')
    );
    
    colorFiles.forEach(file => {
      const filePath = path.join(inboxColors, file);
      const ext = path.extname(file).toLowerCase();
      
      try {
        if (ext === '.json') {
          const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          Object.assign(colorSpecs, parseColorData(data));
        } else if (ext === '.css' || ext === '.scss') {
          const css = fs.readFileSync(filePath, 'utf8');
          Object.assign(colorSpecs, parseCSSColors(css));
        }
      } catch (error) {
        log(`❌ Error processing color file ${file}: ${error.message}`);
      }
    });
  }
  
  if (Object.keys(colorSpecs).length > 0) {
    updateColorTokensFile(colorSpecs);
    updateCSSCustomProperties(colorSpecs);
  } else {
    log('No color specifications found to process');
  }
}

function parseColorData(data) {
  const colors = {};
  
  // Handle Figma-style color exports
  if (data.colors) {
    Object.entries(data.colors).forEach(([name, value]) => {
      colors[name] = normalizeColor(value);
    });
  }
  
  // Handle flat color objects
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === 'string' && isValidColor(value)) {
      colors[key] = normalizeColor(value);
    }
  });
  
  return colors;
}

function parseCSSColors(cssContent) {
  const colors = {};
  const colorRegex = /--([^:]+):\s*([^;]+);/g;
  let match;
  
  while ((match = colorRegex.exec(cssContent)) !== null) {
    const name = match[1].trim();
    const value = match[2].trim();
    
    if (isValidColor(value)) {
      colors[name] = normalizeColor(value);
    }
  }
  
  return colors;
}

function isValidColor(color) {
  return /^#[0-9a-fA-F]{6}$/.test(color) || 
         /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/.test(color) ||
         /^hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/.test(color);
}

function normalizeColor(color) {
  if (typeof color === 'string') {
    if (color.startsWith('#')) return color.toLowerCase();
    if (color.startsWith('rgb')) {
      const values = color.match(/\d+/g);
      if (values && values.length >= 3) {
        return '#' + values.slice(0, 3).map(v => 
          parseInt(v).toString(16).padStart(2, '0')
        ).join('');
      }
    }
  }
  return color;
}

function updateColorTokensFile(colorSpecs) {
  const colorsPath = path.join(TOKENS_DIR, 'colors.ts');
  
  try {
    // Create backup
    if (fs.existsSync(colorsPath)) {
      fs.copyFileSync(colorsPath, colorsPath + '.backup');
      log('Created backup of existing colors.ts');
    }
    
    // Organize colors into categories
    const organizedColors = organizeColors(colorSpecs);
    
    // Generate new colors.ts content
    const colorContent = generateColorTokensContent(organizedColors);
    
    fs.writeFileSync(colorsPath, colorContent);
    log(`✅ Updated color tokens with ${Object.keys(colorSpecs).length} colors`);
    
  } catch (error) {
    log(`❌ Error updating color tokens: ${error.message}`);
  }
}

function organizeColors(colorSpecs) {
  const organized = {
    brand: {
      primary: {},
      secondary: {},
      accent: {}
    },
    semantic: {
      success: {},
      warning: {},
      error: {},
      info: {}
    },
    neutral: {}
  };
  
  Object.entries(colorSpecs).forEach(([name, color]) => {
    const lowerName = name.toLowerCase();
    
    // Categorize colors based on name
    if (lowerName.includes('primary') || lowerName.includes('main')) {
      organized.brand.primary['500'] = color;
    } else if (lowerName.includes('secondary')) {
      organized.brand.secondary['500'] = color;
    } else if (lowerName.includes('accent') || lowerName.includes('highlight')) {
      organized.brand.accent['500'] = color;
    } else if (lowerName.includes('success') || lowerName.includes('green')) {
      organized.semantic.success['500'] = color;
    } else if (lowerName.includes('warning') || lowerName.includes('yellow')) {
      organized.semantic.warning['500'] = color;
    } else if (lowerName.includes('error') || lowerName.includes('red') || lowerName.includes('danger')) {
      organized.semantic.error['500'] = color;
    } else if (lowerName.includes('info') || lowerName.includes('blue')) {
      organized.semantic.info['500'] = color;
    } else if (lowerName.includes('gray') || lowerName.includes('grey') || lowerName.includes('neutral')) {
      organized.neutral['500'] = color;
    }
  });
  
  return organized;
}

function generateColorTokensContent(organizedColors) {
  return `export const colors = {
  brand: {
    primary: {
      50: '${generateTint(organizedColors.brand.primary['500'] || '#0284c7', 0.95)}',
      100: '${generateTint(organizedColors.brand.primary['500'] || '#0284c7', 0.9)}',
      200: '${generateTint(organizedColors.brand.primary['500'] || '#0284c7', 0.8)}',
      300: '${generateTint(organizedColors.brand.primary['500'] || '#0284c7', 0.6)}',
      400: '${generateTint(organizedColors.brand.primary['500'] || '#0284c7', 0.3)}',
      500: '${organizedColors.brand.primary['500'] || '#0284c7'}',
      600: '${generateShade(organizedColors.brand.primary['500'] || '#0284c7', 0.1)}',
      700: '${generateShade(organizedColors.brand.primary['500'] || '#0284c7', 0.2)}',
      800: '${generateShade(organizedColors.brand.primary['500'] || '#0284c7', 0.3)}',
      900: '${generateShade(organizedColors.brand.primary['500'] || '#0284c7', 0.4)}',
      950: '${generateShade(organizedColors.brand.primary['500'] || '#0284c7', 0.5)}',
    },
    secondary: {
      50: '${generateTint(organizedColors.brand.secondary['500'] || '#64748b', 0.95)}',
      100: '${generateTint(organizedColors.brand.secondary['500'] || '#64748b', 0.9)}',
      200: '${generateTint(organizedColors.brand.secondary['500'] || '#64748b', 0.8)}',
      300: '${generateTint(organizedColors.brand.secondary['500'] || '#64748b', 0.6)}',
      400: '${generateTint(organizedColors.brand.secondary['500'] || '#64748b', 0.3)}',
      500: '${organizedColors.brand.secondary['500'] || '#64748b'}',
      600: '${generateShade(organizedColors.brand.secondary['500'] || '#64748b', 0.1)}',
      700: '${generateShade(organizedColors.brand.secondary['500'] || '#64748b', 0.2)}',
      800: '${generateShade(organizedColors.brand.secondary['500'] || '#64748b', 0.3)}',
      900: '${generateShade(organizedColors.brand.secondary['500'] || '#64748b', 0.4)}',
      950: '${generateShade(organizedColors.brand.secondary['500'] || '#64748b', 0.5)}',
    },
    accent: {
      50: '${generateTint(organizedColors.brand.accent['500'] || '#eab308', 0.95)}',
      100: '${generateTint(organizedColors.brand.accent['500'] || '#eab308', 0.9)}',
      200: '${generateTint(organizedColors.brand.accent['500'] || '#eab308', 0.8)}',
      300: '${generateTint(organizedColors.brand.accent['500'] || '#eab308', 0.6)}',
      400: '${generateTint(organizedColors.brand.accent['500'] || '#eab308', 0.3)}',
      500: '${organizedColors.brand.accent['500'] || '#eab308'}',
      600: '${generateShade(organizedColors.brand.accent['500'] || '#eab308', 0.1)}',
      700: '${generateShade(organizedColors.brand.accent['500'] || '#eab308', 0.2)}',
      800: '${generateShade(organizedColors.brand.accent['500'] || '#eab308', 0.3)}',
      900: '${generateShade(organizedColors.brand.accent['500'] || '#eab308', 0.4)}',
      950: '${generateShade(organizedColors.brand.accent['500'] || '#eab308', 0.5)}',
    }
  },
  neutral: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '${organizedColors.neutral['500'] || '#71717a'}',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#09090b',
  },
  semantic: {
    success: {
      50: '#f0fdf4',
      500: '${organizedColors.semantic.success['500'] || '#22c55e'}',
      600: '${generateShade(organizedColors.semantic.success['500'] || '#22c55e', 0.1)}',
      700: '${generateShade(organizedColors.semantic.success['500'] || '#22c55e', 0.2)}',
    },
    warning: {
      50: '#fffbeb',
      500: '${organizedColors.semantic.warning['500'] || '#f59e0b'}',
      600: '${generateShade(organizedColors.semantic.warning['500'] || '#f59e0b', 0.1)}',
      700: '${generateShade(organizedColors.semantic.warning['500'] || '#f59e0b', 0.2)}',
    },
    error: {
      50: '#fef2f2',
      500: '${organizedColors.semantic.error['500'] || '#ef4444'}',
      600: '${generateShade(organizedColors.semantic.error['500'] || '#ef4444', 0.1)}',
      700: '${generateShade(organizedColors.semantic.error['500'] || '#ef4444', 0.2)}',
    },
    info: {
      50: '#eff6ff',
      500: '${organizedColors.semantic.info['500'] || '#3b82f6'}',
      600: '${generateShade(organizedColors.semantic.info['500'] || '#3b82f6', 0.1)}',
      700: '${generateShade(organizedColors.semantic.info['500'] || '#3b82f6', 0.2)}',
    }
  }
};`;
}

function generateTint(hex, amount) {
  // Simple tint generation (mix with white)
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(255 * amount);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (0x1000000 + (R < 255 ? R : 255) * 0x10000 +
    (G < 255 ? G : 255) * 0x100 + (B < 255 ? B : 255))
    .toString(16).slice(1);
}

function generateShade(hex, amount) {
  // Simple shade generation (mix with black)
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(255 * amount);
  const R = (num >> 16) - amt;
  const G = (num >> 8 & 0x00FF) - amt;
  const B = (num & 0x0000FF) - amt;
  return '#' + (0x1000000 + (R > 0 ? R : 0) * 0x10000 +
    (G > 0 ? G : 0) * 0x100 + (B > 0 ? B : 0))
    .toString(16).slice(1);
}

function updateCSSCustomProperties(colorSpecs) {
  const cssPath = path.join(__dirname, '../src/css/base.css');
  
  try {
    let cssContent = fs.readFileSync(cssPath, 'utf8');
    
    // Create backup
    fs.writeFileSync(cssPath + '.backup', cssContent);
    
    // Update CSS custom properties
    const colorVars = Object.entries(colorSpecs)
      .map(([name, color]) => `  --cb-${name}: ${hexToRgb(color)};`)
      .join('\n');
    
    // Replace or add color variables in :root
    const rootRegex = /:root\s*{([^}]*)}/;
    const match = cssContent.match(rootRegex);
    
    if (match) {
      const newRoot = `:root {\n${colorVars}\n}`;
      cssContent = cssContent.replace(rootRegex, newRoot);
    } else {
      cssContent = `:root {\n${colorVars}\n}\n\n` + cssContent;
    }
    
    fs.writeFileSync(cssPath, cssContent);
    log('✅ Updated CSS custom properties');
    
  } catch (error) {
    log(`❌ Error updating CSS custom properties: ${error.message}`);
  }
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? 
    `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}` : 
    hex;
}

function generateFontTokens() {
  log('Generating font tokens...');
  
  const fontsDir = path.join(ASSETS_DIR, 'fonts');
  if (!fs.existsSync(fontsDir)) {
    log('No fonts directory found');
    return;
  }
  
  const fontFiles = fs.readdirSync(fontsDir).filter(f => 
    ['.woff2', '.woff', '.ttf', '.otf'].includes(path.extname(f).toLowerCase())
  );
  
  if (fontFiles.length === 0) {
    log('No font files found');
    return;
  }
  
  // Analyze font files and update typography tokens
  const fontFamilies = analyzeFontFiles(fontFiles);
  
  if (Object.keys(fontFamilies).length > 0) {
    updateTypographyTokens(fontFamilies);
  }
}

function analyzeFontFiles(fontFiles) {
  const families = {};
  
  fontFiles.forEach(file => {
    const name = path.basename(file, path.extname(file));
    const parts = name.split('-');
    
    // Try to extract family name and weight
    let family = parts[0];
    let weight = 'regular';
    
    if (parts.length > 1) {
      const lastPart = parts[parts.length - 1].toLowerCase();
      if (['light', 'regular', 'medium', 'semibold', 'bold', 'extrabold'].includes(lastPart)) {
        weight = lastPart;
        family = parts.slice(0, -1).join('-');
      }
    }
    
    if (!families[family]) {
      families[family] = [];
    }
    families[family].push({ file, weight });
  });
  
  return families;
}

function updateTypographyTokens(fontFamilies) {
  const typographyPath = path.join(TOKENS_DIR, 'typography.ts');
  
  try {
    // Create backup
    if (fs.existsSync(typographyPath)) {
      fs.copyFileSync(typographyPath, typographyPath + '.backup');
    }
    
    // Update font families based on detected fonts
    const primaryFont = Object.keys(fontFamilies)[0] || 'Inter';
    
    const typographyContent = generateTypographyContent(primaryFont, fontFamilies);
    fs.writeFileSync(typographyPath, typographyContent);
    
    log(`✅ Updated typography tokens with ${Object.keys(fontFamilies).length} font families`);
    
  } catch (error) {
    log(`❌ Error updating typography tokens: ${error.message}`);
  }
}

function generateTypographyContent(primaryFont, fontFamilies) {
  const families = Object.keys(fontFamilies);
  
  return `export const typography = {
  fontFamily: {
    sans: [
      '${primaryFont}',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ],
    serif: [
      ${families.length > 1 ? `'${families[1]}',` : ''}
      'Merriweather',
      'Georgia',
      'Times New Roman',
      'serif',
    ],
    mono: [
      'JetBrains Mono',
      'Menlo',
      'Monaco',
      'Consolas',
      'Liberation Mono',
      'Courier New',
      'monospace',
    ],
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    '6xl': ['3.75rem', { lineHeight: '1' }],
    '7xl': ['4.5rem', { lineHeight: '1' }],
    '8xl': ['6rem', { lineHeight: '1' }],
    '9xl': ['8rem', { lineHeight: '1' }],
  },
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};`;
}

function main() {
  log('🚀 Starting design token generation...');
  
  try {
    generateColorTokens();
    generateFontTokens();
    
    log('✅ Design token generation completed!');
    console.log('🎨 Design tokens updated from brand assets');
    console.log(`📝 Log file: ${logFile}`);
    
  } catch (error) {
    log(`❌ Token generation failed: ${error.message}`);
    console.error('Token generation failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  generateColorTokens,
  generateFontTokens,
  parseColorData,
  parseCSSColors
};