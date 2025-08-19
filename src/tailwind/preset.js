// FireHawk Brand Colors - Static definition to avoid circular dependencies
const fireHawkColors = {
  brand: {
    primary: {
      50: '#f0f8f5',
      100: '#dbeedf', 
      200: '#b8ddc2',
      300: '#8ac49c',
      400: '#5ca675',
      500: '#2d5a47', // FireHawk Deep Green
      600: '#26503f',
      700: '#1f4636',
      800: '#183c2e',
      900: '#123225',
      950: '#0c281d',
    },
    secondary: {
      50: '#fef5f1',
      100: '#fde8dc',
      200: '#fcd0b9',
      300: '#fab286',
      400: '#f78952',
      500: '#f55a2b', // FireHawk Orange
      600: '#e84314',
      700: '#d2330c',
      800: '#b62a0a',
      900: '#9a2409',
      950: '#7e1d07',
    },
    accent: {
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
      950: '#052e16',
    }
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#9e9e9e',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#09090b',
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
      950: '#052e16',
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
      950: '#451a03',
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
      950: '#450a0a',
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
      950: '#172554',
    }
  }
};

module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: fireHawkColors.brand.primary,
        secondary: fireHawkColors.brand.secondary,
        accent: fireHawkColors.brand.accent,
        neutral: fireHawkColors.neutral,
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