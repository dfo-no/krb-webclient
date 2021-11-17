import React from 'react';
import { useTranslation } from 'react-i18next';
import { Parentable } from '../../models/Parentable';
import { Product } from '../../models/Product';
import NestableHierarcy2 from '../../NestableHierarchy/NestableHierarcy2';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  putSelectedProjectThunk,
  updateProductList
} from '../../store/reducers/project-reducer';
import EditProductForm from './EditProductForm';
import NewProductForm from './NewProductForm';

export default function ProductPage(): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const newProductList = (items: Parentable<Product>[]) => {
    dispatch(updateProductList(items));
    dispatch(putSelectedProjectThunk('dummy'));
  };

  return (
    <div className="pb-4">
      <h3 className="mt-3">{t('Products')}</h3>

      <NewProductForm />

      <NestableHierarcy2
        dispatchfunc={(items: Parentable<Product>[]) => newProductList(items)}
        inputlist={project.products}
        component={<EditProductForm element={project.products[0]} />}
        depth={5}
      />
    </div>
  );
}
