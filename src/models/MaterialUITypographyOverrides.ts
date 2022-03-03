import '@mui/material';
import React from 'react';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    small: React.CSSProperties;
    smallBold: React.CSSProperties;
    smallGray: React.CSSProperties;
    smallUnderline: React.CSSProperties;
    smallUnderlineBlue: React.CSSProperties;
    bigBold: React.CSSProperties;
    medium: React.CSSProperties;
    mediumBold: React.CSSProperties;
    mediumBlue: React.CSSProperties;
    footerAddressText: React.CSSProperties;
    footerLinkText: React.CSSProperties;
    formCtrlErrorMessage: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    small?: React.CSSProperties;
    smallBold?: React.CSSProperties;
    smallGray?: React.CSSProperties;
    smallUnderline?: React.CSSProperties;
    smallUnderlineBlue?: React.CSSProperties;
    bigBold?: React.CSSProperties;
    medium?: React.CSSProperties;
    mediumBold?: React.CSSProperties;
    mediumBlue?: React.CSSProperties;
    footerAddressText?: React.CSSProperties;
    footerLinkText?: React.CSSProperties;
    formCtrlErrorMessage?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    small: true;
    smallBold: true;
    smallGray: true;
    smallUnderline: true;
    smallUnderlineBlue: true;
    bigBold: true;
    medium: true;
    mediumBold: true;
    mediumBlue: true;
    footerAddressText: true;
    footerLinkText: true;
    formCtrlErrorMessage: true;
  }
}
