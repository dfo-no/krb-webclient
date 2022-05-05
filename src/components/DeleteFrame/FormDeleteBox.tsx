import { Box, styled } from '@mui/material';

export const FormDeleteBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'boxColor'
})<{ boxColor?: string }>(({ theme, boxColor }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  backgroundColor: boxColor ? boxColor : theme.palette.errorRed.main,
  border: `2px solid ${boxColor ? boxColor : theme.palette.errorRed.main}`
}));
