import { createTheme } from '@material-ui/core/styles';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {
  export interface PaletteOptions {
    dfoBlue: {
      main: string;
    };
    dfoInputBackground: {
      main: string;
    };
    dfoLightBorder: {
      main: string;
    };
  }
}

const colors = [
  '#005b91' //dfoBlue
];

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(217,255,102,1)'
    },
    dfoBlue: {
      main: colors[0]
    },
    dfoInputBackground: {
      main: '#005b91'
    },
    dfoLightBorder: {
      main: '#005b91'
    }
  },
  overrides: {
    MuiButton: {
      root: {
        backgroundColor: colors[0]
      }
    }
  }
});

export default theme;
