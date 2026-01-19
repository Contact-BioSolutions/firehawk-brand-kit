# Changelog

All notable changes to the Contact BioSolutions Brand Kit will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.6.2] - 2026-01-19

### Changed
- **Tailwind CSS v4 Compatibility**: Updated `peerDependencies` to support both Tailwind CSS v3 and v4
  - Now accepts: `^3.0.0 || ^4.0.0`
  - Preset configuration verified compatible with Tailwind v4.1.18
  - No breaking changes - existing v3 projects continue to work

### Migration Guide

No code changes required. This is a metadata-only update to declare compatibility with Tailwind CSS v4.

**For projects already on Tailwind v4:**
```bash
pnpm install @contact-biosolutions/firehawk-brand-kit@0.6.2
```
This update will eliminate the peer dependency warning.

**For projects on Tailwind v3:**
No action needed - the package continues to work with v3.

## [0.6.0] - 2026-01-19

### BREAKING CHANGES
- **Color Values Updated to July 2025 Brand Guide**: Three brand colors have been corrected to match the most recent official specifications
  - **Deep Green**: Changed from `#0D382C` to `#10392C` (R16 G57 B44)
  - **Off White**: Changed from `#F7F2ED` to `#F7F4EE` (R247 G244 B238)
  - **Dandelion Yellow**: Changed from `#FCBC00` to `#FBBC00` (R251 G188 B0)

### Added
- **Typography System**: Complete Roboto font family integration (Google Fonts)
  - Headlines: Roboto Condensed - Black (900)
  - Sub-headings: Roboto Serif - Medium (500)
  - Body Text: Roboto - Regular (400), Italic, Bold (700) & Black (900)
- **Google Fonts Integration**: Added `googleFontsUrl` export with pre-configured font loading URL
- **Typography Tailwind Utilities**: New font family utilities (`font-heading`, `font-subheading`, `font-body`)
- **Brand Guidelines Documentation**: Comprehensive `BRAND_GUIDELINES.md` covering:
  - Complete brand strategy and messaging
  - Visual identity specifications
  - Tone of voice guidelines
  - Audience-specific messaging (Home & Garden, Landscaping, Agriculture)
  - EPA regulatory compliance guidelines
  - Usage examples and code snippets

### Changed
- **Tailwind Preset**: Extended with typography configuration
- **Typography Tokens**: Replaced placeholder fonts (Inter, Merriweather, JetBrains Mono) with official brand fonts (Roboto family)
- **Documentation**: Updated all references to July 2025 brand guide (from June 2025)
- **Color Scales**: Updated primary-900, secondary-900, and accent-500 values to match corrected Deep Green

### Migration Guide

**Update your dependencies:**
```bash
npm install @contact-biosolutions/firehawk-brand-kit@0.6.0
```

**Color Changes (Minor):**
These are subtle corrections - visual differences will be minimal:
```js
// Color corrections (v0.5.0 → v0.6.0)
deepGreen: '#0D382C' → '#10392C'  // Slightly lighter
offWhite: '#F7F2ED' → '#F7F4EE'   // Slightly cooler
yellow: '#FCBC00' → '#FBBC00'     // Slightly darker
```

**Typography Integration:**
```javascript
// Add Google Fonts to your HTML/CSS
import { googleFontsUrl } from '@contact-biosolutions/firehawk-brand-kit';

// In HTML:
<link href={googleFontsUrl} rel="stylesheet">

// Or in CSS:
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=Roboto+Condensed:wght@900&family=Roboto+Serif:wght@500&display=swap');

// Use in Tailwind:
<h1 class="font-heading font-black">Headline</h1>
<h2 class="font-subheading font-medium">Sub-heading</h2>
<p class="font-body">Body text</p>
```

**Testing**: Visually review brand colors (changes are subtle). Ensure Google Fonts are loaded for typography to display correctly.

## [0.5.0] - 2026-01-19

### BREAKING CHANGES
- **Brand Colors Updated to 2025 Official Guidelines**: All brand colors have been updated to match FireHawk's official 2025 brand guidelines from Chase Design Group (June 2025)
- **Primary Deep Green**: Changed from `#2d5a47` to `#0D382C` (PMS 627C)
- **Primary FireHawk Orange**: Changed from `#f55a2b` to `#EB5412` (PMS 1655C)

