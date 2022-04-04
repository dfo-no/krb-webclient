import '@mui/material/styles';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    primary: PaletteColor;
    secondary: PaletteColor;
    darkBlue: PaletteColor;
    white: PaletteColor;
    lightBlue: PaletteColor;
    errorRed: PaletteColor;
    errorRedBright: PaletteColor;
    backgroundBlue: PaletteColor;
    gray100: PaletteColor;
    gray200: PaletteColor;
    gray300: PaletteColor;
    gray400: PaletteColor;
    gray500: PaletteColor;
    gray600: PaletteColor;
    gray700: PaletteColor;
    gray800: PaletteColor;
    black: PaletteColor;
    indigo: PaletteColor;
    green: PaletteColor;
    greenHover: PaletteColor;
    success: PaletteColor;
    silver: PaletteColor;
  }

  interface PaletteOptions {
    primary?: PaletteColorOptions;
    secondary?: PaletteColorOptions;
    darkBlue: PaletteColorOptions;
    white: PaletteColorOptions;
    lightBlue: PaletteColorOptions;
    errorRed: PaletteColorOptions;
    errorRedBright: PaletteColorOptions;
    backgroundBlue: PaletteColorOptions;
    gray100: PaletteColorOptions;
    gray200: PaletteColorOptions;
    gray300: PaletteColorOptions;
    gray400: PaletteColorOptions;
    gray500: PaletteColorOptions;
    gray600: PaletteColorOptions;
    gray700: PaletteColorOptions;
    gray800: PaletteColorOptions;
    black: PaletteColorOptions;
    indigo: PaletteColorOptions;
    green: PaletteColorOptions;
    greenHover: PaletteColorOptions;
    success?: PaletteColorOptions;
    silver?: PaletteColorOptions;
  }
}
