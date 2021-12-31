import '@fontsource/source-sans-pro';
import { createTheme } from '@mui/material/styles';
import dfoThemeScss from './dfo-theme.module.scss';

const theme = createTheme({
  typography: {
    fontFamily: ['Source Sans Pro', 'Helvetica', 'Arial'].join(',')
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
    dfoInputBackground: {
      main: dfoThemeScss.dfoInputBackground
    },
    dfoWhite: {
      main: dfoThemeScss.dfoWhite
    },
    dfoLightBlue: {
      main: dfoThemeScss.dfoLightBlue
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

theme.typography.footerLinkText = {
  fontFamily: 'Source Sans Pro,sans-serif,helvetica,arial',
  fontWeight: 'bold',
  fontSize: '18px',
  color: theme.palette.dfoWhite.main,
  textDecoration: 'none'
};

theme.typography.footerAddressText = {
  color: theme.palette.dfoWhite.main,
  fontSize: '18px'
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
          color: theme.palette.dfoWhite.main,
          whiteSpace: 'nowrap',
          '&:hover': {
            background: theme.palette.lightBlue.main
          }
        }
      },
      {
        props: { variant: 'listButton' },
        style: {
          backgroundColor: theme.palette.dfoWhite.main,
          width: 300
        }
      }
    ]
  }
};

export default theme;
