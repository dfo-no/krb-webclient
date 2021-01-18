import React, { ReactElement, useState } from 'react';
import { Button, FormControl, InputGroup, ListGroup } from 'react-bootstrap';
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
  const [selectedItem, setSelectedItem] = useState(0);

  const handleCodeSelected = (id: number) => () => {
    setSelectedItem(id);
  };

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
    setSelectedItem(0);
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
        <div className={styles.formdiv}>
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
              className={`primary ${styles.formdiv__button}`}
              onClick={addNewProduct}
            >
              Save
            </Button>
          </ListGroup.Item>
        </div>
      );
    } else {
      return <></>;
    }
  }

  const renderProducts = (productList: Product[], selectedItem: number) => {
    let productindex = productList.findIndex(
      (product) => product.id === selectedItem
    );
    const jsx = productList.map((element: Product) => {
      if (element.id === selectedItem) {
        return (
          <ListGroup.Item key={element.id}>
            <label htmlFor="title">Title</label>
            <InputGroup className="mb-3 30vw">
              <FormControl
                name="title"
                defaultValue={productList[productindex].title}
                onChange={handleTitleChange}
              />
            </InputGroup>
            <label htmlFor="description">Description</label>
            <InputGroup>
              <FormControl
                name="beskrivelse"
                defaultValue={productList[productindex].description}
                onChange={handleDescriptionChange}
              />
            </InputGroup>
            <Button
              onClick={editProductElement(element.id)}
              className={`primary ${styles.productOutput__button}`}
            >
              Save
            </Button>
          </ListGroup.Item>
        );
      } else {
        return (
          <ListGroup.Item
            key={element.id}
            onClick={handleCodeSelected(element.id)}
          >
            <h5>{element.title}</h5>
            <p>{element.description}</p>
          </ListGroup.Item>
        );
      }
    });
    return <ListGroup className={styles.productOutput}>{jsx}</ListGroup>;
  };
  return (
    <>
      <h1>Products</h1>
      <Button onClick={handleShowEditor}>New Product</Button>
      {productEditor(showEditor)}
      {renderProducts(products, selectedItem)}
    </>
  );
}
