import React, { ReactElement, useState } from 'react';
import { Card } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import Utils from '../../common/Utils';
import { Requirement } from '../../models/Requirement';
import { SpecificationProduct } from '../../models/SpecificationProduct';
import {
  addProductRequirement,
  deleteProductAnswer,
  removeProductRequirement
} from '../../store/reducers/spesification-reducer';
import { RootState } from '../../store/store';
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
  const { spec } = useSelector((state: RootState) => state.specification);

  const specProduct = Utils.ensure(
    spec.products.find(
      (product: SpecificationProduct) => product.id === productId
    )
  );

  const changedCheckedValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(!isSelected);
    if (event.target.checked === true) {
      dispatch(
        addProductRequirement({ requirement: requirement.id, productId })
      );
    } else {
      dispatch(
        removeProductRequirement({ requirement: requirement.id, productId })
      );
      requirement.variants.forEach((variant) => {
        if (
          specProduct.requirementAnswers.find(
            (answer) => answer.variantId === variant.id
          )
        ) {
          const index = specProduct.requirementAnswers.findIndex(
            (answer) => answer.variantId === variant.id
          );
          dispatch(
            deleteProductAnswer({
              answer: specProduct.requirementAnswers[index].id,
              productId: specProduct.id
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
