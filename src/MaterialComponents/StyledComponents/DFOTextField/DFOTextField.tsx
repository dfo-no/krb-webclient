import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

export const DFOTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '2px solid #005b91'
    }
  }
}));