### Added
- **Official 2025 Secondary Colors**:
  - Pale Green: `#CAE098` (PMS 365C)
  - Off White: `#F7F2ED` (PMS COOL GRAY 1C)
  - Dandelion Yellow: `#FCBC00` (PMS 7548C)
- **New Tailwind Utilities**: Added utility classes for secondary brand colors (`brand-pale-green`, `brand-off-white`, `brand-yellow`)
- **PMS Color References**: All brand colors now include Pantone Matching System (PMS) codes for print accuracy

### Changed
- **Primary Color Scale**: Complete rebuild based on official DEEP GREEN (#0D382C)
- **Secondary Color Scale**: Complete rebuild based on official FIREHAWK ORANGE (#EB5412)
- **Accent Color**: Now uses official DEEP GREEN for consistency with primary CTAs
- **Tailwind Preset**: Updated with all 2025 brand colors
- **Documentation**: Updated to reflect 2025 brand guidelines

### Migration Guide

**IMPORTANT**: This update changes the visual appearance of all brand colors. Review your designs after upgrading.

**Update your dependencies:**
```bash
npm install @contact-biosolutions/firehawk-brand-kit@0.5.0
```

**Color Changes:**
```js
// OLD (0.4.0)
primary-500: '#2d5a47'  // Wrong color
secondary-500: '#f55a2b'  // Wrong color

// NEW (0.5.0)
primary-900: '#0D382C'  // Correct - Official DEEP GREEN
secondary-900: '#EB5412'  // Correct - Official FIREHAWK ORANGE

// New secondary colors available
'brand-pale-green': '#CAE098'
'brand-off-white': '#F7F2ED'
'brand-yellow': '#FCBC00'
```

**Testing**: After upgrading, visually review all components using brand colors to ensure they match the 2025 brand guidelines.

## [0.4.0] - 2026-01-19

### BREAKING CHANGES
- **Package Renamed**: Package name changed from `@contact-biosolutions/fh-brand-kit` to `@contact-biosolutions/firehawk-brand-kit`
- **Repository Renamed**: GitHub repository renamed from `Contact-BioSolutions/fh-brand-kit` to `Contact-BioSolutions/firehawk-brand-kit`

### Migration Guide

All consuming projects must update their dependencies:

**1. Update package.json:**
```json
{
  "dependencies": {
-   "@contact-biosolutions/fh-brand-kit": "^0.3.0"
+   "@contact-biosolutions/firehawk-brand-kit": "^0.4.0"
  }
}
```

**2. Update import statements:**
```js
// Find and replace all imports
- import { colors } from '@contact-biosolutions/fh-brand-kit'
+ import { colors } from '@contact-biosolutions/firehawk-brand-kit'

// Tailwind config
- presets: [require('@contact-biosolutions/fh-brand-kit/tailwind/preset')]
+ presets: [require('@contact-biosolutions/firehawk-brand-kit/tailwind/preset')]
```

**3. Reinstall dependencies:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## [0.2.0] - 2025-08-15

### Added
- **FireHawk Brand Integration**: Complete brand assets and color system
- **SVG Icon Library**: 6 optimized icons based on actual FireHawk graphic elements
- **Brand Asset Processing**: Automated system for managing brand assets
- **Comprehensive Documentation**: Complete brand guidelines and usage instructions

#### FireHawk Brand Elements
- **Primary Green**: `#2D5A47` - Deep forest green for headers, navigation, primary CTAs
- **Secondary Orange**: `#F55A2B` - Energy orange for accents, highlights, secondary CTAs
- **Complete Color Scales**: 50-950 variations for both brand colors
- **CSS Custom Properties**: RGB values for dynamic theming
- **Tailwind Integration**: `primary-*`, `secondary-*`, `accent-*` color classes

#### New Icons (Based on Actual FireHawk Assets)
- **UI Icons**: 
  - `chevron-down-01.svg` - FireHawk chevron with angular wing design
  - `chevron-down-02.svg` - Alternative chevron variation
- **Decorative Icons**:
  - `rounded-shape-01.svg` - Clean rounded rectangle for UI containers
  - `rounded-shape-02.svg` - Organic asymmetrical shape for backgrounds
  - `rounded-shape-03.svg` - Additional rounded variation
- **Industry Icons**:
  - `target.svg` - Precision agriculture and goal achievement

#### Brand Asset System
- **Asset Inbox**: `brand-assets-inbox/` for organized asset submission
- **Processing Scripts**: Automated validation, organization, and optimization
- **GitHub Actions**: Automated workflows for asset processing and publishing
- **Quality Assurance**: SVG optimization and validation tools

#### Documentation
- **[FIREHAWK_BRAND_GUIDELINES.md](docs/FIREHAWK_BRAND_GUIDELINES.md)**: Complete brand specification
- **[ASSET_PROCESSING.md](docs/ASSET_PROCESSING.md)**: Technical processing guide  
- **[ASSET_WORKFLOW.md](docs/ASSET_WORKFLOW.md)**: Team workflow and approval process
- **[TEAM_ACCESS.md](docs/TEAM_ACCESS.md)**: Setup and authentication guide

### Changed
- **Color System**: Replaced placeholder colors with actual FireHawk brand colors
- **Tailwind Config**: Updated to use FireHawk color scale structure
- **CSS Properties**: Updated with proper FireHawk RGB values
- **Package Exports**: Added icon assets and improved type definitions

### Technical Improvements
- **Asset Optimization**: 6 SVG icons optimized based on actual FireHawk graphics
- **Type Safety**: Complete TypeScript definitions for all design tokens
- **Build Performance**: Improved build pipeline with asset processing integration
- **Quality Gates**: Enhanced validation and testing workflows

### Breaking Changes
- **Color Token Names**: Changed from generic blue to FireHawk-specific naming
  - `primary-500` now `#2D5A47` (was `#0ea5e9`)
  - `secondary-500` now `#F55A2B` (was `#64748b`)
- **CSS Custom Properties**: Updated variable names and RGB values
- **Tailwind Classes**: Color output changed to match FireHawk brand

### Migration Guide
```js
// Before v0.2.0
const oldBlue = colors.brand.primary[500]; // #0ea5e9

// After v0.2.0  
const firehawkGreen = colors.brand.primary[500]; // #2D5A47
const firehawkOrange = colors.brand.secondary[500]; // #F55A2B
```

```css
/* Update CSS custom properties */
/* Before */
.element { background: rgb(var(--cb-primary-500)); } /* was blue */

/* After */  
.element { background: rgb(var(--cb-primary-500)); } /* now FireHawk green */
```

## [0.1.0] - 2025-08-15

### Added
- **Initial Package Setup**: Complete npm package with TypeScript support
- **Design Token System**: Colors, typography, and spacing tokens
- **Tailwind CSS Integration**: Complete preset for consistent styling
- **CSS Custom Properties**: Framework-agnostic usage support
- **Documentation**: Setup guides and usage examples
- **CI/CD Pipeline**: GitHub Actions for automated testing and publishing

#### Core Features
- **Scoped Package**: `@contact-biosolutions/firehawk-brand-kit`
- **Multi-format Support**: ESM, CJS, and TypeScript definitions
- **Type Safety**: Complete TypeScript integration
- **Cross-platform**: Works with Next.js, React, Vue, and other frameworks

#### Initial Design System
- **Placeholder Colors**: Generic blue/gray color system (replaced in v0.2.0)
- **Typography Scale**: Inter, Merriweather, JetBrains Mono font families
- **Spacing System**: Consistent spacing scale based on 0.25rem increments
- **Component Ready**: Prepared for design system expansion

---

## Release Notes

### v0.2.0 - FireHawk Brand Integration
This major release transforms the generic brand kit into a complete FireHawk brand system. All design tokens now reflect the actual FireHawk brand colors and visual elements extracted from official brand assets.

**Key Highlights:**
- ✅ **Real Brand Colors**: Actual FireHawk Deep Green and Orange integrated
- ✅ **SVG Icon System**: 9 icons based on FireHawk graphic elements  
- ✅ **Asset Processing**: Complete automated workflow for brand asset management
- ✅ **Enterprise Ready**: Production-ready for all Contact BioSolutions projects

**Immediate Benefits:**
- **Brand Consistency**: Unified FireHawk brand across all digital properties
- **Developer Experience**: Simple installation and intuitive usage
- **Scalability**: Ready for Agronomy Central, country websites, and future projects
- **Maintainability**: Automated workflows and comprehensive documentation

This release represents a complete, production-ready brand system ready for enterprise deployment across all Contact BioSolutions digital properties.