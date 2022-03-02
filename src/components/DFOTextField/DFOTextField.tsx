import { styled } from '@mui/material';
import TextField from '@mui/material/TextField';

const DFOTextField2 = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
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
  }
}));

export default DFOTextField2;
