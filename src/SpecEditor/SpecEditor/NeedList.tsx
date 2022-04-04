import { Typography, Box, List } from '@mui/material/';
import { useTranslation } from 'react-i18next';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import theme from '../../theme';
import { useAppSelector } from '../../store/hooks';
import { useGetBankQuery } from '../../store/api/bankApi';
import { IProduct } from '../../Nexus/entities/IProduct';
import NeedListItem from './NeedListItem';

const useStyles = makeStyles({
  newProductNeedList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    border: `1px solid ${theme.palette.dfoLightBlue.main}`,
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
  needsList: {
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

export default function NeedList(): React.ReactElement {
  const classes = useStyles();
  const { t } = useTranslation();

  const selectedBank = useAppSelector((state) => state.selectedBank);
  const { data: bankSelected } = useGetBankQuery(String(selectedBank.id));

  const products = bankSelected?.products;

  const renderList = (productList: IProduct[]) => {
    return (
      <List>
        {productList.map((product: IProduct, index: number) => {
          return <NeedListItem productListItem={product} key={index} />;
        })}
      </List>
    );
  };

  return (
    <>
      <Typography
        variant="sm"
        sx={{
          color: theme.palette.primary.main,
          fontSize: 16
        }}
      >
        {t('needs you find under')}
      </Typography>
      <Box className={classes.newProductNeedList}>
        <Box className={classes.needsList}>
          {products && renderList(products)}
        </Box>
      </Box>
    </>
  );
}
