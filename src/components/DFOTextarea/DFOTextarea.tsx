import { Input, styled } from '@mui/material';

const DFOTextarea = styled(Input)(({ theme }) => ({
  width: '100%',
  border: `2px solid ${theme.palette.indigo.main}`,
  backgroundColor: theme.palette.white.main,
  paddingLeft: '10px',

  '&:hover': {
    border: `3px solid ${theme.palette.indigo.main}`
  },
  '&.Mui-focused': {
    border: `3px solid ${theme.palette.indigo.main}`
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

export default DFOTextarea;
