import { SPECIFICATION, PRODUCTS, WORKBENCH } from '../common/PathConstants';

export interface IRouteSpecificationParams {
  specId: string;
  productId: string;
}

export const SpecificationPath = `/${SPECIFICATION}/:specId`;
export const SpecificationProductPath = `/${SPECIFICATION}/:specId/${PRODUCTS}/:productId`;


export interface IRouteWorkbenchParams {
  projectRef: string;
  productRef: string;
}

export const ProjectPath = `/${WORKBENCH}/:projectRef`;

export const ProjectProductPath = `/${WORKBENCH}/:projectRef/${PRODUCTS}/:productRef`;
