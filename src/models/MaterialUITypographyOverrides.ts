import '@mui/material';
import React from 'react';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    footerAddressText: React.CSSProperties;
    footerLinkText: React.CSSProperties;
    textCtrlErrorMessage: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    footerAddressText?: React.CSSProperties;
    footerLinkText?: React.CSSProperties;
    textCtrlErrorMessage?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    footerAddressText: true;
    footerLinkText: true;
    textCtrlErrorMessage: true;
  }
}
