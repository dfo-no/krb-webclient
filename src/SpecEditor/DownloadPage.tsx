import React, { ReactElement, useState } from 'react';
import fileDownload from 'js-file-download';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';

import Col from 'react-bootstrap/Col';
import { RootState } from '../store/store';

export default function SpecPage(): ReactElement {
  const { spec } = useSelector((state: RootState) => state.specification);

  const onDownLoad = () => {
    fileDownload(JSON.stringify(spec), `${spec.title}-specfication.json`);
  };

  return (
    <Container fluid>
      <Row className=" align-items-center">
        <Col className="m-4 md-12">
          <Row>
            <Button type="submit" className="mt-4" onClick={onDownLoad}>
              Download Specification
            </Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
