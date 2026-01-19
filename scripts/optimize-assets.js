#!/usr/bin/env node

/**
 * Asset Optimization Script
 * Optimizes SVGs, images, and other assets for web delivery
 */

const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '../src/assets');
const LOGS_DIR = path.join(__dirname, '../logs');

// Ensure logs directory exists
if (!fs.existsSync(LOGS_DIR)) {
  fs.mkdirSync(LOGS_DIR, { recursive: true });
}

const logFile = path.join(LOGS_DIR, `asset-optimization-${new Date().toISOString().split('T')[0]}.log`);

function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  console.log(logMessage);
  fs.appendFileSync(logFile, logMessage + '\n');
}

function optimizeSVG(filePath) {
  try {
    let svgContent = fs.readFileSync(filePath, 'utf8');
    const originalSize = svgContent.length;
    
    // Basic SVG optimizations
    svgContent = svgContent
      // Remove comments
      .replace(/<!--[\s\S]*?-->/g, '')
      // Remove unnecessary whitespace
      .replace(/\s+/g, ' ')
      // Remove unnecessary xmlns declarations
      .replace(/xmlns:[\w]+="[^"]*"/g, '')
      // Normalize viewBox
      .replace(/viewBox="([^"]*)"/, (match, viewBox) => {
        const values = viewBox.trim().split(/\s+/);
        return `viewBox="${values.join(' ')}"`;
      })
      // Ensure currentColor for icons
      .replace(/stroke="[^"]*"/g, 'stroke="currentColor"')
      .replace(/fill="[^"]*"/g, (match, p1) => {
        return match.includes('#') ? 'fill="currentColor"' : match;
      });
    
    const optimizedSize = svgContent.length;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    fs.writeFileSync(filePath, svgContent);
    log(`✅ Optimized SVG: ${path.basename(filePath)} (${savings}% smaller)`);
    
    return { originalSize, optimizedSize, savings: parseFloat(savings) };
  } catch (error) {
    log(`❌ Error optimizing SVG ${filePath}: ${error.message}`);
    return null;
  }
}

function validateSVGStructure(filePath) {
  try {
    const svgContent = fs.readFileSync(filePath, 'utf8');
    const issues = [];
    
    // Check for viewBox
    if (!svgContent.includes('viewBox=')) {
      issues.push('Missing viewBox attribute');
    }
    
    // Check for proper dimensions
    const viewBoxMatch = svgContent.match(/viewBox="([^"]*)"/);
    if (viewBoxMatch) {
      const [x, y, width, height] = viewBoxMatch[1].split(/\s+/).map(Number);
      if (width !== 24 || height !== 24) {
        issues.push(`Non-standard dimensions: ${width}x${height} (expected 24x24)`);
      }
    }
    
    // Check for stroke consistency
    const strokeMatches = svgContent.match(/stroke-width="([^"]*)"/g);
    if (strokeMatches && strokeMatches.length > 0) {
      const strokeWidths = strokeMatches.map(m => m.match(/stroke-width="([^"]*)"/)[1]);
      const uniqueWidths = [...new Set(strokeWidths)];
      if (uniqueWidths.length > 1) {
        issues.push(`Inconsistent stroke widths: ${uniqueWidths.join(', ')}`);
      }
    }
    
    // Check for accessibility
    if (!svgContent.includes('<title>') && !svgContent.includes('aria-label')) {
      issues.push('Missing accessibility attributes (title or aria-label)');
    }
    
    if (issues.length > 0) {
      log(`⚠️  SVG validation issues in ${path.basename(filePath)}:`);
      issues.forEach(issue => log(`   - ${issue}`));
    } else {
      log(`✅ SVG validation passed: ${path.basename(filePath)}`);
    }
    
    return issues;
  } catch (error) {
    log(`❌ Error validating SVG ${filePath}: ${error.message}`);
    return ['Validation failed'];
  }
}

function generateImageSizes(filePath) {
  // This would typically use a library like sharp for image processing
  // For now, we'll just log what sizes should be generated
  const ext = path.extname(filePath);
  const baseName = path.basename(filePath, ext);
  const dirName = path.dirname(filePath);
  
  const sizesToGenerate = [
    { suffix: '-sm', width: 640 },
    { suffix: '-md', width: 1024 },
    { suffix: '-lg', width: 1920 },
    { suffix: '-xl', width: 2560 }
  ];
  
  log(`📐 Image sizes needed for ${baseName}:`);
  sizesToGenerate.forEach(size => {
    const newFileName = `${baseName}${size.suffix}${ext}`;
    log(`   - ${newFileName} (${size.width}px wide)`);
  });
  
  // In a real implementation, you would generate these files
  // using a library like sharp:
  // const sharp = require('sharp');
  // await sharp(filePath).resize(size.width).toFile(outputPath);
  
  return sizesToGenerate;
}

