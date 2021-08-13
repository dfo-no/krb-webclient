import React, { ReactElement, useState } from 'react';
import { Card } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { Requirement } from '../../models/Requirement';
import RequirementType from '../../models/RequirementType';
import {
  addRequirement,
  deleteAnswer,
  removeRequirement
} from '../../store/reducers/spesification-reducer';
import { RootState } from '../../store/store';
import InfoAnswer from './InfoAnswer';
import RequirementAnswer from './RequirementAnswer';

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

  const changedCheckedValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(!isSelected);
    if (event.target.checked === true) {
      dispatch(addRequirement(requirement.id));
    } else {
      dispatch(removeRequirement(requirement.id));
      requirement.variants.forEach((variant) => {
        if (
          spec.requirementAnswers.find(
            (answer) => answer.variantId === variant.id
          )
        ) {
          const index = spec.requirementAnswers.findIndex(
            (answer) => answer.variantId === variant.id
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
          {isSelected &&
            requirement.requirement_Type === RequirementType.info && (
              <InfoAnswer key={requirement.id} requirement={requirement} />
            )}
          {isSelected &&
            requirement.requirement_Type === RequirementType.requirement && (
              <RequirementAnswer
                key={requirement.id}
                requirement={requirement}
              />
            )}
        </Col>
      </Row>
    </Card>
  );
}
