import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import AnswerProduct from './Answer/AnswerProduct';
import css from '../Stylesheets/EditorFullPage.module.scss';
import ResponseOverview from './Overview/ResponseOverview';
import { RESPONSE, PRODUCTS } from '../../common/PathConstants';
import { useAppSelector } from '../../store/hooks';
import { ISpecificationProduct } from '../../Nexus/entities/ISpecificationProduct';
import { IResponseProduct } from '../../Nexus/entities/IResponseProduct';
import Utils from '../../common/Utils';

export const NOT_SET: unique symbol = Symbol('not set');
export const GENERAL: unique symbol = Symbol('general');
export type CombinedProduct = {
  responseProduct: IResponseProduct;
  specificationProduct: ISpecificationProduct;
};
export type CombinedProductOrGeneral = CombinedProduct | typeof GENERAL;

export default function ResponseModule(): React.ReactElement {
  const { response } = useAppSelector((state) => state.response);

  const [combinedProduct, setCombinedProduct] = useState<
    CombinedProductOrGeneral | typeof NOT_SET | typeof GENERAL
  >(NOT_SET);

  const setProduct = (
    specificationProduct: ISpecificationProduct | typeof GENERAL
  ) => {
    if (specificationProduct === GENERAL) {
      setCombinedProduct(specificationProduct);
      return;
    }

    const maybeResponseProduct = response.products.find(
      (aResponseProduct) =>
        aResponseProduct.originProduct.id === specificationProduct.id
    );

    const responseProduct = Utils.ensure(maybeResponseProduct);
    setCombinedProduct({
      responseProduct,
      specificationProduct,
    });
  };

  useEffect(() => {
    if (combinedProduct === NOT_SET || combinedProduct === GENERAL) return;
    setProduct(
      Utils.ensure(
        response.specification.products.find((product) => {
          return product.id === combinedProduct.specificationProduct.id;
        })
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return (
    <div className={css.EditorFullPage}>
      <div className={css.Content}>
        <Switch>
          <Route exact path={`/${RESPONSE}/${response.specification.bank.id}`}>
            <ResponseOverview setProduct={setProduct} />
          </Route>
          <Route
            path={`/${RESPONSE}/${response.specification.bank.id}/${PRODUCTS}/`}
          >
            {combinedProduct !== NOT_SET && (
              <AnswerProduct product={combinedProduct} />
            )}
          </Route>
        </Switch>
      </div>
    </div>
  );
}
