/* eslint-disable jsx-a11y/label-has-associated-control */
import { AxiosResponse } from 'axios';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useHistory } from 'react-router';
import { httpPost } from '../../api/http';
import { useAppDispatch } from '../../store/hooks';
import {
  addProduct,
  setResponse,
  setResponseSpecification
} from '../../store/reducers/response-reducer';
import { selectBank } from '../../store/reducers/selectedBank-reducer';
import { ISpecificationProduct } from '../../models/ISpecificationProduct';
import { ISpecification } from '../../Nexus/entities/ISpecification';

export default function ResponsePage(): React.ReactElement {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const onUploadSpecification = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const formData = new FormData();
    const files = event.target.files as FileList;
    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];
      formData.append('file', file);
    }
    httpPost<FormData, AxiosResponse>('/java/uploadPdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'json'
    }).then((response) => {
      const specification: ISpecification = response.data;
      dispatch(selectBank(specification.bank.id));
      dispatch(setResponseSpecification(specification));
      specification.products.forEach((product: ISpecificationProduct) => {
        dispatch(
          addProduct({
            id: product.id,
            title: product.title,
            description: product.description,
            originProduct: product,
            price: 0,
            requirementAnswers: []
          })
        );
      });
      history.push(`/response/${response.data.bank.id}`);
      return response;
    });
  };

  const onUploadResponse = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    const files = event.target.files as FileList;
    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];
      formData.append('file', file);
    }
    httpPost<FormData, AxiosResponse>('/java/uploadPdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'json'
    })
      .then((response) => {
        dispatch(selectBank(response.data.specification.bank.id));
        dispatch(setResponse(response.data));
        history.push(`/response/${response.data.specification.bank.id}`);
        return response;
      })
      .catch((error) => {
        return error;
      });
  };

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col>
          <h4>Upload Spesification to create a new response</h4>
          <InputGroup>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => onUploadSpecification(e)}
            />
          </InputGroup>
        </Col>
        <Col>
          <h4>Upload an existing response to keep editing</h4>
          <InputGroup>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => onUploadResponse(e)}
            />
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
}
