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
      mdd: 906,
      mddd: 956,
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
    dfoBackgroundBlue: {
      main: dfoThemeScss.dfoBackgroundBlue
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
    gray700: {
      main: dfoThemeScss.gray700
    },
    gray800: {
      main: dfoThemeScss.gray800
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
    saveGreen: {
      main: dfoThemeScss.saveGreen
    },
    saveGreenHover: {
      main: dfoThemeScss.saveGreenHover
    },
    success: {
      main: dfoThemeScss.success
    },
    silver: {
      main: dfoThemeScss.silver
    }
  }
});

theme.typography.small = {
  color: theme.palette.black.main,
  fontSize: '14px'
};

theme.typography.smallBold = {
  color: theme.palette.black.main,
  fontSize: '14px',
  fontWeight: 'bold',
  whiteSpace: 'nowrap'
};

theme.typography.smallGray = {
  color: theme.palette.gray700.main,
  fontSize: '14px',
  whiteSpace: 'nowrap'
};

theme.typography.smallUnderline = {
  color: theme.palette.black.main,
  fontSize: '15px',
  textDecoration: 'underline'
};

theme.typography.smallUnderlineBlue = {
  color: theme.palette.dfoDarkBlue.main,
  fontSize: '15px',
  textDecoration: 'underline',
  fontWeight: 'bold',
  cursor: 'pointer'
};

theme.typography.medium = {
  color: theme.palette.black.main,
  fontSize: '20px',
  fontWeight: 100
};

theme.typography.mediumBold = {
  color: theme.palette.black.main,
  fontSize: '20px',
  fontWeight: 700
};

theme.typography.mediumBlue = {
  color: theme.palette.primary.main,
  fontSize: '20px'
};

theme.typography.big = {
  color: theme.palette.black.main,
  fontSize: '28px',
  fontWeight: 700
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
          backgroundColor: theme.palette.lightBlue.main,
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
      }
    ]
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        '&.Mui-selected, &.Mui-selected:hover': {
          backgroundColor: theme.palette.dfoDarkBlue.main,
          color: theme.palette.dfoWhite.main,
          '& .MuiListItemIcon-root': {
            display: 'block',
            textAlign: 'right',
            color: theme.palette.dfoWhite.main
          }
        },
        '&:hover': {
          backgroundColor: theme.palette.dfoDarkBlue.main,
          color: theme.palette.dfoWhite.main,
          '& .MuiListItemIcon-root': {
            display: 'block',
            textAlign: 'right',
            color: theme.palette.dfoWhite.main
          }
        },
        '& .MuiListItemIcon-root': {
          display: 'none'
        }
      }
    }
  }
};

export default theme;
