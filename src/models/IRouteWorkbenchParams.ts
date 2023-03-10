import { PRODUCTS, WORKBENCH } from '../common/PathConstants';

export interface IRouteWorkbenchParams {
  projectRef: string;
  productRef: string;
}

export const ProjectPath = `/${WORKBENCH}/:projectRef`;

export const ProjectProductPath = `/${WORKBENCH}/:projectRef/${PRODUCTS}/:productRef`;
