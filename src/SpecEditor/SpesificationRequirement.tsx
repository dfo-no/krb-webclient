import React, { ReactElement, useState } from 'react';
import { Card } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Requirement } from '../models/Requirement';
import RequirementAnswer from './RequirementAnswer';
import {
  addRequirement,
  deleteAnswer,
  removeRequirement
} from '../store/reducers/spesification-reducer';
import { RootState } from '../store/store';

type InputProps = {
  requirement: Requirement;
  selected: boolean;
};

export default function SpesificationRequirement({
  requirement,
  selected
}: InputProps): ReactElement {
  const dispatch = useDispatch();
  const [isSelected, setSelected] = useState(selected);
  const { spec } = useSelector((state: RootState) => state.specification);

  const changedCheckedValue = (event: any) => {
    setSelected(!isSelected);
    if (event.target.checked === true) {
      dispatch(addRequirement(requirement.id));
    } else {
      dispatch(removeRequirement(requirement.id));
      requirement.layouts.forEach((variant) => {
        if (
          spec.requirementAnswers.find(
            (answer) => answer.reqTextId === variant.id
          )
        ) {
          const index = spec.requirementAnswers.findIndex(
            (answer) => answer.reqTextId === variant.id
          );
          dispatch(
            deleteAnswer({
              answer: spec.requirementAnswers[index].id
            })
          );
        }
      });
    }
  };

  return (
    <Card className="mb-3">
      <Row className="p-0 m-2">
        <Col sm={1}>
          <Form.Check
            checked={isSelected}
            onChange={(e) => changedCheckedValue(e)}
          />
        </Col>
        <Col>
          {!isSelected && <p>{requirement.title}</p>}
          {isSelected && <RequirementAnswer requirement={requirement} />}
        </Col>
      </Row>
    </Card>
  );
}
