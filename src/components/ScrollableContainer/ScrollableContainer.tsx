import { Box, styled } from '@mui/material';

export const ScrollableContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  minHeight: 0,
  overflowY: 'auto',
  alignSelf: 'center',
  width: '100%',
  marginBottom: 16,

  '::-webkit-scrollbar': {
    width: '1rem',
  },
  '::-webkit-scrollbar-track': {
    boxShadow: `inset 0 0 0.5rem ${theme.palette.primary.main}`,
    borderRadius: '1rem',
  },

  /* Handle */
  '::-webkit-scrollbar-thumb': {
    background: theme.palette.primary.main,
    borderRadius: '1rem',
  },

  /* Handle on hover */
  '::-webkit-scrollbar-thumb:hover': {
    backgroundColor: theme.palette.black.main,
  },
}));
