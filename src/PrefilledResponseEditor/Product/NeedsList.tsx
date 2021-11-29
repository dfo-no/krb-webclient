import React from 'react';
import Card from 'react-bootstrap/Card';
import { getPaths } from '../../common/Tree';
import { IPrefilledResponse } from '../../models/IPrefilledResponse';
import { IPrefilledResponseProduct } from '../../models/IPrefilledResponseProduct';
import { Levelable } from '../../models/Levelable';
import { INeed } from '../../Nexus/entities/INeed';
import AnswerForm from './AnswerForm';

export default function NeedsList({
  prefilledResponse,
  selectedProduct,
  checkNeeds
}: {
  prefilledResponse: IPrefilledResponse;
  selectedProduct: IPrefilledResponseProduct;
  checkNeeds(
    relatedProducts: string[],
    need: Levelable<INeed>,
    productId: string
  ): [boolean, string];
}): React.ReactElement {
  const findNeedIdsForProduct = (productId: string, needArray: INeed[]) => {
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
