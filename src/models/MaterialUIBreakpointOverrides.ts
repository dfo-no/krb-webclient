import '@mui/material';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    header: true;
    lg: true;
    xl: true;
  }
}