function auditAssetUsage() {
  log('Auditing asset usage and recommendations...');
  
  const audit = {
    logos: { count: 0, recommendations: [] },
    icons: { count: 0, recommendations: [] },
    images: { count: 0, recommendations: [] },
    fonts: { count: 0, recommendations: [] }
  };
  
  // Count logos
  const logoDir = path.join(ASSETS_DIR, 'logos');
  if (fs.existsSync(logoDir)) {
    audit.logos.count = countFilesRecursively(logoDir);
    if (audit.logos.count < 3) {
      audit.logos.recommendations.push('Consider adding more logo variations (horizontal, stacked, monogram)');
    }
  } else {
    audit.logos.recommendations.push('No logos found - add brand logos to complete brand kit');
  }
  
  // Count icons
  const iconsDir = path.join(ASSETS_DIR, 'icons');
  if (fs.existsSync(iconsDir)) {
    audit.icons.count = countFilesRecursively(iconsDir);
    if (audit.icons.count < 20) {
      audit.icons.recommendations.push('Icon library is limited - consider expanding for better UI consistency');
    }
  } else {
    audit.icons.recommendations.push('No icons found - add icon set for UI elements');
  }
  
  // Count images
  const imageryDir = path.join(ASSETS_DIR, 'imagery');
  if (fs.existsSync(imageryDir)) {
    audit.images.count = countFilesRecursively(imageryDir);
    if (audit.images.count === 0) {
      audit.images.recommendations.push('Consider adding brand photography for hero sections and backgrounds');
    }
  }
  
  // Count fonts
  const fontsDir = path.join(ASSETS_DIR, 'fonts');
  if (fs.existsSync(fontsDir)) {
    audit.fonts.count = countFilesRecursively(fontsDir);
    if (audit.fonts.count === 0) {
      audit.fonts.recommendations.push('Consider adding custom web fonts for brand consistency');
    }
  }
  
  return audit;
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

function processDirectory(dir, processor) {
  if (!fs.existsSync(dir)) return;
  
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      processDirectory(itemPath, processor);
    } else if (!item.startsWith('.') && !item.endsWith('.md')) {
      processor(itemPath);
    }
  });
}

function main() {
  log('🚀 Starting asset optimization...');
  
  let totalOptimizations = 0;
  let totalSavings = 0;
  
  try {
    // Optimize SVG files
    log('Optimizing SVG files...');
    const svgDirs = [
      path.join(ASSETS_DIR, 'logos'),
      path.join(ASSETS_DIR, 'icons')
    ];
    
    svgDirs.forEach(dir => {
      processDirectory(dir, (filePath) => {
        if (path.extname(filePath).toLowerCase() === '.svg') {
          const result = optimizeSVG(filePath);
          if (result) {
            totalOptimizations++;
            totalSavings += result.savings;
          }
          
          // Also validate SVG structure
          validateSVGStructure(filePath);
        }
      });
    });
    
    // Generate image size recommendations
    log('Analyzing image optimization opportunities...');
    const imageryDir = path.join(ASSETS_DIR, 'imagery');
    processDirectory(imageryDir, (filePath) => {
      const ext = path.extname(filePath).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        generateImageSizes(filePath);
      }
    });
    
    // Asset usage audit
    const audit = auditAssetUsage();
    
    // Generate optimization report
    const report = {
      timestamp: new Date().toISOString(),
      optimizations: {
        svgFilesOptimized: totalOptimizations,
        averageSavings: totalOptimizations > 0 ? (totalSavings / totalOptimizations).toFixed(1) : 0
      },
      audit: audit,
      recommendations: []
    };
    
    // Add general recommendations
    if (totalOptimizations === 0) {
      report.recommendations.push('No SVG files found to optimize - consider adding icons and logos');
    }
    
    // Collect all audit recommendations
    Object.values(audit).forEach(category => {
      report.recommendations.push(...category.recommendations);
    });
    
    const reportPath = path.join(LOGS_DIR, 'optimization-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    log('✅ Asset optimization completed!');
    console.log('\n📊 Optimization Summary:');
    console.log(`   SVG files optimized: ${totalOptimizations}`);
    console.log(`   Average file size reduction: ${report.optimizations.averageSavings}%`);
    console.log(`   Report generated: ${reportPath}`);
    
    if (report.recommendations.length > 0) {
      console.log('\n💡 Recommendations:');
      report.recommendations.forEach((rec, i) => {
        console.log(`   ${i + 1}. ${rec}`);
      });
    }
    
  } catch (error) {
    log(`❌ Asset optimization failed: ${error.message}`);
    console.error('Optimization failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  optimizeSVG,
  validateSVGStructure,
  generateImageSizes,
  auditAssetUsage
};