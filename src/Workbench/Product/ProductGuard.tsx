import React, { useEffect } from 'react';
import { Route, useHistory, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectProduct } from '../../store/reducers/selectedProduct-reducer';
import ProductPreview from './ProductPreview';

interface IRouteParams {
  projectId: string;
  productId: string;
}

export default function ProductGuard(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { project } = useAppSelector((state) => state.project);
  const { product } = useAppSelector((state) => state.selectedProduct);
  const { productId } = useParams<IRouteParams>();
  const history = useHistory();

  useEffect(() => {
    if (productId !== product.id) {
      const index = project.products.findIndex(
        (element) => element.id === productId
      );
      if (index !== -1) {
        dispatch(selectProduct(project.products[index]));
      } else {
        history.push(`/workbench/${project.id}/admin/product`);
      }
    }
  }, [dispatch, productId, project.products, product.id, history, project.id]);

  return (
    <Route exact path="/workbench/:projectId/admin/:productId/product">
      <ProductPreview />
    </Route>
  );
}
