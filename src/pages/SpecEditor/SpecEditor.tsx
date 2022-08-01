import React, { ReactElement } from 'react';

import css from '../Stylesheets/Editor.module.scss';
import EditProduct from './EditProduct/EditProduct';
import NewProduct from './NewProduct/NewProduct';
import NoProducts from './NoProducts/NoProducts';
import SpecSideBar from './SideBar/SpecSideBar';
import { useAppSelector } from '../../store/hooks';
import { useSpecificationState } from './SpecificationContext';

export default function SpecEditor(): ReactElement {
  const { spec } = useAppSelector((state) => state.specification);
  const { create } = useSpecificationState();

  const renderProduct = (): ReactElement => {
    if (create) {
      return <NewProduct />;
    }
    if (!spec.products.length) {
      return <NoProducts />;
    }
    return <EditProduct />;
  };

  return (
    <div className={css.Editor}>
      <SpecSideBar />
      <div className={css.Content} children={renderProduct()} />
    </div>
  );
}
