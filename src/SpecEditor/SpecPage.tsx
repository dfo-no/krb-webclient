import React, { ReactElement, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';

import Col from 'react-bootstrap/Col';
import { Link, useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/esm/InputGroup';

import { RootState } from '../store/store';
import { Specification } from '../models/Specification';
import { selectBank } from '../store/reducers/selectedBank-reducer';
import { setSpecification } from '../store/reducers/spesification-reducer';

export default function SpecPage(): ReactElement {
  const { id } = useSelector((state: RootState) => state.selectedBank);
  const { list } = useSelector((state: RootState) => state.bank);
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
          history.push(`/speceditor/${typeSpecification.bankId}`);
        }
      };
      reader.readAsText(file);
    }
  };

  if (!id) {
    return (
      <>
        <Form>
          <Col>
            <h4>Upload existing spesification</h4>
            <InputGroup>
              <Form.File.Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(e)
                }
                accept=".json,application/json"
              />
            </InputGroup>
          </Col>
        </Form>
        <Link to="/">
          <Button>Select Bank from Hub</Button>
        </Link>
      </>
    );
  }

  return (
    <Container fluid>
      <Row className=" align-items-center">
        <Col className="m-4 md-12">
          <Row>
            <Link to={`/speceditor/${id}`}>
              <Button type="submit" className="mt-4">
                Opprett kravspec
              </Button>
            </Link>
            <Button type="submit" className="mt-4">
              Opprette kvalifakasjon
            </Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
