import '@mui/material';
import React from 'react';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    xss: React.CSSProperties;
    sm: React.CSSProperties;
    md: React.CSSProperties;
    lg: React.CSSProperties;
    xl: React.CSSProperties;
    xxl: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    xss?: React.CSSProperties;
    sm?: React.CSSProperties;
    md?: React.CSSProperties;
    lg?: React.CSSProperties;
    xl?: React.CSSProperties;
    xxl?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    xss?: true;
    sm?: true;
    md?: true;
    lg?: true;
    xl?: true;
    xxl?: true;
  }
}
