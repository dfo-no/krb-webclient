import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

export const DFOTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-input': {
    color: 'green'
  },
  '& .MuiInputLabel-root': {
    color: 'green'
  },
  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    border: '2px solid red'
  },
  '&:hover .MuiOutlinedInput-input': {
    color: 'red'
  },
  '&:hover .MuiInputLabel-root': {
    color: 'red'
  },
  '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    borderColor: 'red'
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
    color: 'purple'
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'purple'
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'purple'
  }
}));
