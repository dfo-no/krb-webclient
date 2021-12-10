import { createTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    primary: PaletteColor;
    secondary: PaletteColor;
    dfoBlue: PaletteColor;
    dfoInputBackground: PaletteColor;
    gray100: PaletteColor;
    gray200: PaletteColor;
    gray300: PaletteColor;
    gray400: PaletteColor;
    gray500: PaletteColor;
    gray900: PaletteColor;
    blue: PaletteColor;
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
    gray100: PaletteColorOptions;
    gray200: PaletteColorOptions;
    gray300: PaletteColorOptions;
    gray400: PaletteColorOptions;
    gray500: PaletteColorOptions;
    gray900: PaletteColorOptions;
    blue: PaletteColorOptions;
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

const palette = createTheme({
  palette: {
    primary: {
      main: '#012a4c'
    },
    secondary: {
      main: '#009fe3'
    },
    dfoBlue: {
      main: '#005b91'
    },
    dfoInputBackground: {
      main: '#f2f1f9'
    },
    gray100: {
      main: '#f7f7f7'
    },
    gray200: {
      main: '#efefef'
    },
    gray300: {
      main: '#e6e6e6'
    },
    gray400: {
      main: '#d1d1d1'
    },
    gray500: {
      main: '#828282'
    },
    gray900: {
      main: '#333333'
    },
    blue: {
      main: '#012a4c'
    },
    indigo: {
      main: '#005b91'
    },
    purple: {
      main: '#009fe3'
    },
    pink: {
      main: '#e83f53'
    },
    red: {
      main: '#e52036'
    },
    yellow: {
      main: '#f7b715'
    },
    brandPrimary: {
      main: '#012a4c'
    },
    green: {
      main: '#018566'
    },
    teal: {
      main: '#00ab84'
    },
    cyan: {
      main: '#008ea6'
    },
    linkHoverColor: {
      main: '#009fe3'
    },
    success: {
      main: '#018566'
    }
  }
});

const theme = createTheme(
  {
    overrides: {
      MuiButton: {
        root: {
          backgroundColor: palette.palette.yellow.main
        }
      },
      MuiAppBar: {
        root: {
          borderBottom: '1px solid #e6e6e6'
        },
        colorPrimary: {
          backgroundColor: palette.palette.gray100.main
        }
      }
    }
  },
  palette
);

export default theme;
