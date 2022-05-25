import { Input } from '@mui/material';
import { styled } from '@mui/material/styles';

const DFOTextField = styled(Input)(({ theme }) => ({
  width: '100%',
  border: `0.1rem solid ${theme.palette.primary.main}`,
  backgroundColor: theme.palette.white.main,
  height: 45,
  paddingLeft: '1rem',

  '&:hover': {
    border: `0.3rem solid ${theme.palette.primary.main}`
  },
  '&.Mui-focused': {
    border: `0.3rem solid ${theme.palette.primary.main}`
  },
  '&.Mui-error': {
    border: `0.2rem solid ${theme.palette.errorRed.main}`,
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
