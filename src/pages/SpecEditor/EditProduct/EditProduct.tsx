import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Box } from '@mui/material';

import theme from '../../../theme';
import ProductHeader from './ProductHeader';
import ProductNeed from './ProductNeed';
import Utils from '../../../common/Utils';
import { ScrollableContainer } from '../../../components/ScrollableContainer/ScrollableContainer';
import { useAppSelector } from '../../../store/hooks';
import { useSpecificationState } from '../SpecificationContext';

const useStyles = makeStyles({
  newProduct: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.gray200.main
  }
});

export default function EditProduct(): React.ReactElement {
  const classes = useStyles();
  const { spec } = useAppSelector((state) => state.specification);
  const { specificationProductIndex } = useSpecificationState();

  const renderNeeds = () => {
    if (specificationProductIndex === -1) {
      const needs = Utils.findVariantsUsedBySpesification(spec.bank);
      return needs.map((need) => {
        return <ProductNeed key={need.id} need={need} />;
      });
    } else {
      const needs = Utils.findVariantsUsedByProduct(
        spec.products[specificationProductIndex].originProduct,
        spec.bank
      );
      return needs.map((need) => {
        return <ProductNeed key={need.id} need={need} />;
      });
    }
  };

  return (
    <Box className={classes.newProduct}>
      <ProductHeader />
      <ScrollableContainer sx={{ marginBottom: 0 }}>
        {renderNeeds()}
      </ScrollableContainer>
    </Box>
  );
}
