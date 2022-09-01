import React, { ReactElement } from 'react';

import AnswerProduct from './Answer/AnswerProduct';
import css from '../Stylesheets/Editor.module.scss';
import ResponseStart from './ResponseStart/ResponseStart';
import ResponseSideBar from './SideBar/ResponseSideBar';
import { useProductIndexState } from '../../components/ProductIndexContext/ProductIndexContext';

export default function ResponseEditor(): React.ReactElement {
  const { productIndex } = useProductIndexState();

  const renderProduct = (): ReactElement => {
    if (productIndex >= -1) {
      return <AnswerProduct />;
    }
    return <ResponseStart />;
  };

  return (
    <div className={css.Editor}>
      <ResponseSideBar />
      <div className={css.Content} children={renderProduct()} />
    </div>
  );
}
