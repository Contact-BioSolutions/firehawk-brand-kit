/**
 * FireHawk Brand Tailwind Preset - 2025 Official Guidelines
 * Source: Chase Design Group (July 2025)
 *
 * Primary Colors:
 * - DEEP GREEN (PMS 627C): #10392C (R16 G57 B44)
 * - FIREHAWK ORANGE (PMS 1655C): #EB5412 (R235 G84 B18)
 *
 * Secondary Colors:
 * - PALE GREEN (PMS 365C): #CAE098 (R202 G222 B152)
 * - OFF WHITE (PMS COOL GRAY 1C): #F7F4EE (R247 G244 B238)
 * - DANDELION YELLOW (PMS 7548C): #FBBC00 (R251 G188 B0)
 */

// FireHawk Brand Colors - Static definition to avoid circular dependencies
const fireHawkColors = {
  brand: {
    // Official 2025 Brand Colors
    deepGreen: '#10392C',    // DEEP GREEN (PMS 627C)
    orange: '#EB5412',        // FIREHAWK ORANGE (PMS 1655C)
    paleGreen: '#CAE098',     // PALE GREEN (PMS 365C)
    offWhite: '#F7F4EE',      // OFF WHITE (PMS COOL GRAY 1C)
    yellow: '#FBBC00',        // DANDELION YELLOW (PMS 7548C)

    // Primary color scale - DEEP GREEN based
    primary: {
      50: '#e8f2f0',
      100: '#c6e0da',
      200: '#a0cdc2',
      300: '#7ab9aa',
      400: '#5ea798',
      500: '#429686',
      600: '#3c867e',
      700: '#337373',
      800: '#2b6169',
      900: '#10392C',  // Official DEEP GREEN (PMS 627C)
    },

    // Secondary color scale - FIREHAWK ORANGE based
    secondary: {
      50: '#fef5f0',
      100: '#fde6da',
      200: '#fcd5c2',
      300: '#fac4aa',
      400: '#f8b798',
      500: '#f7aa86',
      600: '#f69a6e',
      700: '#f38551',
      800: '#f16f36',
      900: '#EB5412',  // Official FIREHAWK ORANGE (PMS 1655C)
    },

    // Accent color - Uses DEEP GREEN for primary CTAs
    accent: {
      50: '#e8f2f0',
      100: '#c6e0da',
      200: '#a0cdc2',
      300: '#7ab9aa',
      400: '#5ea798',
      500: '#10392C',  // Official DEEP GREEN - Primary CTA color
      600: '#0a2d23',
      700: '#081f1a',
      800: '#061612',
      900: '#06191a',
    }
  },

  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  semantic: {
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    info: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    }
  }
};

module.exports = {
  content: [],
  theme: {
    extend: {
      // Typography
      fontFamily: {
        heading: ['Roboto Condensed', 'sans-serif'],
        subheading: ['Roboto Serif', 'serif'],
        body: ['Roboto', 'sans-serif'],
        sans: ['Roboto', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['Roboto Serif', 'Georgia', 'Times New Roman', 'serif'],
      },

      // Colors
      colors: {
        // FireHawk Brand Colors
        'brand-deep-green': fireHawkColors.brand.deepGreen,
        'brand-orange': fireHawkColors.brand.orange,
        'brand-pale-green': fireHawkColors.brand.paleGreen,
        'brand-off-white': fireHawkColors.brand.offWhite,
        'brand-yellow': fireHawkColors.brand.yellow,

        // Color scales for Tailwind utilities
        primary: fireHawkColors.brand.primary,
        secondary: fireHawkColors.brand.secondary,
        accent: fireHawkColors.brand.accent,
        neutral: fireHawkColors.neutral,

        // Semantic colors
        success: fireHawkColors.semantic.success,
        warning: fireHawkColors.semantic.warning,
        error: fireHawkColors.semantic.error,
        info: fireHawkColors.semantic.info,
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
};
