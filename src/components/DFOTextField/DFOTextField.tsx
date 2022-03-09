import { styled } from '@mui/material';
import TextField from '@mui/material/TextField';

const DFOTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.dfoWhite.main,
    '& fieldset': {
      borderColor: theme.palette.indigo.main,
      borderWidth: 2
    },
    '&:hover fieldset': {
      borderColor: theme.palette.indigo.main,
      borderWidth: 3
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.indigo.main,
      borderWidth: 3
    },
    '&.Mui-error': {
      '& fieldset': {
        borderColor: theme.palette.dfoErrorRed.main,
        borderWidth: 2
      },
      '&:hover fieldset': {
        borderColor: theme.palette.dfoErrorRed.main,
        borderWidth: 3
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.dfoErrorRed.main,
        borderWidth: 3
      }
    }
  },
  '& .MuiFilledInput-root': {
    backgroundColor: theme.palette.dfoWhite.main,
    border: `2px solid ${theme.palette.indigo.main}`
  },
  '& .MuiFilledInput-root:hover': {
    border: `3px solid ${theme.palette.indigo.main}`
  },
  '& .MuiFilledInput-root.Mui-focused': {
    border: `3px solid ${theme.palette.indigo.main}`
  }
}));

export default DFOTextField;
