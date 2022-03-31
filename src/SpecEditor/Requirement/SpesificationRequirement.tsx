import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addRequirement,
  deleteAnswer,
  removeRequirement
} from '../../store/reducers/spesification-reducer';
// import InfoAnswer from './InfoAnswer';
// import RequirementAnswer from './RequirementAnswer';

type InputProps = {
  requirement: IRequirement;
  selected: boolean;
};

export default function SpesificationRequirement({
  requirement,
  selected
}: InputProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const [isSelected, setSelected] = useState(selected);
  const { spec } = useAppSelector((state) => state.specification);

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
        {/*  <Col>
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
        </Col> */}
      </Row>
    </Card>
  );
}
