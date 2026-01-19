/**
 * FireHawk Brand Typography - 2025 Official Guidelines
 * Source: Chase Design Group (July 2025)
 *
 * Web Fonts (Google Fonts - Free):
 * - Headlines: Roboto Condensed - Black
 * - Sub-headings: Roboto Serif - Medium
 * - Body Text: Roboto - Regular, Italic, Bold & Black
 *
 * Core Fonts (Professional Use):
 * - Headlines: Acumin Pro Condensed - Black & Regular
 * - Captions & Call-outs: Value Serif Pro - Medium
 * - Body Text & Subheadings: Acumin Pro - Regular, Italic, Bold & Black
 *
 * Note: All fonts can be downloaded or synced for free via Google Fonts
 */

export const typography = {
  fontFamily: {
    // Primary font families (Roboto family for web)
    heading: ['Roboto Condensed', 'sans-serif'],
    subheading: ['Roboto Serif', 'serif'],
    body: ['Roboto', 'sans-serif'],

    // Generic categories
    sans: ['Roboto', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
    serif: ['Roboto Serif', 'Georgia', 'Times New Roman', 'serif'],
    mono: ['monospace'],
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    '6xl': ['3.75rem', { lineHeight: '1' }],
    '7xl': ['4.5rem', { lineHeight: '1' }],
    '8xl': ['6rem', { lineHeight: '1' }],
    '9xl': ['8rem', { lineHeight: '1' }],
  },
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    regular: '400',    // Primary body text weight
    normal: '400',
    medium: '500',     // Sub-headings
    semibold: '600',
    bold: '700',       // Emphasis
    extrabold: '800',
    black: '900',      // Headlines
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
};

/**
 * Google Fonts Import URL for FireHawk Brand Fonts
 *
 * Includes:
 * - Roboto: Regular (400), Bold (700), Black (900) + Italic variants
 * - Roboto Condensed: Black (900) for headlines
 * - Roboto Serif: Medium (500) for sub-headings
 *
 * Usage in HTML:
 * <link rel="preconnect" href="https://fonts.googleapis.com">
 * <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
 * <link href="{googleFontsUrl}" rel="stylesheet">
 *
 * Usage in CSS:
 * @import url('{googleFontsUrl}');
 */
export const googleFontsUrl =
  'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=Roboto+Condensed:wght@900&family=Roboto+Serif:wght@500&display=swap';