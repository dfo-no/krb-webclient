import React, { ReactElement } from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';

import Col from 'react-bootstrap/Col';
import { Link, useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { RootState } from '../store/store';
import { Specification } from '../models/Specification';
import { selectBank } from '../store/reducers/selectedBank-reducer';
import { setSpecification } from '../store/reducers/spesification-reducer';

export default function SpecPage(): ReactElement {
  const { id } = useSelector((state: RootState) => state.selectedBank);
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
          dispatch(selectBank(typeSpecification.bank.id));
          dispatch(setSpecification(typeSpecification));
          history.push(`/speceditor/${typeSpecification.bank.id}`);
        }
      };
      reader.readAsText(file);
    }
  };

  if (!id) {
    return (
      <Row className="mt-4">
        <Col sm={6}>
          <Form>
            <h4>Upload spesification</h4>
            <InputGroup>
              <Form.File.Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(e)
                }
                accept=".json,application/json"
              />
            </InputGroup>
          </Form>
        </Col>

        <Col sm={6}>
          <h4>Select Bank from Hub</h4>
          <Link to="/">
            <Button>Go to Hub</Button>
          </Link>
        </Col>
      </Row>
    );
  }

  return (
    <Row className="mt-4">
      <Col sm={4}>
        <Link to={`/speceditor/${id}`}>
          <Button type="submit" className="mt-4">
            Create Spesification
          </Button>
        </Link>
      </Col>

      <Col sm={4}>
        <Button type="submit" className="mt-4">
          Create Qualification
        </Button>
      </Col>
    </Row>
  );
}
