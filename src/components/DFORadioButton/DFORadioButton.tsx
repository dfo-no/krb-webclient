import { Radio, styled } from '@mui/material/';

export const DFORadioButton = styled(Radio, {
  shouldForwardProp: (prop) => prop !== 'radioColor',
})<{ radioColor?: string }>(({ theme, radioColor }) => ({
  '& .MuiSvgIcon-root': {
    color: radioColor ? radioColor : theme.palette.lightBlue.main,
  },
}));
