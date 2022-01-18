import React from 'react';
import Button from '@mui/material/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Control, FormState, UseFormRegister } from 'react-hook-form';
import { BsTrashFill } from 'react-icons/bs';
import { ICheckboxQuestion } from '../../Nexus/entities/ICheckboxQuestion';
import { IRequirement } from '../../Nexus/entities/IRequirement';

type IProps = {
  control: Control<IRequirement>;
  register: UseFormRegister<IRequirement>;
  formState: FormState<IRequirement>;
  item: ICheckboxQuestion;
  vIndex: number;
  aIndex: number;
  remove: (i: number) => void;
};

export default function CheckboxForm({
  register,
  remove,
  item,
  vIndex,
  aIndex
}: IProps): React.ReactElement {
  return (
    <Card className="mb-3">
      <Card.Body>
        <h6>
          Alternative: Yes/No{' '}
          <Button variant="warning" onClick={() => remove(aIndex)}>
            <BsTrashFill />
          </Button>
        </h6>

        <Form.Control
          as="input"
          type="hidden"
          {...register(`variants.${vIndex}.questions.${aIndex}.id` as const)}
          defaultValue={item.id}
        />
        <Form.Control
          as="input"
          type="hidden"
          {...register(`variants.${vIndex}.questions.${aIndex}.type` as const)}
          defaultValue={item.type}
        />
        <Form.Control
          as="input"
          type="hidden"
          {...register(
            `variants.${vIndex}.questions.${aIndex}.config.pointsNonPrefered` as const
          )}
          defaultValue={item.config.pointsNonPrefered}
        />
        <Row className="w-50">
          <Col>
            <Form.Label>Foretrukket alternativ</Form.Label>
          </Col>
          <Col>
            <Form.Control
              as="select"
              {...register(
                `variants.${vIndex}.questions.${aIndex}.config.preferedAlternative` as const
              )}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Form.Control>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
