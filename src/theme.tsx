import '@fontsource/source-sans-pro';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: ['Source Sans Pro', 'Helvetica', 'Arial'].join(',')
  },

  // TODO: Out of sync with mui@5's breakpoints
  // @see https://mui.com/guides/migration-v4/#theme
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      mdd: 906,
      mddd: 956,
      lg: 1200,
      xl: 1536
    }
  },
  palette: {
    primary: {
      main: '#012a4c'
    },
    secondary: {
      main: '#009fe3'
    },
    dfoBlue: {
      main: '#005c91'
    },
    dfoDarkBlue: {
      main: '#012a4c'
    },
    dfoInputBackground: {
      main: '#f2f1f9'
    },
    dfoWhite: {
      main: '#ffff;'
    },
    dfoLightBlue: {
      main: '#1fa9e6'
    },
    dfoErrorRed: {
      main: '#d32f2e'
    },
    dfoErrorRedHover: {
      main: '#e65655'
    },
    dfoBackgroundBlue: {
      main: '#bfe7f8'
    },
    gray100: {
      main: '#f7f7f7'
    },
    gray200: {
      main: '#efefef'
    },
    gray300: {
      main: '#e5e5e5'
    },
    gray400: {
      main: '#d1d1d'
    },
    gray500: {
      main: '#c4c4c4'
    },
    gray600: {
      main: '#b5b5b5'
    },
    gray700: {
      main: '#828282'
    },
    gray800: {
      main: '#848484'
    },
    gray900: {
      main: '#333333'
    },
    blue: {
      main: '#012a4c'
    },
    black: {
      main: '#000000'
    },
    lightBlue: {
      main: '#1fa9e6'
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
      main: '#f7b715;'
    },
    brandPrimary: {
      main: '#012a4c'
    },
    green: {
      main: '#018566'
    },
    teal: {
      main: '#00ab84 '
    },
    cyan: {
      main: '#008ea6'
    },
    linkHoverColor: {
      main: '#009fe3'
    },
    saveGreen: {
      main: '#019b78'
    },
    saveGreenHover: {
      main: '#04ba91'
    },
    success: {
      main: '#018566'
    },
    silver: {
      main: '#bbbbbb'
    }
  }
});

theme.typography.xss = {
  fontSize: 12
};

theme.typography.sm = {
  fontSize: 14
};

theme.typography.md = {
  fontSize: 18
};

theme.typography.lg = {
  fontSize: 22
};

theme.typography.xl = {
  fontSize: 36
};

theme.typography.xxl = {
  fontSize: 50
};

theme.components = {
  MuiButton: {
    variants: [
      {
        props: { variant: 'primary' },
        style: {
          backgroundColor: theme.palette.indigo.main,
          color: theme.palette.dfoWhite.main,
          whiteSpace: 'nowrap',
          height: 40,
          '&:hover': {
            background: theme.palette.blue.main
          }
        }
      },
      {
        props: { variant: 'warning' },
        style: {
          backgroundColor: theme.palette.dfoErrorRed.main,
          color: theme.palette.dfoWhite.main,
          whiteSpace: 'nowrap',
          height: 40,
          '&:hover': {
            background: theme.palette.dfoErrorRedHover.main
          }
        }
      },
      {
        props: { variant: 'warningTransparent' },
        style: {
          color: theme.palette.dfoErrorRed.main,
          whiteSpace: 'nowrap',
          height: 40,
          textDecorationLine: 'underline',
          '&:hover': {
            background: 'none',
            textDecorationLine: 'underline'
          }
        }
      },
      {
        props: { variant: 'save' },
        style: {
          backgroundColor: theme.palette.saveGreen.main,
          color: theme.palette.dfoWhite.main,
          whiteSpace: 'nowrap',
          height: 40,
          '&:hover': {
            background: theme.palette.saveGreenHover.main
          }
        }
      },
      {
        props: { variant: 'saveTransparent' },
        style: {
          color: theme.palette.saveGreen.main,
          whiteSpace: 'nowrap',
          height: 40,
          textDecorationLine: 'underline',
          '&:hover': {
            background: 'none',
            textDecorationLine: 'underline'
          }
        }
      }
    ]
  },
  MuiCheckbox: {
    styleOverrides: {
      root: {
        width: '40px',
        height: '40px',
        paddingTop: '0',
        paddingBottom: '0'
      }
    }
  }
};

export default theme;
