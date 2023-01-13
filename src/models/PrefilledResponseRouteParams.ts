import { PREFILLED_RESPONSE, PRODUCTS } from '../common/PathConstants';

export interface PrefilledResponseRouteParams {
  prefilledResponseId: string;
  productId: string;
}

export const PrefilledResponsePath = `/${PREFILLED_RESPONSE}/:prefilledResponseId`;
export const SpecificationProductPath = `/${PREFILLED_RESPONSE}/:prefilledResponseId/${PRODUCTS}/:productId`;
