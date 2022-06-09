import '@fontsource/source-sans-pro';
import '@fontsource/source-serif-pro';
import { createTheme } from '@mui/material/styles';

const baseFont = ['Source Sans Pro', 'Helvetica', 'Arial', 'sans-serif'].join(
  ','
);
const headerFont = ['Source Serif Pro', 'Times New Roman', 'Serif'].join(',');

const theme = createTheme({
  typography: {
    htmlFontSize: 10,
    fontFamily: baseFont,
    h1: {
      fontSize: '5rem',
      fontFamily: headerFont
    },
    xs: {
      fontSize: '1.2rem'
    },
    sm: {
      fontSize: '1.4rem'
    },
    md: {
      fontSize: '1.8rem'
    },
    lg: {
      fontSize: '2.2rem'
    },
    xl: {
      fontSize: '3.6rem'
    },
    xxl: {
      fontSize: '5.0rem',
      fontWeight: 'bold'
    },
    xsBold: {
      fontSize: '1.2rem',
      fontWeight: 'bold'
    },
    smBold: {
      fontSize: '1.4rem',
      fontWeight: 'bold'
    },
    mdBold: {
      fontSize: '1.8rem',
      fontWeight: 'bold'
    },
    lgBold: {
      fontSize: '2.2rem',
      fontWeight: 'bold'
    },
    xlBold: {
      fontSize: '3.6rem',
      fontWeight: 'bold'
    },
    xxlBold: {
      fontSize: '5.0rem',
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
          border: '0.1rem solid black',
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
  MuiToolbar: {
    styleOverrides: {
      root: {
        paddingLeft: 0
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
  },
  MuiCardHeader: {
    styleOverrides: {
      root: {
        '& .MuiCardHeader-title': {
          fontFamily: headerFont,
          fontWeight: 'bold'
        }
      }
    }
  }
};

export default theme;
