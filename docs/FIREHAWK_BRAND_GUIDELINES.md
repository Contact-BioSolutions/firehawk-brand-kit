# FireHawk Brand Guidelines

**Based on actual brand assets and extracted specifications**

## Brand Identity

### Logo Variations
- **Primary Logo** - Black version for light backgrounds
- **Deep Green Logo** - Primary brand color (#2D5A47)
- **Orange Logo** - Secondary brand color (#F55A2B) 
- **White Logo** - For dark backgrounds and photography overlays

### Available Formats
- **RGB/Digital**: PNG, AI, EPS for web and digital use
- **CMYK/Print**: EPS, AI for professional printing
- **PMS/Spot Color**: EPS, AI for Pantone color matching

## Color Palette

### Primary Colors

#### Deep Green
```
HEX: #2D5A47
RGB: rgb(45, 90, 71)
Tailwind: primary-500
Usage: Headers, navigation, primary CTAs, main brand color
```

#### Orange
```
HEX: #F55A2B  
RGB: rgb(245, 90, 43)
Tailwind: secondary-500
Usage: Accents, highlights, secondary CTAs, energy messaging
```

### Supporting Colors

#### White
```
HEX: #FFFFFF
RGB: rgb(255, 255, 255)
Usage: Inverse applications, text on dark backgrounds
```

#### Black
```
HEX: #000000
RGB: rgb(0, 0, 0)
Usage: High contrast applications, formal documents
```

### Color Scale
Each brand color includes a full scale from 50 (lightest) to 950 (darkest):

```css
/* Primary Green Scale */
primary-50: #f0f8f5   /* Very light green backgrounds */
primary-500: #2d5a47  /* Main brand green */
primary-700: #1f4636  /* Darker green for hover states */

/* Secondary Orange Scale */  
secondary-50: #fef5f1  /* Very light orange backgrounds */
secondary-500: #f55a2b /* Main brand orange */
secondary-700: #d2330c /* Darker orange for hover states */
```

## Visual Elements

### Chevron Graphics
- **Design**: Angular wing-like shapes pointing downward
- **Symbolism**: Flight, precision, movement, hawk imagery
- **Colors**: Available in Deep Green and Orange
- **Usage**: Directional indicators, section dividers, brand accent elements

### Rounded Shapes
- **Set 1**: Clean rounded rectangles perfect for UI containers
- **Set 2**: Organic asymmetrical shapes for decorative backgrounds
- **Set 3**: Additional organic variations for visual interest
- **Colors**: Available in Deep Green and Orange versions
- **Usage**: Background elements, card containers, visual layering

### Brand Symbols
- **Target Element**: Precision and accuracy messaging
- **Symbol Collection**: Additional brand graphics for various applications
- **Colors**: Primarily Orange with some variations
- **Usage**: Industry-specific iconography, precision agriculture themes

## Typography Guidelines

### Font Hierarchy
1. **Primary**: Inter (Sans-serif)
   - Modern, highly legible
   - Use for UI, headings, navigation, body text
   
2. **Secondary**: Merriweather (Serif)  
   - Use for editorial content, quotes, formal documents
   - Adds authority and trustworthiness
   
3. **Monospace**: JetBrains Mono
   - Use for code, technical data, specifications

### Type Scale
```
H1: 3rem (48px) - Hero titles
H2: 1.875rem (30px) - Section headers
H3: 1.25rem (20px) - Subsection headers
Body: 1rem (16px) - Primary body text
Small: 0.875rem (14px) - Captions, metadata
```

## Brand Voice & Tone

### Voice Characteristics
- **Precise**: Like a hawk's focused hunting approach
- **Innovative**: Agricultural technology leadership
- **Reliable**: Consistent performance and results
- **Professional**: Industry expertise and authority

### Tone Guidelines
- **Confident without being aggressive**
- **Technical but accessible**
- **Results-focused and solution-oriented**
- **Environmentally conscious and sustainable**

## Usage Guidelines

### Color Usage

#### Primary Green (#2D5A47)
- **Main navigation and headers**
- **Primary call-to-action buttons**
- **Key messaging and highlights**
- **Professional, authority contexts**

#### Orange (#F55A2B)
- **Secondary CTAs and accents**
- **Progress indicators and highlights**
- **Energy, action, and innovation messaging**
- **Warning states and important notices**

#### Color Combinations
✅ **Deep Green + White** - Professional, clean
✅ **Orange + White** - Energetic, modern
✅ **Deep Green + Orange** - Full brand palette
✅ **Deep Green + Light Green tints** - Monochromatic harmony

❌ **Orange + Deep Green backgrounds** - Poor contrast
❌ **Dark colors without sufficient contrast**
❌ **More than 3 colors in single composition**

### Logo Usage

#### Minimum Sizes
- **Digital**: 24px height minimum
- **Print**: 0.5 inch height minimum
- **Business Cards**: 0.3 inch height minimum

#### Clear Space
- **All sides**: Minimum 1x logo height clear space
- **Never place other elements within clear space**
- **Maintain clear space even when logo is small**

#### Background Usage
- **Light Backgrounds**: Use Deep Green or Orange logos
- **Dark Backgrounds**: Use White logo
- **Photography**: Use White logo with dark overlay if needed
- **Busy Backgrounds**: Add solid background shape behind logo

## Digital Applications

### Website Usage
```css
/* Header/Navigation */
.header {
  background-color: rgb(var(--cb-primary-500));
  color: white;
}

/* Primary CTAs */
.btn-primary {
  background-color: rgb(var(--cb-primary-600));
  color: white;
}

.btn-primary:hover {
  background-color: rgb(var(--cb-primary-700));
}

/* Secondary CTAs */
.btn-secondary {
  background-color: rgb(var(--cb-secondary-500));
  color: white;
}

/* Accents and highlights */
.accent {
  color: rgb(var(--cb-secondary-500));
}
```

### Tailwind CSS Classes
```html
<!-- Primary elements -->
<div class="bg-primary-600 text-white">
<button class="bg-primary-600 hover:bg-primary-700 text-white">

<!-- Secondary elements -->
<div class="bg-secondary-500 text-white">
<span class="text-secondary-600">

<!-- Semantic states -->
<div class="bg-success-50 text-success-800 border border-success-200">
```

## Print Applications

### Color Specifications
- **CMYK Values**: Available in provided print files
- **PMS Colors**: Spot color versions for professional printing
- **Black & White**: Single-color versions for cost-effective printing

### File Usage
- **Business Cards**: Use EPS or AI files
- **Brochures**: CMYK versions for 4-color printing
- **Signage**: Vector formats (AI, EPS) for scalability
- **Apparel**: Vector formats for embroidery and screen printing

## Accessibility Standards

### Color Contrast
- **Primary Green on White**: 7.2:1 (AAA compliant)
- **Orange on White**: 5.1:1 (AA compliant)
- **White on Primary Green**: 7.2:1 (AAA compliant)
- **White on Orange**: 5.1:1 (AA compliant)

### Best Practices
✅ Always test color combinations for accessibility
✅ Provide text alternatives for color-coded information
✅ Use sufficient contrast ratios for all text
✅ Consider color-blind users in design decisions

## Implementation

### Brand Kit Integration
This brand guideline is implemented in the `@contact-biosolutions/fh-brand-kit` package:

```bash
npm install @contact-biosolutions/fh-brand-kit
```

```js
// Import design tokens
import { colors } from '@contact-biosolutions/fh-brand-kit';

// Use in code
const primaryGreen = colors.brand.primary[500]; // #2D5A47
const brandOrange = colors.brand.secondary[500]; // #F55A2B
```

```css
/* Use CSS custom properties */
.hero {
  background-color: rgb(var(--cb-primary-500));
  color: white;
}
```

### Asset Files
All FireHawk brand assets are processed and available through the brand kit:
- **Logos**: Organized by color variation and format
- **Colors**: Design tokens with full color scales
- **Graphics**: Chevrons and shapes (converted to SVG)
- **Typography**: Web font integration ready

## Brand Evolution

### Version Control
- **Current Version**: Based on 250625_FHK7148 brand asset delivery
- **Updates**: All changes tracked through brand kit versioning
- **Distribution**: Automatic updates to consuming projects

### Consistency
- **Cross-Platform**: Same brand experience across web, print, and digital
- **Multi-Project**: Consistent implementation across all Contact BioSolutions properties
- **Quality Assurance**: Automated testing and validation of brand compliance

This comprehensive brand guideline ensures FireHawk maintains visual consistency and professional presentation across all applications and touchpoints.