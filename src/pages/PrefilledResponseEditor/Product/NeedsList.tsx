import Card from 'react-bootstrap/Card';
import React from 'react';

import AnswerForm from './AnswerForm';
import { getPaths } from '../../../common/Tree';
import { INeed } from '../../../Nexus/entities/INeed';
import { IPrefilledResponse } from '../../../Nexus/entities/IPrefilledResponse';
import { IPrefilledResponseProduct } from '../../../Nexus/entities/IPrefilledResponseProduct';
import { Levelable } from '../../../models/Levelable';

interface IProps {
  checkNeeds(
    relatedProducts: string[],
    need: Levelable<INeed>,
    productId: string
  ): [boolean, string];
  prefilledResponse: IPrefilledResponse;
  selectedProduct: IPrefilledResponseProduct;
}

export default function NeedsList({
  checkNeeds,
  prefilledResponse,
  selectedProduct
}: IProps): React.ReactElement {
  const findNeedIdsForProduct = (
    productId: string,
    needArray: INeed[]
  ): string[] => {
    const result: string[] = [];
    needArray.forEach((need) => {
      need.requirements.forEach((req) => {
        req.variants.forEach((variant) => {
          if (variant.products.includes(productId)) {
            result.push(need.id);
          } else {
            for (
              let i = 0;
              i < selectedProduct.relatedProducts.length;
              i += 1
            ) {
              if (
                variant.products.includes(selectedProduct.relatedProducts[i])
              ) {
                result.push(need.id);
              }
            }
          }
        });
      });
    });
    return result;
  };

  const needIds = findNeedIdsForProduct(
    selectedProduct.originProduct.id,
    prefilledResponse.bank.needs
  );

  const needs = getPaths(
    needIds,
    prefilledResponse.bank.needs
  ) as Levelable<INeed>[];
  return (
    <>
      {needs.map((need) => {
        const margin = need.level === 1 ? '0rem' : `${need.level - 1}rem`;
        const [used, productId] = checkNeeds(
          selectedProduct.relatedProducts,
          need,
          selectedProduct.originProduct.id
        );
        return (
          <Card style={{ marginLeft: margin }} key={need.id}>
            <Card.Header>{need.title}</Card.Header>
            {used && (
              <Card.Body>
                <AnswerForm
                  element={need}
                  product={selectedProduct}
                  searchProductId={productId}
                />
              </Card.Body>
            )}
          </Card>
        );
      })}
    </>
  );
}
