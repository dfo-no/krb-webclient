import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Utils from '../../common/Utils';
import { IRequirement } from '../../models/IRequirement';
import { ISpecificationProduct } from '../../models/ISpecificationProduct';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addProductRequirement,
  deleteProductAnswer,
  removeProductRequirement
} from '../../store/reducers/spesification-reducer';
import ProductRequirementAnswer from './ProductRequirementAnswer';

type InputProps = {
  requirement: IRequirement;
  selected: boolean;
  productId: string;
};

export default function ProductSpesificationRequirement({
  requirement,
  selected,
  productId
}: InputProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const [isSelected, setSelected] = useState(selected);
  const { spec } = useAppSelector((state) => state.specification);

  const specProduct = Utils.ensure(
    spec.products.find(
      (product: ISpecificationProduct) => product.id === productId
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
