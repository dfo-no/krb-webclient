import '@mui/material';
import React from 'react';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    small: React.CSSProperties;
    big: React.CSSProperties;
    footerAddressText: React.CSSProperties;
    textCtrlErrorMessage: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    small?: React.CSSProperties;
    big?: React.CSSProperties;
    footerAddressText?: React.CSSProperties;
    textCtrlErrorMessage?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    small: true;
    big: true;
    footerAddressText: true;
    textCtrlErrorMessage: true;
  }
}
