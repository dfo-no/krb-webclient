import { Radio, styled } from '@mui/material/';

export const DFORadio = styled(Radio, {
  shouldForwardProp: (prop) => prop !== 'radioColor',
})<{ radioColor?: string }>(({ radioColor }) => ({
  '& .MuiSvgIcon-root': {
    color: radioColor ? radioColor : 'var(--primary-light-color)',
    fill: radioColor ? radioColor : 'var(--primary-light-color)',
  },
  '&:hover': { background: 'transparent' },
}));
