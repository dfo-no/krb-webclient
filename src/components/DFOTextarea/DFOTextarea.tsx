import { Input, styled } from '@mui/material';

const DFOTextarea = styled(Input)(({ theme }) => ({
  width: '100%',
  border: `0.2rem solid ${theme.palette.indigo.main}`,
  backgroundColor: theme.palette.white.main,
  height: 90,
  paddingLeft: '1rem',

  '&:hover': {
    border: `0.3rem solid ${theme.palette.indigo.main}`
  },
  '&.Mui-focused': {
    border: `0.3rem solid ${theme.palette.indigo.main}`
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

export default DFOTextarea;
