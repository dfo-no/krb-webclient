import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useAppSelector } from '../../store/hooks';
import AnswerPreviewBox from './Components/AnswerPreviewBox';

export default function OverView(): React.ReactElement {
  const { response } = useAppSelector((state) => state.response);
  const [overviewType, setOverviewType] = useState('requirement');

  const productAnswerList = () => {
    return response.products.map((product) => {
      return <AnswerPreviewBox answerList={product.requirementAnswers} />;
    });
  };

  return (
    <Container fluid>
      <Row>
        <h3>Registered answers</h3>
      </Row>
      <Row>
        <Col sm={2}>
          <Form.Check className="p-0" formNoValidate>
            <input
              type="radio"
              name="requirement"
              id="requirement"
              className="m-3"
              checked={overviewType === 'requirement'}
              onChange={() => setOverviewType('requirement')}
            />
            <Form.Check.Label>Requirement</Form.Check.Label>
          </Form.Check>
        </Col>
        <Col sm={2}>
          <Form.Check formNoValidate>
            <input
              type="radio"
              name="product"
              id="product"
              className="m-3"
              checked={overviewType === 'product'}
              onChange={() => setOverviewType('product')}
            />
            <Form.Check.Label>Product</Form.Check.Label>
          </Form.Check>
        </Col>
      </Row>

      {overviewType === 'requirement' && (
        <AnswerPreviewBox answerList={response.requirementAnswers} />
      )}
      {overviewType === 'product' && productAnswerList()}
    </Container>
  );
}
