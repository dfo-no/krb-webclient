/* eslint-disable jsx-a11y/label-has-associated-control */
import { AxiosResponse } from 'axios';
import React, { ReactElement } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useHistory } from 'react-router';
import { httpPost } from '../api/http';
import { useAppDispatch } from '../store/hooks';
import {
  setResponse,
  setSpecification
} from '../store/reducers/response-reducer';
import { selectBank } from '../store/reducers/selectedBank-reducer';

export default function ResponsePage(): ReactElement {
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
      dispatch(selectBank(response.data.bank.id));
      dispatch(setSpecification(response.data));
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
    }).then((response) => {
      dispatch(selectBank(response.data.spesification.bank.id));
      dispatch(setResponse(response.data));
      history.push(`/response/${response.data.spesification.bank.id}`);
      return response;
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
