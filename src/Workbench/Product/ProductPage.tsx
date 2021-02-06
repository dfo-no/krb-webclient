/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useContext, useState } from 'react';
import {
  Button,
  Card,
  FormControl,
  InputGroup,
  Accordion,
  Form,
  Col,
  Row
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from 'react-hook-form';
import { Product } from '../../models/Product';
import { RootState } from '../../store/store';
import {
  addProduct,
  editProduct,
  putProjectThunk
} from '../../store/reducers/project-reducer';
import styles from './ProductPage.module.scss';
import Utils from '../../common/Utils';
import { Bank } from '../../models/Bank';
import { AccordionContext } from '../Need/AccordionContext';

type FormValues = {
  title: string;
  description: string;
};

export default function ProductPage(): ReactElement {
  const dispatch = useDispatch();
  const { onOpenClose } = useContext(AccordionContext);
  const { id } = useSelector((state: RootState) => state.selectedProject);
  const { list } = useSelector((state: RootState) => state.project);
  const [showEditor, setShowEdior] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { register, handleSubmit, errors } = useForm<Product>();
  const [validated] = useState(false);

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

  const editProductElement = (productId: number) => () => {
    dispatch(
      editProduct({
        projectId: id,
        productId, // TODO: get from post
        title, // TODO: get from post
        description // TODO: get from post
      })
    );
    dispatch(putProjectThunk(id));
    onOpenClose('');
  };

  const addNewProduct = (post: FormValues) => {
    const product: Product = {
      id: Utils.getRandomNumber(),
      title: post.title,
      description: post.description
    };
    dispatch(addProduct({ id, product }));
    dispatch(putProjectThunk(id));
  };

  function productEditor(show: boolean) {
    if (show) {
      return (
        <Card className="mt-3">
          <Card.Body>
            <Form
              onSubmit={handleSubmit(addNewProduct)}
              autoComplete="off"
              noValidate
              validated={validated}
            >
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  Title
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    name="title"
                    ref={register({
                      required: { value: true, message: 'Required' },
                      minLength: { value: 2, message: 'Minimum 2 characters' }
                    })}
                    isInvalid={!!errors.title}
                  />
                  {errors.title && (
                    <Form.Control.Feedback type="invalid">
                      {errors.title.message}
                    </Form.Control.Feedback>
                  )}
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  Description
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    name="description"
                    ref={register({
                      required: { value: true, message: 'Required' },
                      minLength: { value: 2, message: 'Minimum 2 characters' }
                    })}
                    isInvalid={!!errors.description}
                  />
                  {errors.description && (
                    <Form.Control.Feedback type="invalid">
                      {errors.description.message}
                    </Form.Control.Feedback>
                  )}
                </Col>
              </Form.Group>
              <Button className="mt-2" type="submit">
                Save
              </Button>
            </Form>
          </Card.Body>
        </Card>
      );
    }
    return <></>;
  }

  const renderProducts = (productList: Product[]) => {
    const products = productList.map((element: Product, index) => {
      return (
        <Card key={element.id}>
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
