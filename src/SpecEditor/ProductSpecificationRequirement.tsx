import React, { ReactElement, useState } from 'react';
import { Card } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import { useDispatch } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Requirement } from '../models/Requirement';
import RequirementAnswer from './RequirementAnswer';
import {
  addProductRequirement,
  removeProductRequirement
} from '../store/reducers/spesification-reducer';
import ProductRequirementAnswer from './ProductRequirementAnswer';

type InputProps = {
  requirement: Requirement;
  selected: boolean;
  productId: string;
};

export default function ProductSpesificationRequirement({
  requirement,
  selected,
  productId
}: InputProps): ReactElement {
  const dispatch = useDispatch();
  const [isSelected, setSelected] = useState(selected);

  const changedCheckedValue = (event: any) => {
    setSelected(!isSelected);
    if (event.target.checked === true) {
      dispatch(
        addProductRequirement({ requirement: requirement.id, productId })
      );
    } else {
      dispatch(
        removeProductRequirement({ requirement: requirement.id, productId })
      );
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
          {isSelected && (
            <ProductRequirementAnswer
              requirement={requirement}
              productId={productId}
            />
          )}
        </Col>
      </Row>
    </Card>
  );
}
