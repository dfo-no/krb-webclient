import { Box, Typography } from '@mui/material';
import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import DFOSearchBar from '../../components/DFOSearchBar/DFOSearchBar';
import theme from '../../theme';

const useStyles = makeStyles({
  productTypeList: {
    height: 500,
    padding: 25,
    backgroundColor: theme.palette.gray100.main,
    marginTop: 20,
    border: `1px solid ${theme.palette.dfoLightBlue.main}`
  },
  productTypeSearchBar: {
    width: '50%'
  }
});

export default function NewProductTypeForm(): React.ReactElement {
  const classes = useStyles();

  const searchFieldCallback = (result: any) => {};
  const searchFunction = (searchString: string, list: any) => {};
  const list: any = [];

  return (
    <Box>
      <Typography>
        Velg en produkttype fra kravsettet IT-konsulenter som passer best til
        ditt produkt
      </Typography>
      <Box className={classes.productTypeList}>
        <Box className={classes.productTypeSearchBar}>
          <DFOSearchBar
            list={list}
            searchFunction={searchFunction}
            callback={searchFieldCallback}
            placeholder="Søk etter produkttype"
          />
        </Box>
      </Box>
    </Box>
  );
}
