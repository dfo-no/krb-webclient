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
import { RootState } from '../../store/configureStore';
import { addProduct, editProduct } from '../../store/reducers/kravbank-reducer';
import styles from './ProductPage.module.scss';

export default function ProductPage(): ReactElement {
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.kravbank);
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

  const editProductElement = (id: number) => () => {
    let product = {
      title: title,
      description: description,
      id: id
    };
    dispatch(editProduct(product));
  };

  const addNewProduct = () => {
    let product = {
      title: title,
      description: description,
      id: Math.random()
    };
    setShowEdior(false);
    dispatch(addProduct(product));
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
    const jsx = productList.map((element: Product, index) => {
      return (
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey={index.toString()}>
            <b>{element.title}</b>
            <br></br>
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
    return <Accordion className={styles.productList}>{jsx}</Accordion>;
  };

  return (
    <>
      <h1>Products</h1>
      <Button onClick={handleShowEditor}>New Product</Button>
      {productEditor(showEditor)}
      {renderProducts(products)}
    </>
  );
}
