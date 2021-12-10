import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Control, useFieldArray, UseFormRegister } from 'react-hook-form';
import { ISliderQuestion } from '../../Nexus/entities/ISliderQuestion';

type IProps = {
  control: Control<ISliderQuestion>;
  register: UseFormRegister<ISliderQuestion>;
};

export default function SliderPointArray({
  control,
  register
}: IProps): React.ReactElement {
  const {
    fields: valueFields,
    append: valueNumberAppend,
    remove: valueNumberRemove
  } = useFieldArray({
    control,
    name: 'config.valueNumbers'
  });
  const {
    fields: scoresFields,
    append: scoresAppend,
    remove: scoresRemove
  } = useFieldArray({
    control,
    name: 'config.scores'
  });

  const addValueScorePair = () => {
    const number = 0;
    const score = 0;
    valueNumberAppend(number);
    scoresAppend(score);
  };
  const removeItems = (index: number) => {
    scoresRemove(index);
    valueNumberRemove(index);
  };
  return (
    <div className="mt-3">
      <Row>
        <Col>
          <h6>Poenggivning:</h6>
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          <h6>Avgitt svar:</h6>
        </Col>
        <Col sm={4}>
          <h6>Antall poeng:</h6>
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          {valueFields.map((item, index) => {
            return (
              <Form.Control
                as="input"
                {...register(`config.valueNumbers.${index}` as const)}
                // isInvalid={hasError(`config.valueNumbers.${index}` as const)}
                type="number"
                key={item.id}
              />
            );
          })}
        </Col>
        <Col sm={6}>
          {scoresFields.map((item, index) => {
            return (
              <Row key={item.id}>
                <Col sm={6}>
                  <Form.Control
                    as="input"
                    {...register(`config.scores.${index}` as const)}
                    // isInvalid={hasError(`config.scores.${index}` as const)}
                    type="number"
                  />
                </Col>
                <Col sm={1}>
                  <Button onClick={() => removeItems(index)}>Fjern</Button>
                </Col>
              </Row>
            );
          })}
        </Col>
        <Col sm={2}>
          <Button onClick={() => addValueScorePair()}>Ny poengrad</Button>
        </Col>
      </Row>
    </div>
  );
}
