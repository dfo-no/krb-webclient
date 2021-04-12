/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Utils from '../../common/Utils';
<<<<<<< HEAD
import { Requirement } from '../../models/Requirement';
import { SpecificationProduct } from '../../models/SpecificationProduct';
import { RequirementAnswer } from '../../models/RequirementAnswer';

interface SpecificationState {
  products: SpecificationProduct[];
  requirements: Requirement[];
  requirementAnswers: RequirementAnswer[];
}

const initialState: SpecificationState = {
  products: [],
  requirements: [],
  requirementAnswers: []
=======
import { SpecificationProduct } from '../../models/SpecificationProduct';

interface SpecificationState {
  products: SpecificationProduct[];
}

const initialState: SpecificationState = {
  products: []
>>>>>>> b382928ba10a1e7910f384e1eed0324bd5eb5550
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
<<<<<<< HEAD
    },
    addAnswer(
      state,
      { payload }: PayloadAction<{ answer: RequirementAnswer }>
    ) {
      state.requirementAnswers.push(payload.answer);
=======
>>>>>>> b382928ba10a1e7910f384e1eed0324bd5eb5550
    }
  }
});

<<<<<<< HEAD
export const {
  addProduct,
  editSpecProduct,
  addAnswer
} = specificationSlice.actions;
=======
export const { addProduct, editSpecProduct } = specificationSlice.actions;
>>>>>>> b382928ba10a1e7910f384e1eed0324bd5eb5550

export default specificationSlice.reducer;
