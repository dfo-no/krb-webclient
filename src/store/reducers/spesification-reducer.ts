/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Utils from '../../common/Utils';
import { SpecificationProduct } from '../../models/SpecificationProduct';

interface SpecificationState {
  products: SpecificationProduct[];
}

const initialState: SpecificationState = {
  products: []
};

const specificationSlice = createSlice({
  name: 'specification',
  initialState,
  reducers: {
    addProduct(
      state,
      { payload }: PayloadAction<{ product: SpecificationProduct }>
    ) {
      state.products.push(payload.product);
    },
    editSpecProduct(
      state,
      { payload }: PayloadAction<{ product: SpecificationProduct }>
    ) {
      const index = Utils.ensure(
        state.products.findIndex((product) => product.id === payload.product.id)
      );
      state.products[index] = payload.product;
    }
  }
});

export const { addProduct, editSpecProduct } = specificationSlice.actions;

export default specificationSlice.reducer;
