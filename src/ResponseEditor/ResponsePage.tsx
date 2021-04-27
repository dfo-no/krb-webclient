/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

import { Specification } from '../models/Specification';
import { selectBank } from '../store/reducers/selectedBank-reducer';
import { setSpecification } from '../store/reducers/response-reducer';

export default function ResponsePage(): ReactElement {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList;
    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          const typeSpecification = JSON.parse(
            evt.target.result.toString()
          ) as Specification;
          dispatch(selectBank(typeSpecification.bankId));
          dispatch(setSpecification(typeSpecification));
          history.push(`/response/${typeSpecification.bankId}`);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Container fluid>
      <Col>
        <h4>Upload Spesification to create a response</h4>
        <InputGroup>
          <input type="file" onChange={(e) => handleChange(e)} />
        </InputGroup>
      </Col>
    </Container>
  );
}
