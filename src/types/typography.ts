export interface Typography {
  fontFamily: {
    sans: string[];
    serif: string[];
    mono: string[];
  };
  fontSize: {
    [key: string]: string | [string, { lineHeight: string }];
  };
  fontWeight: {
    [key: string]: string;
  };
  letterSpacing: {
    [key: string]: string;
  };
}