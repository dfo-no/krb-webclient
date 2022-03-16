import { Box } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import SpecSideBar from '../SideBar/SpecSideBar';
import makeStyles from '@mui/styles/makeStyles';
import theme from '../../theme';

const useStyles = makeStyles({
  editor: {
    backgroundColor: theme.palette.gray100.main
  }
});

export default function SpecEditor(): React.ReactElement {
  const { spec } = useAppSelector((state) => state.specification);
  const dispatch = useAppDispatch();
  const selectedBank = spec.bank;

  const classes = useStyles();

  return (
    <Box className={classes.editor}>
      {' '}
      <SpecSideBar />
    </Box>
  );
}
