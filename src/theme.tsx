import '@fontsource/source-sans-pro';
import { createTheme } from '@mui/material/styles';
import dfoThemeScss from './dfo-theme.module.scss';

const theme = createTheme({
  typography: {
    fontFamily: ['Source Sans Pro', 'Helvetica', 'Arial'].join(',')
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      header: 906,
      lg: 1200,
      xl: 1536
    }
  },
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
    dfoDarkBlue: {
      main: dfoThemeScss.dfoDarkBlue
    },
    dfoInputBackground: {
      main: dfoThemeScss.dfoInputBackground
    },
    dfoWhite: {
      main: dfoThemeScss.dfoWhite
    },
    dfoLightBlue: {
      main: dfoThemeScss.dfoLightBlue
    },
    dfoErrorRed: {
      main: dfoThemeScss.dfoErrorRed
    },
    dfoErrorRedHover: {
      main: dfoThemeScss.dfoErrorRedHover
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
    gray600: {
      main: dfoThemeScss.gray600
    },
    gray900: {
      main: dfoThemeScss.gray900
    },
    blue: {
      main: dfoThemeScss.blue
    },
    black: {
      main: dfoThemeScss.black
    },
    lightBlue: {
      main: dfoThemeScss.lightBlue
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
      main: dfoThemeScss.success
    }
  }
});

theme.typography.small = {
  color: theme.palette.black.main,
  fontSize: '14px'
};

theme.typography.smallUnderline = {
  color: theme.palette.black.main,
  fontSize: '15px',
  textDecoration: 'underline'
};

theme.typography.smallUnderlineBlue = {
  color: theme.palette.dfoDarkBlue.main,
  fontSize: '14px',
  textDecoration: 'underline',
  fontWeight: 'bold',
  cursor: 'pointer'
};

theme.typography.big = {
  color: theme.palette.black.main,
  fontSize: '28px',
  fontWeight: 700
};

theme.typography.bigScale = {
  color: theme.palette.black.main,
  fontSize: '28px',
  fontWeight: 700,
  [theme.breakpoints.down('header')]: {
    fontSize: '20px'
  }
};

theme.typography.footerAddressText = {
  color: theme.palette.dfoWhite.main,
  fontSize: '15px'
};

theme.typography.formCtrlErrorMessage = {
  color: theme.palette.dfoErrorRed.main,
  paddingLeft: 10,
  fontSize: 14
};

theme.components = {
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: theme.palette.dfoWhite.main,
        borderBottom: `2px solid ${theme.palette.gray300.main}`
      }
    }
  },
  MuiButton: {
    variants: [
      {
        props: { variant: 'primary' },
        style: {
          backgroundColor: theme.palette.blue.main,
          color: theme.palette.dfoWhite.main,
          whiteSpace: 'nowrap',
          '&:hover': {
            background: theme.palette.lightBlue.main
          }
        }
      },
      {
        props: { variant: 'warning' },
        style: {
          backgroundColor: theme.palette.dfoErrorRed.main,
          color: theme.palette.dfoWhite.main,
          whiteSpace: 'nowrap',
          '&:hover': {
            background: theme.palette.dfoErrorRedHover.main
          }
        }
      }
    ]
  },
  MuiList: {
    styleOverrides: {
      root: {
        paddingTop: '0',
        paddingBottom: '0'
      }
    }
  }
};

export default theme;
