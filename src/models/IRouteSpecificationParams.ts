import { SPECIFICATION, PRODUCTS } from '../common/PathConstants';

export interface IRouteSpecificationParams {
  specId: string;
  productId: string;
}

export const SpecificationPath = `/${SPECIFICATION}/:specId`;
export const SpecificationProductPath = `/${SPECIFICATION}/:specId/${PRODUCTS}/:productId`;
