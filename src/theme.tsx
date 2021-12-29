import { createTheme } from '@mui/material/styles';
import dfoThemeScss from './dfo-theme.module.scss';

const theme = createTheme({
  palette: {
    primary: {
      main: dfoThemeScss.primary
    },
    secondary: {
      main: dfoThemeScss.secondary
    },
    dfoBlue: {
      main: dfoThemeScss.dfoBlue
    },
    dfoInputBackground: {
      main: dfoThemeScss.dfoInputBackground
    },
    gray100: {
      main: dfoThemeScss.gray100
    },
    gray200: {
      main: dfoThemeScss.gray200
    },
    gray300: {
      main: dfoThemeScss.gray300
    },
    gray400: {
      main: dfoThemeScss.gray400
    },
    gray500: {
      main: dfoThemeScss.gray500
    },
    gray900: {
      main: dfoThemeScss.gray900
    },
    blue: {
      main: dfoThemeScss.blue
    },
    indigo: {
      main: dfoThemeScss.indigo
    },
    purple: {
      main: dfoThemeScss.purple
    },
    pink: {
      main: dfoThemeScss.pink
    },
    red: {
      main: dfoThemeScss.red
    },
    yellow: {
      main: dfoThemeScss.yellow
    },
    brandPrimary: {
      main: dfoThemeScss.brandPrimary
    },
    green: {
      main: dfoThemeScss.green
    },
    teal: {
      main: dfoThemeScss.teal
    },
    cyan: {
      main: dfoThemeScss.cyan
    },
    linkHoverColor: {
      main: dfoThemeScss.linkHoverColor
    },
    success: {
      main: '#018566'
    },
    white: {
      main: '#ffff'
    },
    dfoLightBlue: {
      main: dfoThemeScss.success
    }
  }
});

theme.typography.footerLinkText = {
  color: 'theme.palette.white.main',
  fontFamily: 'Source Sans Pro,sans-serif,helvetica,arial',
  fontWeight: 'bold'
};

theme.typography.footerAddressText = {
  color: theme.palette.white.main,
  fontFamily: 'Source Sans Pro,sans-serif,helvetica,arial'
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
        props: { variant: 'primary' },
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
        textDecoration: 'none',
        color: theme.palette.white.main
      }
    }
  },
  MuiList: {
    styleOverrides: {
      root: {
        color: 'red'
      }
    }
  },
  MuiListItem: {
    styleOverrides: {
      root: {
        '&:hover': {
          color: theme.palette.dfoLightBlue.main
        }
      }
    }
  }
};

export default theme;
