import '@mui/material';
import React from 'react';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    small: React.CSSProperties;
    smallUnderline: React.CSSProperties;
    smallUnderlineBlue: React.CSSProperties;
    big: React.CSSProperties;
    bigScale: React.CSSProperties;
    footerAddressText: React.CSSProperties;
    textCtrlErrorMessage: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    small?: React.CSSProperties;
    smallUnderline?: React.CSSProperties;
    smallUnderlineBlue?: React.CSSProperties;
    big?: React.CSSProperties;
    bigScale?: React.CSSProperties;
    footerAddressText?: React.CSSProperties;
    textCtrlErrorMessage?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    small: true;
    smallUnderline: true;
    smallUnderlineBlue: true;
    big: true;
    bigScale: true;
    footerAddressText: true;
    textCtrlErrorMessage: true;
  }
}
