import React, { ReactElement, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';

import { useRouteMatch } from 'react-router';
import { Product } from '../../models/Product';
import { RootState } from '../../store/store';
import {
  getProjectsThunk,
  putProjectThunk,
  updateProductList
} from '../../store/reducers/project-reducer';
import Utils from '../../common/Utils';
import NestableHierarcy from '../../NestableHierarchy/Nestable';
import ProductForm from './EditProductForm';
import NewProductForm from './NewProductForm';
import SuccessAlert from '../SuccessAlert';
import { selectProject } from '../../store/reducers/selectedProject-reducer';

interface RouteParams {
  projectId?: string;
}
export default function ProductPage(): ReactElement {
  const projectMatch = useRouteMatch<RouteParams>(
    '/workbench/:projectId/product'
  );
  const dispatch = useDispatch();
  const { id } = useSelector((state: RootState) => state.selectedProject);
  const { list } = useSelector((state: RootState) => state.project);
  const [toggleEditor, setToggleEditor] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    async function fetchEverything() {
      setTimeout(async () => {
        await dispatch(getProjectsThunk());
      }, 10);
    }
    if (!list) {
      fetchEverything();
    }
  }, [dispatch, list]);

  if (projectMatch?.params.projectId) {
    dispatch(selectProject(projectMatch?.params.projectId));
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [showAlert]);

  if (list.length === 0 || !id) {
    return <p>Loading product page ...</p>;
  }

  const selectedProject = Utils.ensure(
    list.find((element) => element.id === id)
  );

  function productEditor(show: boolean) {
    if (show) {
      return (
        <NewProductForm
          toggleAlert={setShowAlert}
          toggleShow={setToggleEditor}
        />
      );
    }
    return null;
  }
  const newProductList = (projectId: string, items: Product[]) => {
    dispatch(updateProductList({ id: projectId, products: items }));
    dispatch(putProjectThunk(projectId));
  };
  return (
    <div className="pb-4">
      <>
        <h3 className="mt-3">Products</h3>
        <Button
          onClick={() => {
            setToggleEditor(true);
          }}
          className="mb-4"
        >
          New Product
        </Button>
        {showAlert && <SuccessAlert toggleShow={setShowAlert} type="product" />}
        {productEditor(toggleEditor)}
        <NestableHierarcy
          dispatchfunc={(projectId: string, items: Product[]) =>
            newProductList(projectId, items)
          }
          inputlist={selectedProject.products}
          projectId={id}
          component={<ProductForm element={selectedProject.products[0]} />}
          depth={5}
        />
      </>
    </div>
  );
}
