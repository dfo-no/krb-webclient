import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Product } from '../../models/Product';
import NestableHierarcy from '../../NestableHierarchy/Nestable';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  putSelectedProjectThunk,
  updateProductList
} from '../../store/reducers/project-reducer';
import EditProductForm from './EditProductForm';
import NewProductForm from './NewProductForm';

export default function ProductPage(): ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const newProductList = (projectId: string, items: Product[]) => {
    dispatch(updateProductList(items));
    dispatch(putSelectedProjectThunk('dummy'));
  };

  return (
    <div className="pb-4">
      <>
        <h3 className="mt-3">{t('Products')}</h3>

        <NewProductForm />

        <NestableHierarcy
          dispatchfunc={(projectId: string, items: Product[]) =>
            newProductList(projectId, items)
          }
          inputlist={project.products}
          projectId={project.id}
          component={<EditProductForm element={project.products[0]} />}
          depth={5}
        />
      </>
    </div>
  );
}
