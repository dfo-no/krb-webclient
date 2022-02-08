import '@mui/material';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    header: true;
    gg: true;
    lg: true;
    xl: true;
  }
}
