import { CardContent, styled } from '@mui/material/';

export const DFOCardHeader = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  padding: 0,
  color: theme.palette.dfoWhite.main,
  backgroundColor: theme.palette.dfoDarkBlue.main
}));
