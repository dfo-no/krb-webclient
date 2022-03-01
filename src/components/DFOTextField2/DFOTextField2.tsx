import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const DFOTextField2 = styled(TextField)({
  '& input:valid + fieldset': {
    borderColor: '#005b91',
    borderWidth: 2
  },
  '& input:invalid + fieldset': {
    borderColor: 'green',
    borderWidth: 2 // in px
  },
  '& input:valid:focus + fieldset': {
    borderColor: '#005b91',
    borderWidth: 3, // in px
    // borderLeftWidth: 2,
    padding: '3px !important' // override inline-style
  },
  '& input:valid:hover + fieldset': {
    borderColor: '#005b91',
    borderWidth: 3, // in px
    // borderLeftWidth: 2,
    padding: '3px !important' // override inline-style
  }
});

export default DFOTextField2;
