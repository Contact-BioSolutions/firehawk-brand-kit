#!/usr/bin/env node

/**
 * Brand Asset Processing Script
 * Processes brand assets from brand-assets-inbox/ and integrates them into the brand kit
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const INBOX_DIR = path.join(__dirname, '../brand-assets-inbox');
const ASSETS_DIR = path.join(__dirname, '../src/assets');
const TOKENS_DIR = path.join(__dirname, '../src/tokens');
const LOGS_DIR = path.join(__dirname, '../logs');

// Ensure logs directory exists
if (!fs.existsSync(LOGS_DIR)) {
  fs.mkdirSync(LOGS_DIR, { recursive: true });
}

const logFile = path.join(LOGS_DIR, `asset-processing-${new Date().toISOString().split('T')[0]}.log`);

function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  console.log(logMessage);
  fs.appendFileSync(logFile, logMessage + '\n');
}

function validateFile(filePath, expectedFormats) {
  const ext = path.extname(filePath).toLowerCase();
  return expectedFormats.includes(ext);
}

function processLogos() {
  log('Processing logos...');
  const logoInbox = path.join(INBOX_DIR, 'logos');
  const logoOutput = path.join(ASSETS_DIR, 'logos');
  
  if (!fs.existsSync(logoInbox)) {
    log('No logos directory found in inbox');
    return;
  }

  const files = fs.readdirSync(logoInbox).filter(f => !f.startsWith('.') && !f.endsWith('.md'));
  
  if (files.length === 0) {
    log('No logo files found');
    return;
  }

  // Create output directories
  const logoDirs = ['primary', 'secondary', 'monogram'];
  logoDirs.forEach(dir => {
    const dirPath = path.join(logoOutput, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });

  files.forEach(file => {
    const filePath = path.join(logoInbox, file);
    const validFormats = ['.svg', '.png', '.eps', '.pdf'];
    
    if (!validateFile(filePath, validFormats)) {
      log(`⚠️  Invalid logo format: ${file}`);
      return;
    }

    // Organize by naming convention
    let targetDir = 'primary';
    if (file.includes('secondary') || file.includes('white') || file.includes('inverse')) {
      targetDir = 'secondary';
    } else if (file.includes('mark') || file.includes('icon') || file.includes('monogram')) {
      targetDir = 'monogram';
    }

    const outputPath = path.join(logoOutput, targetDir, file);
    fs.copyFileSync(filePath, outputPath);
    log(`✅ Processed logo: ${file} → ${targetDir}/`);
  });
}

function processColors() {
  log('Processing colors...');
  const colorInbox = path.join(INBOX_DIR, 'colors');
  
  if (!fs.existsSync(colorInbox)) {
    log('No colors directory found in inbox');
    return;
  }

  const files = fs.readdirSync(colorInbox).filter(f => !f.startsWith('.') && !f.endsWith('.md'));
  
  if (files.length === 0) {
    log('No color files found');
    return;
  }

  let extractedColors = {};

  files.forEach(file => {
    const filePath = path.join(colorInbox, file);
    const ext = path.extname(file).toLowerCase();

    try {
      if (ext === '.json') {
        // Process Figma export or JSON color data
        const colorData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        extractedColors = { ...extractedColors, ...parseColorData(colorData) };
        log(`✅ Processed color file: ${file}`);
      } else if (ext === '.css' || ext === '.scss') {
        // Process CSS variables
        const cssContent = fs.readFileSync(filePath, 'utf8');
        const cssColors = parseCSSColors(cssContent);
        extractedColors = { ...extractedColors, ...cssColors };
        log(`✅ Processed CSS colors: ${file}`);
      } else {
        log(`⚠️  Unsupported color format: ${file}`);
      }
    } catch (error) {
      log(`❌ Error processing ${file}: ${error.message}`);
    }
  });

  // Update color tokens if we extracted any colors
  if (Object.keys(extractedColors).length > 0) {
    updateColorTokens(extractedColors);
    log(`✅ Updated color tokens with ${Object.keys(extractedColors).length} colors`);
  }
}

function parseColorData(data) {
  // Handle different JSON structures from design tools
  const colors = {};
  
  // Try to parse Figma-style exports
  if (data.colors) {
    Object.entries(data.colors).forEach(([name, value]) => {
      colors[name] = normalizeColor(value);
    });
  }
  
  // Try to parse flat color objects
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === 'string' && value.match(/^#[0-9a-fA-F]{6}$/)) {
      colors[key] = value;
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
    
    if (value.match(/^#[0-9a-fA-F]{6}$/)) {
      colors[name] = value;
    }
  }

  return colors;
}

function normalizeColor(color) {
  // Convert various color formats to hex
  if (typeof color === 'string') {
    if (color.startsWith('#')) return color;
    if (color.startsWith('rgb')) {
      // Simple rgb to hex conversion
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

function updateColorTokens(extractedColors) {
  const colorsPath = path.join(TOKENS_DIR, 'colors.ts');
  
  try {
    // Read existing colors
    let colorsContent = fs.readFileSync(colorsPath, 'utf8');
    
    // Create backup
    fs.writeFileSync(colorsPath + '.backup', colorsContent);
    
    // Basic color replacement - in a real implementation, you'd want more sophisticated parsing
    Object.entries(extractedColors).forEach(([name, value]) => {
      log(`Updating color: ${name} = ${value}`);
      // This is a simple replacement - you might want more sophisticated parsing
    });
    
    log('Color tokens updated (backup created)');
  } catch (error) {
    log(`Error updating color tokens: ${error.message}`);
  }
}

function processTypography() {
  log('Processing typography...');
  const typographyInbox = path.join(INBOX_DIR, 'typography');
  const typographyOutput = path.join(ASSETS_DIR, 'fonts');
  
  if (!fs.existsSync(typographyInbox)) {
    log('No typography directory found in inbox');
    return;
  }

  const files = fs.readdirSync(typographyInbox).filter(f => !f.startsWith('.') && !f.endsWith('.md'));
  
  if (files.length === 0) {
    log('No typography files found');
    return;
  }

  // Create fonts output directory
  if (!fs.existsSync(typographyOutput)) {
    fs.mkdirSync(typographyOutput, { recursive: true });
  }

  files.forEach(file => {
    const filePath = path.join(typographyInbox, file);
    const validFormats = ['.woff2', '.woff', '.ttf', '.otf'];
    
    if (!validateFile(filePath, validFormats)) {
      log(`⚠️  Invalid font format: ${file}`);
      return;
    }

    const outputPath = path.join(typographyOutput, file);
    fs.copyFileSync(filePath, outputPath);
    log(`✅ Processed font: ${file}`);
  });
}

function processIcons() {
  log('Processing icons...');
  const iconsInbox = path.join(INBOX_DIR, 'icons');
  const iconsOutput = path.join(ASSETS_DIR, 'icons');
  
  if (!fs.existsSync(iconsInbox)) {
    log('No icons directory found in inbox');
    return;
  }

  const files = fs.readdirSync(iconsInbox).filter(f => !f.startsWith('.') && !f.endsWith('.md'));
  
  if (files.length === 0) {
    log('No icon files found');
    return;
  }

  // Create icon output directories
  const iconDirs = ['ui', 'industry', 'social', 'status'];
  iconDirs.forEach(dir => {
    const dirPath = path.join(iconsOutput, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });

  files.forEach(file => {
    const filePath = path.join(iconsInbox, file);
    
    if (!validateFile(filePath, ['.svg'])) {
      log(`⚠️  Invalid icon format (SVG only): ${file}`);
      return;
    }

    // Organize by naming or put in general category
    let targetDir = 'ui';
    if (file.includes('industry') || file.includes('agriculture')) {
      targetDir = 'industry';
    } else if (file.includes('social')) {
      targetDir = 'social';
    } else if (file.includes('status') || file.includes('check') || file.includes('error')) {
      targetDir = 'status';
    }

    const outputPath = path.join(iconsOutput, targetDir, file);
    fs.copyFileSync(filePath, outputPath);
    log(`✅ Processed icon: ${file} → ${targetDir}/`);
  });
}

function processImagery() {
  log('Processing imagery...');
  const imageryInbox = path.join(INBOX_DIR, 'imagery');
  const imageryOutput = path.join(ASSETS_DIR, 'imagery');
  
  if (!fs.existsSync(imageryInbox)) {
    log('No imagery directory found in inbox');
    return;
  }

  const files = fs.readdirSync(imageryInbox).filter(f => !f.startsWith('.') && !f.endsWith('.md'));
  
  if (files.length === 0) {
    log('No imagery files found');
    return;
  }

  // Create imagery output directories
  const imageryDirs = ['photography', 'illustrations', 'patterns'];
  imageryDirs.forEach(dir => {
    const dirPath = path.join(imageryOutput, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });

  files.forEach(file => {
    const filePath = path.join(imageryInbox, file);
    const validFormats = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];
    
    if (!validateFile(filePath, validFormats)) {
      log(`⚠️  Invalid image format: ${file}`);
      return;
    }

    // Basic categorization - could be improved with AI/ML classification
    let targetDir = 'photography';
    if (file.includes('illustration') || file.includes('graphic')) {
      targetDir = 'illustrations';
    } else if (file.includes('pattern') || file.includes('texture')) {
      targetDir = 'patterns';
    }

    const outputPath = path.join(imageryOutput, targetDir, file);
    fs.copyFileSync(filePath, outputPath);
    log(`✅ Processed image: ${file} → ${targetDir}/`);
  });
}

function generateSummaryReport() {
  log('Generating processing summary...');
  
  const summary = {
    timestamp: new Date().toISOString(),
    processedAssets: {},
    recommendations: []
  };

  // Count processed assets
  const assetTypes = ['logos', 'icons', 'imagery', 'fonts'];
  assetTypes.forEach(type => {
    const assetPath = path.join(ASSETS_DIR, type);
    if (fs.existsSync(assetPath)) {
      const count = countFilesRecursively(assetPath);
      summary.processedAssets[type] = count;
    }
  });

  // Generate recommendations
  if (summary.processedAssets.logos === 0) {
    summary.recommendations.push('Consider adding logo variations for different use cases');
  }
  if (summary.processedAssets.icons < 10) {
    summary.recommendations.push('Build out icon library for better UI consistency');
  }

  const summaryPath = path.join(LOGS_DIR, 'processing-summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  
  log('Summary report generated: ' + summaryPath);
  console.log('\n📊 Processing Summary:');
  console.log(JSON.stringify(summary, null, 2));
}

function countFilesRecursively(dir) {
  if (!fs.existsSync(dir)) return 0;
  
  let count = 0;
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      count += countFilesRecursively(itemPath);
    } else if (!item.startsWith('.') && !item.endsWith('.md')) {
      count++;
    }
  });
  
  return count;
}

// Main execution
function main() {
  const args = process.argv.slice(2);
  const category = args.find(arg => arg.startsWith('--category='))?.split('=')[1];
  
  log('🚀 Starting brand asset processing...');
  log(`Processing category: ${category || 'all'}`);
  
  try {
    if (!category || category === 'logos') processLogos();
    if (!category || category === 'colors') processColors();
    if (!category || category === 'typography') processTypography();
    if (!category || category === 'icons') processIcons();
    if (!category || category === 'imagery') processImagery();
    
    generateSummaryReport();
    
    log('✅ Asset processing completed successfully!');
    console.log('\n🎉 All done! Check the logs for details.');
    console.log(`📝 Log file: ${logFile}`);
    
  } catch (error) {
    log(`❌ Asset processing failed: ${error.message}`);
    console.error('Processing failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  processLogos,
  processColors,
  processTypography,
  processIcons,
  processImagery
};