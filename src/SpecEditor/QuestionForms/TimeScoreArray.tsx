import Button from '@mui/material/Button';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Control, useFieldArray, UseFormRegister } from 'react-hook-form';
import TimeCtrl from '../../FormProvider/TimeCtrl';
import { ITimeQuestion } from '../../Nexus/entities/ITimeQuestion';

type IProps = {
  control: Control<ITimeQuestion>;
  register: UseFormRegister<ITimeQuestion>;
};

export default function TimeScoreArray({
  control,
  register
}: IProps): React.ReactElement {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'config.timeScores'
  });

  return (
    <div className="mt-3">
      <Row>
        <Col>
          <h6>
            Avvikende poenggivninger for starttid: (maks score (100) gis for
            alle tider utover spesifiserte innenfor oppgitte datobegrensninger)
          </h6>
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          <h6>Valgt dato:</h6>
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
                  <TimeCtrl name={`config.timeScores.${index}.time` as const} />
                </Col>

                <Col sm={4}>
                  <Form.Control
                    as="input"
                    {...register(`config.timeScores.${index}.score` as const)}
                    type="number"
                  />
                </Col>
                <Col sm={1}>
                  <Button variant="primary" onClick={() => remove(index)}>
                    Fjern
                  </Button>
                </Col>
              </Row>
            );
          })}
        </Col>
        <Col sm={2}>
          <Button onClick={() => append({ score: 100, time: null })}>
            Ny poengrad
          </Button>
        </Col>
      </Row>
    </div>
  );
}
