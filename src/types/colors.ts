export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface BrandColors {
  primary: ColorScale;
  secondary: ColorScale;
  accent: ColorScale;
}

export interface SemanticColors {
  success: {
    50: string;
    500: string;
    600: string;
    700: string;
  };
  warning: {
    50: string;
    500: string;
    600: string;
    700: string;
  };
  error: {
    50: string;
    500: string;
    600: string;
    700: string;
  };
  info: {
    50: string;
    500: string;
    600: string;
    700: string;
  };
}