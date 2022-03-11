import { styled } from '@mui/material';
import { Input } from '@mui/material';

const DFOTextField = styled(Input)(({ theme }) => ({
  width: '100%',
  border: `2px solid ${theme.palette.indigo.main}`,
  backgroundColor: theme.palette.dfoWhite.main,
  height: 50,
  paddingLeft: '10px',

  '&:hover': {
    border: `3px solid ${theme.palette.indigo.main}`
  },
  '&.Mui-focused': {
    border: `3px solid ${theme.palette.indigo.main}`
  },
  '&.Mui-error': {
    border: `2px solid ${theme.palette.dfoErrorRed.main}`,
    '&:hover': {
      borderColor: theme.palette.dfoErrorRed.main,
      borderWidth: 3
    },
    '&.Mui-focused': {
      borderColor: theme.palette.dfoErrorRed.main,
      borderWidth: 3
    }
  }
}));

export default DFOTextField;
