import { styled } from '@mui/material';
import { Input } from '@mui/material';

const DFOTextField = styled(Input)(({ theme }) => ({
  width: '100%',
  border: `2px solid ${theme.palette.indigo.main}`,
  height: 48,
  paddingLeft: '10px'
}));

export default DFOTextField;
