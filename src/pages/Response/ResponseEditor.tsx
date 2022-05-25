import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import theme from '../../theme';
import ResponseSideBar from './SideBar/ResponseSideBar';
import AnswerProduct from './Answer/AnswerProduct';

const useStyles = makeStyles({
  page: {
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.gray100.main
  },
  content: {
    flex: '3 1 0',
    minWidth: 0,
    margin: 64,
    marginBottom: 25,
    marginTop: 20,
    backgroundColor: theme.palette.gray200.main
  }
});

export default function ResponseEditor(): React.ReactElement {
  const classes = useStyles();

  return (
    <Box className={classes.page}>
      <ResponseSideBar />
      <Box className={classes.content}>
        <AnswerProduct />
      </Box>
    </Box>
  );
}
