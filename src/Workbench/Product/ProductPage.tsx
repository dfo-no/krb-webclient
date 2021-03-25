import React, { ReactElement, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';

import { Product } from '../../models/Product';
import { RootState } from '../../store/store';
import {
  putProjectThunk,
  updateProductList
} from '../../store/reducers/project-reducer';
import Utils from '../../common/Utils';
import { Bank } from '../../models/Bank';
import NestableHierarcy from '../../NestableHierarchy/Nestable';
import ProductForm from './EditProductForm';
import NewProductForm from './NewProductForm';
import SuccessAlert from '../SuccessAlert';

export default function ProductPage(): ReactElement {
  const dispatch = useDispatch();
  const { id } = useSelector((state: RootState) => state.selectedProject);
  const { list } = useSelector((state: RootState) => state.project);
  const [toggleEditor, setToggleEditor] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [showAlert]);

  if (!id) {
    return <p>No Project selected</p>;
  }

  const selectedProject = Utils.ensure(
    list.find((bank: Bank) => bank.id === id)
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
    </div>
  );
}
