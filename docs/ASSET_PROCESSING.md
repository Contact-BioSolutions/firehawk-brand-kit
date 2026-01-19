# Asset Processing Guide

Complete guide for processing Contact BioSolutions brand assets into the brand kit.

## 🚀 Quick Start

1. **Drop assets** into `brand-assets-inbox/` folders
2. **Run processing**: `npm run process-assets`
3. **Review output** in logs and `src/assets/`
4. **Test integration** in your projects
5. **Commit and publish** updated brand kit

## 📁 Asset Organization

### Input Structure
```
brand-assets-inbox/
├── logos/           # Logo files (SVG, PNG, EPS)
├── colors/          # Color specs (JSON, CSS, PDF)
├── typography/      # Font files (WOFF2, WOFF, TTF)
├── icons/           # Icon sets (SVG only)
└── imagery/         # Photos, illustrations (JPG, PNG, WebP)
```

### Output Structure
```
src/assets/
├── logos/
│   ├── primary/     # Main brand logos
│   ├── secondary/   # White/inverse versions
│   └── monogram/    # Simplified marks
├── icons/
│   ├── ui/          # Interface icons
│   ├── industry/    # Agriculture-specific
│   ├── social/      # Social media
│   └── status/      # Success, warning, error
├── imagery/
│   ├── photography/ # Company and agriculture photos
│   ├── illustrations/ # Custom graphics
│   └── patterns/    # Backgrounds and textures
└── fonts/           # Web font files
```

## 🛠️ Processing Commands

### Process All Assets
```bash
npm run process-assets
```

### Process Specific Categories
```bash
npm run process-assets -- --category=logos
npm run process-assets -- --category=colors
npm run process-assets -- --category=typography
npm run process-assets -- --category=icons
npm run process-assets -- --category=imagery
```

### Validation Only
```bash
npm run validate-assets
```

### Generate Design Tokens
```bash
npm run generate-tokens
```

### Optimize Assets
```bash
npm run optimize-assets
```

## 📋 Processing Steps

### 1. Logo Processing
- **Validates** SVG, PNG, EPS formats
- **Organizes** by naming convention (primary/secondary/monogram)
- **Copies** to appropriate `src/assets/logos/` subdirectories
- **Logs** processing results

### 2. Color Processing
- **Parses** JSON, CSS, and other color specifications
- **Extracts** hex values and color names
- **Validates** color formats
- **Updates** `src/tokens/colors.ts` (with backup)
- **Generates** CSS custom properties

### 3. Typography Processing
- **Validates** font file formats (WOFF2, WOFF, TTF, OTF)
- **Copies** fonts to `src/assets/fonts/`
- **Updates** font family definitions
- **Generates** @font-face declarations

### 4. Icon Processing
- **Validates** SVG format and structure
- **Organizes** by category (ui/industry/social/status)
- **Optimizes** SVG code
- **Ensures** consistent viewBox and styling

### 5. Imagery Processing
- **Validates** image formats
- **Categorizes** by content type
- **Copies** to organized directories
- **Logs** optimization recommendations

## 🔍 Validation Rules

### Logo Validation
- **Formats**: SVG (preferred), PNG, EPS
- **Naming**: Descriptive, consistent convention
- **Quality**: Vector format when possible

### Color Validation
- **Formats**: Valid hex codes (#000000)
- **Completeness**: Primary, secondary, accent colors
- **Accessibility**: Contrast ratio checking

### Typography Validation
- **Formats**: Modern web fonts (WOFF2, WOFF)
- **Licensing**: Proper usage rights
- **Completeness**: Multiple weights and styles

### Icon Validation
- **Format**: SVG only
- **Structure**: Clean, optimized code
- **Consistency**: Uniform stroke width and style
- **Size**: 24x24px base grid

### Imagery Validation
- **Resolution**: Minimum 2000px wide for photos
- **Format**: Web-optimized (WebP, JPG, PNG)
- **Quality**: High quality but compressed

## 📊 Processing Outputs

### Generated Files
- **Design tokens** updated in `src/tokens/`
- **Optimized assets** in `src/assets/`
- **Type definitions** updated
- **CSS custom properties** generated

### Log Files
- **Processing log**: `logs/asset-processing-YYYY-MM-DD.log`
- **Summary report**: `logs/processing-summary.json`
- **Error log**: Details of any processing failures

### Backup Files
- **Token backups**: `.backup` files created before updates
- **Asset originals**: Preserved in inbox until confirmed

## 🔧 Advanced Configuration

### Custom Processing Rules
Edit `scripts/process-assets.js` to customize:
- **File organization** logic
- **Naming conventions**
- **Validation rules**
- **Output formats**

### Color Extraction
The script supports:
- **Figma exports** (JSON format)
- **Adobe Swatch Exchange** (.ase files)
- **CSS/SCSS variables**
- **Brand guideline PDFs** (manual extraction)

### Font Processing
Handles:
- **Web font optimization**
- **Format conversion**
- **Font loading strategies**
- **Fallback definitions**

## 🚨 Troubleshooting

### Common Issues

#### File Format Errors
```
⚠️ Invalid logo format: logo.pdf
```
**Solution**: Convert to SVG, PNG, or EPS

#### Color Parsing Errors
```
❌ Error processing colors.json: Invalid JSON
```
**Solution**: Validate JSON format, check for syntax errors

#### Missing Assets
```
No logo files found
```
**Solution**: Ensure files are in correct inbox directory

#### Permission Errors
```
EACCES: permission denied
```
**Solution**: Check file permissions, run with appropriate access

### Processing Failures
1. **Check log files** for detailed error messages
2. **Validate input files** meet format requirements
3. **Ensure proper permissions** on directories
4. **Review file naming** conventions

## 🔄 Workflow Integration

### Development Workflow
1. **Drop assets** in inbox
2. **Run processing** script
3. **Review changes** in git diff
4. **Test integration** in projects
5. **Commit updates** with descriptive message

### CI/CD Integration
```yaml
# GitHub Actions example
- name: Process Brand Assets
  run: |
    npm run process-assets
    npm run build
    npm run typecheck
```

### Version Management
- **Minor updates**: Color adjustments, icon additions
- **Major updates**: Logo changes, typography overhauls
- **Patch updates**: Asset optimizations, bug fixes

## 📈 Best Practices

### Asset Preparation
- **Optimize** files before dropping in inbox
- **Use consistent** naming conventions
- **Provide multiple** formats when possible
- **Document** asset sources and licensing

### Processing Workflow
- **Process incrementally** rather than all at once
- **Test thoroughly** before publishing
- **Backup existing** brand kit before major updates
- **Review generated** tokens for accuracy

### Quality Assurance
- **Visual testing** in consuming projects
- **Accessibility validation** for colors and contrast
- **Performance testing** for asset loading
- **Cross-browser compatibility** checking