import React, { ReactElement } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { BsTrashFill } from 'react-icons/bs';
import { Control, FormState, UseFormRegister } from 'react-hook-form';
import { has } from 'lodash';

import { Requirement } from '../../models/Requirement';
import { ICodelistQuestion } from '../../models/ICodelistQuestion';
import { Bank } from '../../models/Bank';

type IProps = {
  control: Control<Requirement>;
  register: UseFormRegister<Requirement>;
  formState: FormState<Requirement>;
  item: ICodelistQuestion;
  vIndex: number;
  aIndex: number;
  remove: (i: number) => void;
  project: Bank;
};

export default function CodeListAlternative({
  remove,
  register,
  formState: { errors },
  item,
  vIndex,
  aIndex,
  project
}: IProps): ReactElement {
  const renderOptions = () => {
    if (project.codelist) {
      return project.codelist.map((element) => {
        return (
          <option key={element.id} value={element.id}>
            {element.title}
          </option>
        );
      });
    }
    return null;
  };
  return (
    <Card className="mb-3">
      <Card.Body>
        <Row className=" m-1 d-flex justify-content-between">
          <h6>Alternative: Codelist</h6>
          <Button
            className="mb-3"
            type="button"
            variant="danger"
            onClick={() => remove(aIndex)}
          >
            <BsTrashFill />
          </Button>
        </Row>
        <Form.Control
          as="input"
          type="hidden"
          {...register(`variants.${vIndex}.alternatives.${aIndex}.id` as const)}
          defaultValue={item.id}
        />
        <Form.Control
          as="input"
          type="hidden"
          {...register(
            `variants.${vIndex}.alternatives.${aIndex}.type` as const
          )}
          defaultValue={item.type}
        />
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Custom select
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="select"
              custom
              {...register(
                `variants.${vIndex}.alternatives.${aIndex}.codelist` as const
              )}
              defaultValue={item.codelist}
              isInvalid={
                !!has(
                  errors,
                  `variants[${vIndex}].alternatives[${aIndex}].codelist` as const
                )
              }
            >
              {renderOptions()}
            </Form.Control>
          </Col>
        </Form.Group>
      </Card.Body>
    </Card>
  );
}
