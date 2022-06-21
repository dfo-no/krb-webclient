import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const DFOPickerField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    height: 45,
    borderRadius: 0,
    '& fieldset': {
      border: '0.2rem solid var(--primary-light-color)'
    },
    '&.Mui-focused fieldset': {
      border: '0.3rem solid var(--primary-light-color)'
    },
    '&:hover fieldset': {
      border: '0.3rem solid var(--primary-light-color)'
    }
  }
}));

export default DFOPickerField;
