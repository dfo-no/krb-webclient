/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

import { Specification } from '../models/Specification';
import { selectBank } from '../store/reducers/selectedBank-reducer';
import {
  setSpecification,
  setResponse
} from '../store/reducers/response-reducer';

import { Response } from '../models/Response';

export default function ResponsePage(): ReactElement {
  const dispatch = useDispatch();
  const history = useHistory();

  const uploadSpecification = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList;
    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          const typeSpecification = JSON.parse(
            evt.target.result.toString()
          ) as Specification;
          dispatch(selectBank(typeSpecification.bank.id));
          dispatch(setSpecification(typeSpecification));
          history.push(`/response/${typeSpecification.bank.id}`);
        }
      };
      reader.readAsText(file);
    }
  };

  const uploadResponse = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList;
    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          const typeResponse = JSON.parse(
            evt.target.result.toString()
          ) as Response;
          dispatch(selectBank(typeResponse.spesification.bank.id));
          dispatch(setResponse(typeResponse));
          history.push(`/response/${typeResponse.spesification.bank.id}`);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col>
          <h4>Upload Spesification to create a new response</h4>
          <InputGroup>
            <input type="file" onChange={(e) => uploadSpecification(e)} />
          </InputGroup>
        </Col>
        <Col>
          <h4>Upload an existing response to keep editing</h4>
          <InputGroup>
            <input type="file" onChange={(e) => uploadResponse(e)} />
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
}
