import { styled } from '@mui/material';
import { Input } from '@mui/material';

const DFOTextField = styled(Input)(({ theme }) => ({
  width: '100%',
  border: `2px solid ${theme.palette.primary.main}`,
  backgroundColor: theme.palette.white.main,
  height: 45,
  paddingLeft: '10px',

  '&:hover': {
    border: `3px solid ${theme.palette.primary.main}`
  },
  '&.Mui-focused': {
    border: `3px solid ${theme.palette.primary.main}`
  },
  '&.Mui-error': {
    border: `2px solid ${theme.palette.errorRed.main}`,
    '&:hover': {
      borderColor: theme.palette.errorRed.main,
      borderWidth: 3
    },
    '&.Mui-focused': {
      borderColor: theme.palette.errorRed.main,
      borderWidth: 3
    }
  }
}));

export default DFOTextField;
