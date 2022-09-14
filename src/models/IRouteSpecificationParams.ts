export interface IRouteSpecificationParams {
  specId: string;
  productId?: string;
}

export const SpecificationPath = '/specification/:specId';
export const SpecificationProductPath =
  '/specification/:specId/products/:productId?';
