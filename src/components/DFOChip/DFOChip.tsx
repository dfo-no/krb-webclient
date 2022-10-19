import { Chip, styled } from '@mui/material/';
import theme from '../../theme';

export const DFOChip = styled(Chip)(() => ({
  marginRight: 'var(--small-gap)',
  marginLeft: 'var(--small-gap)',
  alignSelf: 'center',
  height: 24,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.white.main,
  '&.MuiChip-root': {
    fontWeight: 'bold',
  },
}));
