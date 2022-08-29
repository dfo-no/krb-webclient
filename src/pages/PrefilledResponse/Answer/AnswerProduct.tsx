import React, { ReactElement } from 'react';

import ProductHeader from './ProductHeader';
import ProductNeed from './ProductNeed';
import Utils from '../../../common/Utils';
import { AccordionProvider } from '../../../components/DFOAccordion/AccordionContext';
import { useAppSelector } from '../../../store/hooks';
import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';

export default function AnswerProduct(): React.ReactElement {
  const { prefilledResponse } = useAppSelector(
    (state) => state.prefilledResponse
  );
  const { productIndex } = useProductIndexState();

  const renderNeeds = (): ReactElement[] => {
    if (productIndex === -1) {
      return Utils.findVariantsUsedBySpecification(prefilledResponse.bank).map(
        (need) => {
          return <ProductNeed key={need.id} need={need} />;
        }
      );
    } else {
      return Utils.findVariantsUsedByProduct(
        prefilledResponse.products[productIndex].originProduct,
        prefilledResponse.bank,
        prefilledResponse.products[productIndex].relatedProducts
      ).map((need) => {
        return <ProductNeed key={need.id} need={need} />;
      });
    }
  };

  return (
    <div>
      <ProductHeader />
      <AccordionProvider>{renderNeeds()}</AccordionProvider>
    </div>
  );
}
