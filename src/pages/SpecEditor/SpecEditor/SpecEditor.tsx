import makeStyles from '@mui/styles/makeStyles';
import React, { ReactElement } from 'react';
import { Box } from '@mui/material';

import EditProduct from './EditProduct/EditProduct';
import NewProduct from './NewProduct';
import NoProducts from './NoProducts';
import SpecSideBar from '../SideBar/SpecSideBar';
import theme from '../../../theme';
import { useSpecificationState } from '../SpecificationContext';

const useStyles = makeStyles({
  page: {
    display: 'flex',
    width: '100%',
    flexGrow: 1,
    minHeight: 0,
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

export default function SpecEditor(): React.ReactElement {
  const { specificationProductIndex, genericRequirement, create } =
    useSpecificationState();

  const classes = useStyles();

  const renderProduct = (): ReactElement => {
    if (create) {
      return <NewProduct />;
    }
    if (specificationProductIndex !== -1 || genericRequirement) {
      return <EditProduct />;
    }
    return <NoProducts />;
  };

  return (
    <Box className={classes.page}>
      <SpecSideBar />
      <Box className={classes.content} children={renderProduct()} />
    </Box>
  );
}
