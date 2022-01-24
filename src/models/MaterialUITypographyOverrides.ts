import '@mui/material';
import React from 'react';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    headerText: React.CSSProperties;
    headerProjectText: React.CSSProperties;
    footerAddressText: React.CSSProperties;
    textCtrlErrorMessage: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    headerText?: React.CSSProperties;
    headerProjectText?: React.CSSProperties;
    footerAddressText?: React.CSSProperties;
    textCtrlErrorMessage?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    headerText: true;
    headerProjectText: true;
    footerAddressText: true;
    textCtrlErrorMessage: true;
  }
}
