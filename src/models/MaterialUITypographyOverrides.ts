import '@mui/material';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    footerTypography: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    footerTypography?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    footerTypography: true;
  }
}
