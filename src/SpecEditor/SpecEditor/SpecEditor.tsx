import { Box, Typography } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import SpecSideBar from '../SideBar/SpecSideBar';
import makeStyles from '@mui/styles/makeStyles';
import theme from '../../theme';
import byggernIllustration from '../../assets/images/byggern-illustration.svg';

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
  },
  editorContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  }
});

export default function SpecEditor(): React.ReactElement {
  const { spec } = useAppSelector((state) => state.specification);
  const dispatch = useAppDispatch();
  const selectedBank = spec.bank;

  console.log(selectedBank);

  const classes = useStyles();

  return (
    <Box className={classes.editor}>
      <SpecSideBar />
      <Box className={classes.editorContent}>
        {' '}
        <Box className={classes.editorContentContainer}>
          <img
            src={byggernIllustration}
            alt="main illustration"
            height="385"
            width="594"
          />
          <Typography variant="bigBoldBlue">Title</Typography>
        </Box>
      </Box>
    </Box>
  );
}
