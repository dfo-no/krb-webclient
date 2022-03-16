import { Box } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import SpecSideBar from '../SideBar/SpecSideBar';
import makeStyles from '@mui/styles/makeStyles';
import theme from '../../theme';
import { ThemeProvider } from '@mui/styles';

const useStyles = makeStyles({
  editor: {
    display: 'flex',
    paddingTop: 30,
    height: '100%',
    backgroundColor: theme.palette.gray100.main
  },
  editorContent: {
    backgroundColor: '#efefef',
    width: '65%'
  }
});

export default function SpecEditor(): React.ReactElement {
  const { spec } = useAppSelector((state) => state.specification);
  const dispatch = useAppDispatch();
  const selectedBank = spec.bank;

  const classes = useStyles();

  return (
    <Box className={classes.editor}>
      <SpecSideBar />
      <Box className={classes.editorContent}></Box>
    </Box>
  );
}
