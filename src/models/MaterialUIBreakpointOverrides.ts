import '@mui/material';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    mdd: true;
    mddd: true;
    lg: true;
    xl: true;
  }
}
