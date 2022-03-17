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
    biggerBold: React.CSSProperties;
    smedium: React.CSSProperties;
    smediumBold: React.CSSProperties;
    medium: React.CSSProperties;
    mediumBold: React.CSSProperties;
    mediumBlue: React.CSSProperties;
    bigBlue: React.CSSProperties;
    bigBoldBlue: React.CSSProperties;
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
    biggerBold?: React.CSSProperties;
    smedium?: React.CSSProperties;
    smediumBold?: React.CSSProperties;
    medium?: React.CSSProperties;
    mediumBold?: React.CSSProperties;
    mediumBlue?: React.CSSProperties;
    bigBlue?: React.CSSProperties;
    bigBoldBlue?: React.CSSProperties;
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
    biggerBold: true;
    smedium: true;
    smediumBold: true;
    medium: true;
    mediumBold: true;
    mediumBlue: true;
    bigBlue: true;
    bigBoldBlue: true;
    footerAddressText: true;
    footerLinkText: true;
    formCtrlErrorMessage: true;
  }
}
