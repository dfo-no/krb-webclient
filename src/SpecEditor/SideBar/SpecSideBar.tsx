import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import theme from '../../theme';
import { ScrollableContainer } from '../../Workbench/Components/ScrollableContainer';
import { useSpecificationState } from '../SpecificationContext';
import { ISpecificationProduct } from '../../models/ISpecificationProduct';
import { useAppSelector } from '../../store/hooks';

const useStyles = makeStyles({
  specSideBar: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
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
    paddingBottom: 5
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%'
  }
});

function SpecSideBar(): React.ReactElement {
  const { t } = useTranslation();

  const classes = useStyles();
  const { spec } = useAppSelector((state) => state.specification);
  const {
    specificationProductIndex,
    setSpecificationProductIndex,
    genericRequirement,
    setGenericRequirement,
    setCreate
  } = useSpecificationState();

  const genericPressed = () => {
    setSpecificationProductIndex(-1);
    setGenericRequirement(true);
  };

  const productPressed = (index: number) => {
    setSpecificationProductIndex(index);
    setGenericRequirement(false);
  };

  const renderProducts = (product: ISpecificationProduct, index: number) => {
    const isSelected = index === specificationProductIndex;
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
            <Typography variant="mdBold">{product.title}</Typography>
            <Divider
              color={
                isSelected
                  ? theme.palette.white.main
                  : theme.palette.gray300.main
              }
            />
            <Typography variant="sm">{product.description}</Typography>
          </Box>
        </Card>
      </ListItem>
    );
  };

  return (
    <Box className={classes.specSideBar}>
      <Box className={classes.buttonContainer}>
        <Button variant="primary" onClick={() => setCreate(true)}>
          {t('create a new product')}
        </Button>
      </Box>
      <List className={classes.list} aria-label="products">
        <ListItem
          className={classes.productListItem}
          key={'generic'}
          onClick={() => genericPressed()}
        >
          <Card
            className={`${classes.productListItemCard} ${
              genericRequirement ? classes.selectedProduct : ''
            }`}
          >
            <Box className={classes.productListItemCardContent}>
              <Typography variant="mdBold">
                {t('Generic requirement')}
              </Typography>
              <Divider
                color={
                  genericRequirement
                    ? theme.palette.white.main
                    : theme.palette.gray300.main
                }
              />
            </Box>
          </Card>
        </ListItem>
        <Divider
          color={theme.palette.gray300.main}
          sx={{ marginTop: 4, marginBottom: 4 }}
        />
        <ScrollableContainer sx={{ gap: 2 }}>
          {spec.products.map((element, index) => {
            return renderProducts(element, index);
          })}
        </ScrollableContainer>
      </List>
    </Box>
  );
}

export default SpecSideBar;
