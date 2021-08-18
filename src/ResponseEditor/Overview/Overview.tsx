import React, { ReactElement, useState } from 'react';
import Container from 'react-bootstrap/Container';
import ToggleButton from 'react-bootstrap/esm/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/esm/ToggleButtonGroup';
import Row from 'react-bootstrap/Row';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import AnswerPreviewBox from './Components/AnswerPreviewBox';

export default function OverView(): ReactElement {
  const { response } = useSelector((state: RootState) => state.response);
  const [overviewType, setOverviewType] = useState('requirement');

  const handleViewType = (newOverviewType: string) => {
    setOverviewType(newOverviewType);
  };

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
        <ToggleButtonGroup
          type="radio"
          name="toogleButton"
          value={overviewType}
          onChange={handleViewType}
        >
          <ToggleButton
            value="requirement"
            aria-label="left aligned"
            type="radio"
          >
            Requirement
          </ToggleButton>
          <ToggleButton value="product" aria-label="centered" type="radio">
            Product
          </ToggleButton>
        </ToggleButtonGroup>
      </Row>

      {overviewType === 'requirement' && (
        <AnswerPreviewBox answerList={response.requirementAnswers} />
      )}
      {overviewType === 'product' && productAnswerList()}
    </Container>
  );
}
