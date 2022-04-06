import '@mui/material';
import React from 'react';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    xs: React.CSSProperties;
    sm: React.CSSProperties;
    md: React.CSSProperties;
    lg: React.CSSProperties;
    xl: React.CSSProperties;
    xxl: React.CSSProperties;
    xsBold: React.CSSProperties;
    smBold: React.CSSProperties;
    mdBold: React.CSSProperties;
    lgBold: React.CSSProperties;
    xlBold: React.CSSProperties;
    xxlBold: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    xs?: React.CSSProperties;
    sm?: React.CSSProperties;
    md?: React.CSSProperties;
    lg?: React.CSSProperties;
    xl?: React.CSSProperties;
    xxl?: React.CSSProperties;
    xsBold?: React.CSSProperties;
    smBold?: React.CSSProperties;
    mdBold?: React.CSSProperties;
    lgBold?: React.CSSProperties;
    xlBold?: React.CSSProperties;
    xxlBold?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    xs?: true;
    sm?: true;
    md?: true;
    lg?: true;
    xl?: true;
    xxl?: true;
    xsBold?: true;
    smBold?: true;
    mdBold?: true;
    lgBold?: true;
    xlBold?: true;
    xxlBold?: true;
  }
}
