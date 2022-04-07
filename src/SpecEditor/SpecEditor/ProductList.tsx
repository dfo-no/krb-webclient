import { Typography, Box, List } from '@mui/material/';
import { useTranslation } from 'react-i18next';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import theme from '../../theme';
import { useAppSelector } from '../../store/hooks';
import { useGetBankQuery } from '../../store/api/bankApi';
import DFOSearchBar from '../../components/DFOSearchBar/DFOSearchBar';
import NewProductTypeListItem from './ProductListItem';
import { IProduct } from '../../Nexus/entities/IProduct';
import { IBaseModel } from '../../Nexus/entities/IBaseModel';

const useStyles = makeStyles({
  newProductTypeList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    border: `1px solid ${theme.palette.lightBlue.main}`,
    backgroundColor: theme.palette.gray200.main,
    width: '100%',
    padding: 30,
    marginTop: 16
  },
  topContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  searchContainer: {
    width: '25vw'
  },
  productsList: {
    border: `1px solid ${theme.palette.silver.main}`,
    '&:last-child': {
      borderBottom: 'none'
    },
    '& .MuiList-root': {
      paddingTop: 0,
      paddingBottom: 0
    }
  }
});

export default function ProductList(): React.ReactElement {
  const classes = useStyles();
  const { t } = useTranslation();

  const selectedBank = useAppSelector((state) => state.selectedBank);
  const { data: bankSelected } = useGetBankQuery(String(selectedBank.id));

  const products = bankSelected?.products;

  const searchFunction = (searchString: string, list: IBaseModel[]) => {
    return list;
  };
  const callback = (list: IBaseModel[]) => {};
  const list: IBaseModel[] = [];

  const renderList = (productList: IProduct[]) => {
    return (
      <List>
        {productList.map((product: IProduct, index: number) => {
          {
            return (
              <NewProductTypeListItem productListItem={product} key={index} />
            );
          }
        })}
      </List>
    );
  };

  return (
    <>
      <Typography variant="sm" color={theme.palette.primary.main}>
        Velg en produkttype fra kravsettet som passer best til ditt produkt
      </Typography>
      <Box className={classes.newProductTypeList}>
        <Box className={classes.topContainer}>
          <Box className={classes.searchContainer}>
            <DFOSearchBar
              placeholder="Søk etter produkttype"
              list={list}
              callback={callback}
              searchFunction={searchFunction}
            />
          </Box>
        </Box>
        <Box className={classes.productsList}>
          {products && renderList(products)}
        </Box>
      </Box>
    </>
  );
}
