import { createTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    dfoBlue?: Palette['primary'];
    dfoInputBackground?: Palette['primary'];
  }
  interface PaletteOptions {
    dfoBlue?: PaletteOptions['primary'];
    dfoInputBackground?: PaletteOptions['primary'];
  }
}

const theme = createTheme({
  spacing: [
    2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40,
    42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78,
    80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100
  ],
  palette: {
    dfoBlue: {
      main: '#005b91'
    },
    dfoInputBackground: {
      main: '#f2f1f9'
    }
  }
});

export default theme;
