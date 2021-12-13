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
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'config.scoreValues'
  });

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
        <Col sm={10}>
          {fields.map((item, index) => {
            return (
              <Row key={item.id}>
                <Col sm={4}>
                  <Form.Control
                    as="input"
                    {...register(`config.scoreValues.${index}.value` as const)}
                    type="number"
                    key={item.id}
                  />
                </Col>

                <Col sm={4}>
                  <Form.Control
                    as="input"
                    {...register(`config.scoreValues.${index}.score` as const)}
                    type="number"
                  />
                </Col>
                <Col sm={1}>
                  <Button onClick={() => remove(index)}>Fjern</Button>
                </Col>
              </Row>
            );
          })}
        </Col>
        <Col sm={2}>
          <Button onClick={() => append({ score: 0, value: 0 })}>
            Ny poengrad
          </Button>
        </Col>
      </Row>
    </div>
  );
}
