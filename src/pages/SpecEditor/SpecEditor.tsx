import React, { ReactElement, useEffect } from 'react';

import css from '../Stylesheets/Editor.module.scss';
import EditProduct from './EditProduct/EditProduct';
import NewProduct from './NewProduct/NewProduct';
import NoProducts from './NoProducts/NoProducts';
import SpecSideBar from './SideBar/SpecSideBar';
import { useAppSelector } from '../../store/hooks';
import { useSpecificationState } from './SpecificationContext';

export default function SpecEditor(): ReactElement {
  const { spec } = useAppSelector((state) => state.specification);
  const {
    create,
    genericRequirement,
    setGenericRequirement,
    specificationProductIndex
  } = useSpecificationState();

  useEffect(() => {
    if (
      !genericRequirement &&
      specificationProductIndex === -1 &&
      spec.products.length
    ) {
      setGenericRequirement(true);
    }
  }, [
    genericRequirement,
    setGenericRequirement,
    spec,
    specificationProductIndex
  ]);

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
