import '@mui/material/styles';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    primary: true;
    warning: true;
    warningTransparent: true;
    save: true;
    saveTransparent: true;
  }
}
