# @contact-biosolutions/firehawk-brand-kit

Contact BioSolutions brand kit with design tokens and Tailwind CSS configuration for consistent branding across all projects.

## Installation

```bash
npm install @contact-biosolutions/firehawk-brand-kit
```

## Quick Start

### Using the Tailwind Preset

```js
// tailwind.config.js
module.exports = {
  presets: [require('@contact-biosolutions/firehawk-brand-kit/tailwind/preset')],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
}
```

### Using Design Tokens in JavaScript/TypeScript

```js
import { colors, typography, spacing } from '@contact-biosolutions/firehawk-brand-kit';

// Access brand colors
const primaryColor = colors.brand.primary[600];
const accentColor = colors.brand.accent[500];

// Use typography tokens
const headingFont = typography.fontFamily.sans;
const bodySize = typography.fontSize.base;
```

### Importing Base CSS

```css
/* In your main CSS file */
@import '@contact-biosolutions/firehawk-brand-kit/css/base.css';
```

## Usage Examples

### Next.js Project Setup

1. Install the package:
```bash
npm install @contact-biosolutions/firehawk-brand-kit
```

2. Update your `tailwind.config.js`:
```js
module.exports = {
  presets: [require('@contact-biosolutions/firehawk-brand-kit/tailwind/preset')],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
}
```

3. Import base styles in your root layout or main CSS:
```css
@import '@contact-biosolutions/firehawk-brand-kit/css/base.css';
```

### Available Tokens

#### Colors
- `colors.brand.primary` - Primary brand colors (50-950 scale)
- `colors.brand.secondary` - Secondary brand colors
- `colors.brand.accent` - Accent colors
- `colors.semantic.success/warning/error/info` - Status colors
- `colors.neutral` - Neutral grays

#### Typography
- `typography.fontFamily` - Font stacks (sans, serif, mono)
- `typography.fontSize` - Text size scale
- `typography.fontWeight` - Weight scale
- `typography.letterSpacing` - Letter spacing values

#### Spacing & Layout
- `spacing` - Spacing scale for margins, padding
- `borderRadius` - Border radius scale
- `boxShadow` - Shadow scale

## Tailwind Classes

Use standard Tailwind classes with brand colors:

```html
<!-- Primary brand color -->
<div class="bg-primary-600 text-white">
  Brand primary background
</div>

<!-- Accent color -->
<button class="bg-accent-500 hover:bg-accent-600">
  Call to action
</button>

<!-- Semantic colors -->
<div class="text-success-600 bg-success-50">
  Success message
</div>
```

## Custom CSS Properties

The package also provides CSS custom properties for non-Tailwind usage:

```css
.custom-element {
  color: rgb(var(--cb-primary-600));
  background-color: rgb(var(--cb-accent-50));
  font-family: var(--cb-font-sans);
}
```

## Development

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Watch for changes
npm run dev

# Type check
npm run typecheck
```

## License

Private package for Contact BioSolutions internal use.