import { createTheme } from '@mui/material/styles';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    ordinary: true;
  }
}

declare module '@mui/material/styles/createPalette' {
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

const theme = createTheme({
  palette: {
    primary: {
      main: '#fffffff'
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

theme.components = {
  MuiButton: {
    variants: [
      {
        props: { variant: 'ordinary' },
        style: {
          backgroundColor: theme.palette.gray400.main,
          whiteSpace: 'nowrap'
        }
      },
      {
        props: { variant: 'ordinary' },
        style: {
          backgroundColor: theme.palette.gray400.main,
          whiteSpace: 'nowrap'
        }
      }
    ]
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: theme.palette.gray100.main,
        borderBottom: `1px solid ${theme.palette.gray300.main}`
      }
    }
  }
};

export default theme;
