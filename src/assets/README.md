# Brand Assets

This directory contains Contact BioSolutions brand assets for use across projects.

## Directory Structure

```
assets/
├── logos/           # Brand logos in various formats
│   ├── primary/     # Primary logo variations
│   ├── secondary/   # Secondary/inverse logos  
│   └── monogram/    # Simplified mark/favicon
└── icons/           # Custom iconography
    ├── ui/          # Interface icons
    └── industry/    # Agriculture-specific icons
```

## Logo Specifications

### File Formats Required
- **SVG**: Vector format for web use
- **PNG**: High-resolution raster (1x, 2x, 3x)
- **EPS**: Vector format for print

### Logo Variations Needed
1. **Primary Logo**
   - Full color on light backgrounds
   - Single color (primary blue)
   - Black version for single-color applications

2. **Secondary Logo** 
   - White/reversed version for dark backgrounds
   - Single color light version

3. **Monogram/Mark**
   - Simplified mark for small applications
   - Favicon formats (16x16, 32x32, 64x64)

### Naming Convention
```
cb-logo-primary-full-color.svg
cb-logo-primary-single-color.svg
cb-logo-secondary-white.svg
cb-mark-primary.svg
cb-favicon-32x32.png
```

## Icon Guidelines

### Style Requirements
- **Style**: Outline/stroke icons
- **Stroke Width**: 2px
- **Corner Radius**: 2px for rounded elements
- **Grid**: 24x24px base grid
- **Formats**: SVG for scalability

### Categories
1. **UI Icons**: Navigation, actions, states
2. **Industry Icons**: Agriculture, science, sustainability themes

## Asset Integration

### In Code
```js
// Import assets as modules (if using bundler)
import CBLogo from '@contact-biosolutions/firehawk-brand-kit/assets/logos/primary/cb-logo-primary.svg';
import SeedIcon from '@contact-biosolutions/firehawk-brand-kit/assets/icons/industry/seed.svg';
```

### In CSS
```css
.logo {
  background-image: url('@contact-biosolutions/firehawk-brand-kit/assets/logos/primary/cb-logo-primary.svg');
}
```

### Direct URL Access
Assets are also available via direct paths when package is installed:
```
node_modules/@contact-biosolutions/firehawk-brand-kit/src/assets/logos/...
```

## Adding New Assets

1. Follow naming conventions
2. Ensure all required formats are provided
3. Optimize file sizes (SVG cleanup, PNG compression)
4. Update this README with new asset descriptions
5. Test integration in consuming projects

## Usage Rights

These assets are proprietary to Contact BioSolutions and are for internal use only. Do not distribute or use outside of approved Contact BioSolutions projects.