import '@fontsource/source-sans-pro';
import { adaptV4Theme, createTheme } from '@mui/material/styles';
import dfoThemeScss from './dfo-theme.module.scss';

const theme = createTheme(
  adaptV4Theme({
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
  })
);

theme.typography.small = {
  fontSize: '14px',
  fontWeight: 400
};

theme.typography.smallBold = {
  fontSize: '14px',
  fontWeight: 'bold'
};

theme.typography.smallGray = {
  color: theme.palette.gray700.main,
  fontSize: '14px',
  whiteSpace: 'nowrap'
};

theme.typography.smallUnderline = {
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

theme.typography.smediumBold = {
  fontSize: '18px',
  fontWeight: 700
};

theme.typography.medium = {
  color: theme.palette.black.main,
  fontSize: '20px',
  fontWeight: 100
};

theme.typography.mediumBold = {
  fontSize: '20px',
  fontWeight: 700
};

theme.typography.mediumBlue = {
  color: theme.palette.primary.main,
  fontSize: '20px'
};

theme.typography.bigBold = {
  fontSize: '28px',
  fontWeight: 700
};

theme.typography.bigBlue = {
  color: theme.palette.primary.main,
  fontSize: '28px'
};

theme.typography.bigBoldBlue = {
  color: theme.palette.primary.main,
  fontSize: '32px',
  fontWeight: 500
};

theme.typography.biggerBold = {
  fontSize: '40px'
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
