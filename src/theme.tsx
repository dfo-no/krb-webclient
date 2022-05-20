import '@fontsource/source-sans-pro';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: ['Source Sans Pro', 'Helvetica', 'Arial'].join(','),
    xs: {
      fontSize: '0.75rem'
    },
    sm: {
      fontSize: '0.875rem'
    },
    md: {
      fontSize: '1.125rem'
    },
    lg: {
      fontSize: '1.375rem'
    },
    xl: {
      fontSize: '2.25rem'
    },
    xxl: {
      fontSize: '3.125rem',
      fontWeight: 'bold'
    },
    xsBold: {
      fontSize: '0.75rem',
      fontWeight: 'bold'
    },
    smBold: {
      fontSize: '0.875rem',
      fontWeight: 'bold'
    },
    mdBold: {
      fontSize: '1.125rem',
      fontWeight: 'bold'
    },
    lgBold: {
      fontSize: '1.375rem',
      fontWeight: 'bold'
    },
    xlBold: {
      fontSize: '2.25rem',
      fontWeight: 'bold'
    },
    xxlBold: {
      fontSize: '3.125rem',
      fontWeight: 'bold'
    }
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
      main: '#ffffff'
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
  },
  MuiChip: {
    styleOverrides: {
      root: {
        height: '100%',
        '&.MuiChip-root': {
          fontWeight: 'bold'
        }
      }
    }
  }
};

export default theme;
