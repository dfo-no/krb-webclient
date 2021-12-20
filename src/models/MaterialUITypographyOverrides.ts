import '@mui/material';
import React from 'react';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    footer: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    footer?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    footer: true;
  }
}
