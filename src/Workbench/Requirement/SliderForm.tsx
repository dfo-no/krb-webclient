import { get, has } from 'lodash';
import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Control, FormState, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BsTrashFill } from 'react-icons/bs';
import { ISliderQuestion } from '../../models/ISliderQuestion';
import { Requirement } from '../../models/Requirement';

type IProps = {
  control: Control<Requirement>;
  register: UseFormRegister<Requirement>;
  formState: FormState<Requirement>;
  item: ISliderQuestion;
  vIndex: number;
  aIndex: number;
  remove: (i: number) => void;
};

export default function SliderForm({
  remove,
  register,
  formState: { errors },
  item,
  vIndex,
  aIndex
}: IProps): ReactElement {
  const { t } = useTranslation();

  return (
    <Card className="mb-3">
      <Card.Body>
        <h6>
          {t('Alternative')}: {t('Value')}{' '}
          <Button
            className="mb-3"
            type="button"
            variant="danger"
            onClick={() => remove(aIndex)}
          >
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
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            {t('Minumum')}
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="number"
              {...register(
                `variants.${vIndex}.questions.${aIndex}.config.min` as const
              )}
              defaultValue={item?.config?.min}
              isInvalid={
                !!has(
                  errors,
                  `variants[${vIndex}].questions[${aIndex}].config.min`
                )
              }
            />
            <Form.Control.Feedback type="invalid">
              {get(
                errors,
                `variants[${vIndex}].questions.[${aIndex}].config.min.message`
              )}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            {t('Maximum')}
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="number"
              {...register(
                `variants.${vIndex}.questions.${aIndex}.config.max` as const
              )}
              defaultValue={item.config.max}
              isInvalid={
                !!has(
                  errors,
                  `variants[${vIndex}].questions[${aIndex}].config.max`
                )
              }
            />
            <Form.Control.Feedback type="invalid">
              {get(
                errors,
                `variants[${vIndex}].questions.[${aIndex}].config.max.message`
              )}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            {t('Step')}
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              type="number"
              {...register(
                `variants.${vIndex}.questions.${aIndex}.config.step` as const
              )}
              defaultValue={item.config.step}
              isInvalid={
                !!has(
                  errors,
                  `variants[${vIndex}].questions[${aIndex}].config.step`
                )
              }
            />
            <Form.Control.Feedback type="invalid">
              {get(
                errors,
                `variants[${vIndex}].questions.[${aIndex}].config.step.message`
              )}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            {t('Unit')}
          </Form.Label>
          <Col sm="4">
            <Form.Control
              as="input"
              {...register(
                `variants.${vIndex}.questions.${aIndex}.config.unit` as const
              )}
              defaultValue={item.config.unit}
              isInvalid={
                !!has(
                  errors,
                  `variants${vIndex}.questions${aIndex}.config.unit` as const
                )
              }
            />
            <Form.Control.Feedback type="invalid">
              {get(
                errors,
                `variants${vIndex}.questions.${aIndex}.config.unit.message`
              )}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
      </Card.Body>
    </Card>
  );
}
