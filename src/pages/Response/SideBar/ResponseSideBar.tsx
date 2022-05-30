import { Box, Card, Divider, List, ListItem, Typography } from '@mui/material/';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import theme from '../../../theme';
import { ScrollableContainer } from '../../../components/ScrollableContainer/ScrollableContainer';
import { useResponseState } from '../ResponseContext';
import { ISpecificationProduct } from '../../../models/ISpecificationProduct';
import { useAppSelector } from '../../../store/hooks';

const useStyles = makeStyles({
  specSideBar: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 0',
    height: '100%',
    alignItems: 'center',
    paddingTop: 20
  },
  list: {
    display: 'flex',
    paddingLeft: 64,
    flexDirection: 'column',
    listStyle: 'none',
    alignSelf: 'center',
    width: '100%',
    flexGrow: 1,
    minHeight: 0
  },
  productListItem: {
    padding: 0,
    textDecoration: 'none'
  },
  productListItemCard: {
    minHeight: 100,
    boxShadow: 'none',
    border: `1px solid ${theme.palette.gray300.main}`,
    width: '100%',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.lightBlue.main,
      color: theme.palette.white.main
    }
  },
  selectedProduct: {
    color: theme.palette.white.main,
    backgroundColor: theme.palette.primary.main
  },
  productListItemCardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    padding: 25,
    paddingBottom: 0
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    paddingBottom: 25
  }
});

function ResponseSideBar(): React.ReactElement {
  const { t } = useTranslation();

  const classes = useStyles();
  const { response } = useAppSelector((state) => state.response);
  const { responseProductIndex, setResponseProductIndex } = useResponseState();

  const genericPressed = () => {
    setResponseProductIndex(-1);
  };

  const productPressed = (index: number) => {
    setResponseProductIndex(index);
  };

  const renderProducts = (product: ISpecificationProduct, index: number) => {
    const isSelected = index === responseProductIndex;
    return (
      <ListItem
        className={classes.productListItem}
        key={product.id}
        onClick={() => productPressed(index)}
      >
        <Card
          className={`${classes.productListItemCard} ${
            isSelected ? classes.selectedProduct : ''
          }`}
        >
          <Box className={classes.productListItemCardContent}>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="mdBold">{product.title}</Typography>
              <Typography
                variant="mdBold"
                sx={{
                  alignSelf: 'center',
                  marginLeft: 'auto',
                  paddingLeft: 4
                }}
              >
                {product.amount}
              </Typography>
            </Box>
            <Divider color={theme.palette.silver.main} />
            <Typography variant="sm">{product.description}</Typography>
          </Box>
        </Card>
      </ListItem>
    );
  };

  return (
    <Box className={classes.specSideBar}>
      <List className={classes.list} aria-label="products">
        <ListItem
          className={classes.productListItem}
          key={'generic'}
          onClick={() => genericPressed()}
        >
          <Card
            className={`${classes.productListItemCard} ${
              responseProductIndex === -1 ? classes.selectedProduct : ''
            }`}
          >
            <Box className={classes.productListItemCardContent}>
              <Typography variant="mdBold">
                {t('General requirements')}
              </Typography>
              <Divider color={theme.palette.silver.main} />
            </Box>
          </Card>
        </ListItem>
        <Divider
          color={theme.palette.gray300.main}
          sx={{ marginTop: 4, marginBottom: 4 }}
        />
        <ScrollableContainer sx={{ gap: 2 }}>
          {response.spesification.products.map((element, index) => {
            return renderProducts(element, index);
          })}
        </ScrollableContainer>
      </List>
    </Box>
  );
}

export default ResponseSideBar;
