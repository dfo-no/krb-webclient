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
    backgroundBlue: {
      main: '#bfe7f8'
    },
    darkBlue: {
      main: '#005c91'
    },
    lightBlue: {
      main: '#1fa9e6'
    },
    indigo: {
      main: '#005b91'
    },
    white: {
      main: '#ffff'
    },
    errorRed: {
      main: '#d32f2e'
    },
    errorRedBright: {
      main: '#e65655'
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
      main: '#c4c4c4'
    },
    gray500: {
      main: '#b5b5b5'
    },
    gray600: {
      main: '#828282'
    },
    gray700: {
      main: '#848484'
    },
    gray800: {
      main: '#333333'
    },
    black: {
      main: '#000000'
    },
    green: {
      main: '#019b78'
    },
    greenHover: {
      main: '#04ba91'
    },
    silver: {
      main: '#bbbbbb'
    }
  }
});

theme.typography.small = {
  fontSize: '14px',
  fontWeight: 400
};

theme.typography.smallBlue = {
  color: theme.palette.primary.main,
  fontSize: '16px',
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
  color: theme.palette.primary.main,
  fontSize: '15px',
  textDecoration: 'underline',
  fontWeight: 'bold',
  cursor: 'pointer'
};

theme.typography.smedium = {
  fontSize: '18px'
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
  fontSize: '48px',
  fontWeight: 550
};

theme.typography.biggerBold = {
  fontSize: '40px'
};

theme.typography.footerAddressText = {
  color: theme.palette.white.main,
  fontSize: '15px'
};

theme.typography.formCtrlErrorMessage = {
  color: theme.palette.white.main,
  paddingLeft: 10,
  fontSize: 14
};

theme.components = {
  MuiButton: {
    variants: [
      {
        props: { variant: 'primary' },
        style: {
          backgroundColor: theme.palette.indigo.main,
          color: theme.palette.white.main,
          whiteSpace: 'nowrap',
          height: 40,
          '&:hover': {
            background: theme.palette.primary.main
          }
        }
      },
      {
        props: { variant: 'warning' },
        style: {
          backgroundColor: theme.palette.errorRed.main,
          color: theme.palette.white.main,
          whiteSpace: 'nowrap',
          height: 40,
          '&:hover': {
            background: theme.palette.errorRed.main
          }
        }
      },
      {
        props: { variant: 'warningTransparent' },
        style: {
          color: theme.palette.errorRed.main,
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
          backgroundColor: theme.palette.green.main,
          color: theme.palette.white.main,
          whiteSpace: 'nowrap',
          height: 40,
          '&:hover': {
            background: theme.palette.greenHover.main
          }
        }
      },
      {
        props: { variant: 'saveTransparent' },
        style: {
          color: theme.palette.green.main,
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
        props: { variant: 'saveTransparent' },
        style: {
          color: theme.palette.green.main,
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
        props: { variant: 'cancel' },
        style: {
          backgroundColor: theme.palette.gray600.main,
          color: theme.palette.white.main,
          whiteSpace: 'nowrap',
          height: 40,
          '&:hover': {
            background: theme.palette.gray500.main
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
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        '&.sidebar': {
          border: '1px solid black',
          backgroundColor: theme.palette.white.main,
          '&.Mui-selected': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            '& .MuiListItemText-root': {
              color: 'inherit'
            }
          },
          '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            '& .MuiListItemText-root': {
              color: 'inherit'
            }
          }
        }
      }
    }
  }
};

export default theme;
