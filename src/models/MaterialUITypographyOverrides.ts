import '@mui/material/styles';

declare module '@material-ui/core/Typography' {
  interface TypographyPropsVariantOverrides {
    whiteMuiTypography: true;
  }
}
