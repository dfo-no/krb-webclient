import React, { ReactElement } from 'react';

import css from '../Stylesheets/Editor.module.scss';
import EditProduct from './EditProduct/EditProduct';
import NewProduct from './NewProduct/NewProduct';
import NoProducts from './NoProducts/NoProducts';
import SpecSideBar from './SideBar/SpecSideBar';
import { useSpecificationState } from './SpecificationContext';

export default function SpecEditor(): React.ReactElement {
  const { specificationProductIndex, genericRequirement, create } =
    useSpecificationState();

  const renderProduct = (): ReactElement => {
    if (create) {
      return <NewProduct />;
    }
    if (specificationProductIndex !== -1 || genericRequirement) {
      return <EditProduct />;
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
