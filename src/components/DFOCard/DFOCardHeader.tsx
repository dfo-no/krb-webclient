import { CardContent, styled } from '@mui/material/';

export const DFOCardHeader = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  padding: 0,
  color: theme.palette.white.main,
  backgroundColor: theme.palette.primary.main
}));
