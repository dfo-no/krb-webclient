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
      main: dfoThemeScss.success
    }
  }
});

theme.components = {
  MuiButton: {
    styleOverrides: {
      root: {
        backgroundColor: theme.palette.gray100.main,
        borderBottom: `1px solid ${theme.palette.gray300.main}`
      }
    },
    variants: [
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
