import '@mui/material/styles';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    primary: PaletteColor;
    secondary: PaletteColor;
    dfoBlue: PaletteColor;
    dfoInputBackground: PaletteColor;
    dfoWhite: PaletteColor;
    dfoLightBlue: PaletteColor;
    gray100: PaletteColor;
    gray200: PaletteColor;
    gray300: PaletteColor;
    gray400: PaletteColor;
    gray500: PaletteColor;
    gray900: PaletteColor;
    blue: PaletteColor;
    lightBlue: PaletteColor;
    indigo: PaletteColor;
    purple: PaletteColor;
    pink: PaletteColor;
    red: PaletteColor;
    yellow: PaletteColor;
    brandPrimary: PaletteColor;
    green: PaletteColor;
    teal: PaletteColor;
    cyan: PaletteColor;
    linkHoverColor: PaletteColor;
    success: PaletteColor;
  }

  interface PaletteOptions {
    primary?: PaletteColorOptions;
    secondary?: PaletteColorOptions;
    dfoBlue: PaletteColorOptions;
    dfoInputBackground: PaletteColorOptions;
    dfoWhite: PaletteColorOptions;
    dfoLightBlue: PaletteColorOptions;
    gray100: PaletteColorOptions;
    gray200: PaletteColorOptions;
    gray300: PaletteColorOptions;
    gray400: PaletteColorOptions;
    gray500: PaletteColorOptions;
    gray900: PaletteColorOptions;
    blue: PaletteColorOptions;
    lightBlue: PaletteColorOptions;
    indigo: PaletteColorOptions;
    purple: PaletteColorOptions;
    pink: PaletteColorOptions;
    red: PaletteColorOptions;
    yellow: PaletteColorOptions;
    brandPrimary: PaletteColorOptions;
    green: PaletteColorOptions;
    teal: PaletteColorOptions;
    cyan: PaletteColorOptions;
    linkHoverColor: PaletteColorOptions;
    success?: PaletteColorOptions;
  }
}
