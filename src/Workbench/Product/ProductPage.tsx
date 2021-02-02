import React, { ReactElement, useState } from 'react';
import {
  Button,
  Card,
  FormControl,
  InputGroup,
  ListGroup,
  Accordion
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { Product } from '../../models/Product';
import { RootState } from '../../store/rootReducer';
import {
  addProduct,
  editProduct,
  putProjectThunk
} from '../../store/reducers/project-reducer';
import styles from './ProductPage.module.scss';
import { Utils } from '../../common/Utils';
import { useParams } from 'react-router-dom';
import { Bank } from '../../models/Bank';

interface RouteParams {
  projectId: string;
}

export default function ProductPage(): ReactElement {
  const dispatch = useDispatch();
  const { id } = useSelector((state: RootState) => state.selectedProject);
  let { projectId } = useParams<RouteParams>();
  const { list } = useSelector((state: RootState) => state.project);
  const [showEditor, setShowEdior] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };

  const handleShowEditor = () => {
    setShowEdior(true);
  };

  if (!id) {
    return <p>No Project selected</p>;
  }

  const selectedProject = Utils.ensure(
    list.find((bank: Bank) => bank.id === id)
  );

  const editProductElement = (id: number) => () => {
    let product: Product = {
      title: title,
      description: description,
      id: id
    };
    const projectIdNumber = +projectId;
    dispatch(editProduct({ id: projectIdNumber, product: product }));
    dispatch(putProjectThunk(selectedProject));
  };

  const addNewProduct = () => {
    let product: Product = {
      title: title,
      description: description,
      id: Utils.getRandomNumber()
    };
    const projectIdNumber = +projectId;
    setShowEdior(false);
    dispatch(addProduct({ id: projectIdNumber, product: product }));
    dispatch(putProjectThunk(selectedProject));
  };
  function productEditor(show: boolean) {
    if (show) {
      return (
        <div className={styles.product}>
          <ListGroup.Item>
            <label htmlFor="title">Title</label>
            <InputGroup className="mb-3 30vw">
              <FormControl
                className="input-sm"
                name="title"
                onChange={handleTitleChange}
              />
            </InputGroup>
            <label htmlFor="description">Description</label>
            <InputGroup>
              <FormControl
                name="description"
                onChange={handleDescriptionChange}
              />
            </InputGroup>
            <Button
              className={`primary ${styles.product__addButton}`}
              onClick={addNewProduct}
            >
              Add
            </Button>
          </ListGroup.Item>
        </div>
      );
    } else {
      return <></>;
    }
  }

  const renderProducts = (productList: Product[]) => {
    const products = productList.map((element: Product, index) => {
      return (
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey={index.toString()}>
            <h6>{element.title}</h6>
            <p>{element.description}</p>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={index.toString()}>
            <Card.Body>
              <label htmlFor="title">Title</label>
              <InputGroup>
                <FormControl
                  name="title"
                  defaultValue={productList[index].title}
                  onChange={handleTitleChange}
                />
              </InputGroup>
              <label htmlFor="description">Description</label>
              <InputGroup>
                <FormControl
                  name="beskrivelse"
                  defaultValue={productList[index].description}
                  onChange={handleDescriptionChange}
                />
              </InputGroup>
              <Button
                onClick={editProductElement(element.id)}
                className={`primary ${styles.productList__saveButton}`}
              >
                Save
              </Button>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      );
    });
    return <Accordion className={styles.productList}>{products}</Accordion>;
  };

  return (
    <>
      <h1>Products</h1>
      <Button onClick={handleShowEditor}>New Product</Button>
      {productEditor(showEditor)}
      {renderProducts(selectedProject.products)}
    </>
  );
}
