# Usage Guide

## Integration Patterns

### Next.js App Router Project

```js
// tailwind.config.js
module.exports = {
  presets: [require('@contact-biosolutions/firehawk-brand-kit/tailwind/preset')],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
}
```

```css
/* app/globals.css */
@import '@contact-biosolutions/firehawk-brand-kit/css/base.css';
```

### Sanity Studio Integration

```js
// sanity.config.ts
import { defineConfig } from 'sanity'

export default defineConfig({
  // ... other config
  studio: {
    components: {
      layout: (props) => {
        // Import brand styles
        import('@contact-biosolutions/firehawk-brand-kit/css/base.css')
        return props.renderDefault(props)
      }
    }
  }
})
```

### React Component Examples

```jsx
import { colors } from '@contact-biosolutions/firehawk-brand-kit';

// Using design tokens directly
const Button = ({ variant = 'primary', children, ...props }) => {
  const styles = {
    primary: {
      backgroundColor: colors.brand.primary[600],
      color: 'white',
    },
    secondary: {
      backgroundColor: colors.brand.secondary[100],
      color: colors.brand.secondary[800],
    }
  };

  return (
    <button style={styles[variant]} {...props}>
      {children}
    </button>
  );
};

// Using Tailwind classes
const Card = ({ children }) => (
  <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-md">
    {children}
  </div>
);

const Hero = () => (
  <section className="bg-primary-600 text-white py-20">
    <div className="container mx-auto px-4">
      <h1 className="text-5xl font-bold mb-4">
        Contact BioSolutions
      </h1>
      <p className="text-xl text-primary-100">
        Leading agricultural innovation
      </p>
    </div>
  </section>
);
```

## Color Usage Guidelines

### Primary Colors
- `primary-600`: Main brand color for buttons, links, headers
- `primary-50`: Light backgrounds for sections
- `primary-100`: Subtle highlights and borders

### Semantic Colors
```jsx
// Success states
<div className="bg-success-50 border border-success-200 text-success-800">
  Success message
</div>

// Warning states  
<div className="bg-warning-50 border border-warning-200 text-warning-800">
  Warning message
</div>

// Error states
<div className="bg-error-50 border border-error-200 text-error-800">
  Error message
</div>
```

### Typography Scale

```jsx
// Headings
<h1 className="text-5xl font-bold">Main Heading</h1>
<h2 className="text-3xl font-semibold">Section Heading</h2>
<h3 className="text-xl font-medium">Subsection</h3>

// Body text
<p className="text-base">Regular body text</p>
<p className="text-sm text-neutral-600">Secondary text</p>

// Font families
<h1 className="font-sans">Sans-serif heading</h1>
<blockquote className="font-serif">Serif quote</blockquote>
<code className="font-mono">Monospace code</code>
```

## Advanced Usage

### Custom CSS Properties

```css
.custom-component {
  /* Use CSS custom properties for dynamic theming */
  background: linear-gradient(
    135deg,
    rgb(var(--cb-primary-500)),
    rgb(var(--cb-accent-500))
  );
  
  font-family: var(--cb-font-sans);
  color: rgb(var(--cb-primary-50));
}
```

### Extending the Preset

```js
// tailwind.config.js
module.exports = {
  presets: [require('@contact-biosolutions/firehawk-brand-kit/tailwind/preset')],
  theme: {
    extend: {
      // Add project-specific overrides
      colors: {
        'project-specific': '#custom-color',
      },
      spacing: {
        '18': '4.5rem', // Custom spacing
      }
    }
  }
}
```

### Programmatic Access

```js
import { 
  colors, 
  typography, 
  spacing,
  tailwindConfig 
} from '@contact-biosolutions/firehawk-brand-kit';

// Use in styled-components
const StyledButton = styled.button`
  background-color: ${colors.brand.primary[600]};
  font-family: ${typography.fontFamily.sans.join(', ')};
  padding: ${spacing[4]} ${spacing[6]};
`;

// Use in CSS-in-JS
const buttonStyles = {
  backgroundColor: colors.brand.primary[600],
  color: 'white',
  fontFamily: typography.fontFamily.sans[0],
  fontSize: typography.fontSize.base[0],
  padding: `${spacing[3]} ${spacing[6]}`,
  borderRadius: '0.375rem',
};
```