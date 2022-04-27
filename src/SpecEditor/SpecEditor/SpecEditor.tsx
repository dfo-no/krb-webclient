import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import theme from '../../theme';
import { useSpecificationState } from '../SpecificationContext';
import SpecSideBar from '../SideBar/SpecSideBar';
import NoProducts from './NoProducts';
import NewProduct from './NewProduct';
import EditProduct from './EditProduct/EditProduct';

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

  return (
    <Box className={classes.page}>
      <SpecSideBar />
      <Box className={classes.content}>
        {create ? (
          <NewProduct />
        ) : specificationProductIndex !== -1 || genericRequirement ? (
          <EditProduct />
        ) : (
          <NoProducts />
        )}
      </Box>
    </Box>
  );
}
