import React, { ReactElement } from 'react';

import css from '../Stylesheets/Editor.module.scss';
import EditProduct from './EditProduct/EditProduct';
import LoaderSpinner from '../../common/LoaderSpinner';
import NewProduct from './NewProduct/NewProduct';
import NoProducts from './NoProducts/NoProducts';
import SpecSideBar from './SideBar/SpecSideBar';
import { SelectProvider } from '../Workbench/Create/SelectContext';
import { useProductIndexState } from '../../components/ProductIndexContext/ProductIndexContext';
import { useSpecificationState } from './SpecificationContext';

export default function SpecEditor(): ReactElement {
  const { specification } = useSpecificationState();
  const { create, productIndex } = useProductIndexState();

  const renderProduct = (): ReactElement => {
    if (create) {
      return <NewProduct />;
    }
    if (productIndex >= specification.products.length) {
      return <LoaderSpinner />;
    }
    if (productIndex >= -1) {
      return (
        <SelectProvider>
          <EditProduct />
        </SelectProvider>
      );
    }
    return <NoProducts />;
  };

  return (
    <div className={css.Editor}>
      <SpecSideBar />
      <div className={css.Content} children={renderProduct()} />
    </div>
  );
}
