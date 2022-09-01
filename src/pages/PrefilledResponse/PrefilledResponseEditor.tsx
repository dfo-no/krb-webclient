import React, { ReactElement } from 'react';

import css from '../Stylesheets/Editor.module.scss';
import PrefilledResponseSidebar from './SideBar/PrefilledResponseSidebar';
import AnswerProduct from './Answer/AnswerProduct';
import NewProduct from './NewProduct/NewProduct';
import NoProducts from './NoProducts/NoProducts';
import { useProductIndexState } from '../../components/ProductIndexContext/ProductIndexContext';

export default function PrefilledResponseEditor(): React.ReactElement {
  const { create, productIndex } = useProductIndexState();

  const renderProduct = (): ReactElement => {
    if (create) {
      return <NewProduct />;
    }
    if (productIndex >= -1) {
      return <AnswerProduct />;
    }
    return <NoProducts />;
  };

  return (
    <div className={css.Editor}>
      <PrefilledResponseSidebar />
      <div className={css.Content} children={renderProduct()} />
    </div>
  );
}
