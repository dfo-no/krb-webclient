import { Box, styled } from '@mui/material';

export const FormDeleteBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'boxColor',
})<{ boxColor: string }>(({ boxColor }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  backgroundColor: boxColor,
  border: `0.2rem solid ${boxColor}`,
}));
