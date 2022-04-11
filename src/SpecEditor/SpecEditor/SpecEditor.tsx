import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import theme from '../../theme';
import { useSpecificationState } from '../SpecificationContext';
import SpecSideBar from '../SideBar/SpecSideBar';
import NoProducts from './NoProducts';
import NewProduct from './NewProduct';
import EditProduct from './EditProduct';

const useStyles = makeStyles({
  page: {
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.gray100.main
  },
  content: {
    flexGrow: 1,
    minWidth: 0,
    margin: 64,
    marginTop: 20,
    backgroundColor: theme.palette.gray200.main
  }
});

export default function SpecEditor(): React.ReactElement {
  const { specificationProduct, create } = useSpecificationState();

  const classes = useStyles();

  return (
    <Box className={classes.page}>
      <SpecSideBar />
      <Box className={classes.content}>
        {create ? (
          <NewProduct />
        ) : specificationProduct ? (
          <EditProduct />
        ) : (
          <NoProducts />
        )}
      </Box>
    </Box>
  );
}
