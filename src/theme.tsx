import { createTheme } from '@mui/material/styles';

const theme = createTheme({
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
    },
    white: {
      main: '#ffff'
    },
    lightBlue: {
      main: '#009EE1'
    }
  }
});

theme.typography.footer = {
  color: theme.palette.white.main,
  fontSize: '1.1rem',
  wordWrap: 'break-word'
};

theme.components = {
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: theme.palette.gray100.main,
        borderBottom: `1px solid ${theme.palette.gray300.main}`
      }
    }
  },
  MuiButton: {
    variants: [
      {
        props: { variant: 'regularMuiButton' },
        style: {
          backgroundColor: theme.palette.blue.main,
          whiteSpace: 'nowrap',
          '&:hover': {
            background: '#0a4678'
          }
        }
      }
    ]
  },
  MuiLink: {
    styleOverrides: {
      root: {
        width: '100%',
        textDecoration: 'none'
      }
    }
  },
  MuiDivider: {
    styleOverrides: {
      root: {
        borderBottom: `2px solid #eb3486`
      }
    }
  }
};

export default theme;
