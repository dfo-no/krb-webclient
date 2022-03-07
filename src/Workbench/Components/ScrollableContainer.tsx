import { Box, styled } from '@mui/material';

export const ScrollableContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexGrow: 1,
  minHeight: 0,
  overflowY: 'auto',
  alignSelf: 'center',
  width: '100%',
  paddingRight: 8,
  paddingBottom: 16,

  '::-webkit-scrollbar': {
    width: '10px'
  },
  '::-webkit-scrollbar-track': {
    boxShadow: `inset 0 0 5px ${theme.palette.dfoDarkBlue.main}`,
    borderRadius: '10px'
  },

  /* Handle */
  '::-webkit-scrollbar-thumb': {
    background: theme.palette.dfoDarkBlue.main,
    borderRadius: '10px'
  },

  /* Handle on hover */
  '::-webkit-scrollbar-thumb:hover': {
    backgroundColor: theme.palette.black.main
  }
}));
