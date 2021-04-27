import React, { ReactElement } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { BsTrashFill } from 'react-icons/bs';
import { InputProps } from '../../models/InputProps';

interface IProps extends InputProps {
  item: any;
  vIx: number;
  aIx: number;
}

export default function PeriodDateAlternative({
  remove,
  register,
  formState: { errors },
  item,
  vIx,
  aIx
}: IProps): ReactElement {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Row className="m-1 d-flex justify-content-between">
          <h6>Alternative: Period Date</h6>
          <Button
            className="mb-3"
            type="button"
            variant="danger"
            onClick={() => remove(aIx)}
          >
            <BsTrashFill />
          </Button>
        </Row>
        <Form.Control
          as="input"
          type="hidden"
          {...register(`layouts[${vIx}].alternatives[${aIx}].id`)}
          defaultValue={item.id}
          isInvalid={
            !!(
              errors.layouts &&
              errors.layouts[vIx] &&
              errors.layouts[vIx].alternatives &&
              errors.layouts[vIx].alternatives[aIx] &&
              errors.layouts[vIx].alternatives[aIx].id
            )
          }
        />
        <Form.Control
          as="input"
          type="hidden"
          {...register(`layouts[${vIx}].alternatives[${aIx}].type`)}
          defaultValue={item.type}
          isInvalid={
            !!(
              errors.layouts &&
              errors.layouts[vIx] &&
              errors.layouts[vIx].alternatives &&
              errors.layouts[vIx].alternatives[aIx] &&
              errors.layouts[vIx].alternatives[aIx].type
            )
          }
        />
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Minimum days
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="input"
              {...register(`layouts[${vIx}].alternatives[${aIx}].minDays`)}
              defaultValue={item.minDays}
              isInvalid={
                !!(
                  errors.layouts &&
                  errors.layouts[vIx] &&
                  errors.layouts[vIx].alternatives &&
                  errors.layouts[vIx].alternatives[aIx] &&
                  errors.layouts[vIx].alternatives[aIx].minDays
                )
              }
            />
            {errors.layouts &&
              errors.layouts[vIx] &&
              errors.layouts[vIx].alternatives &&
              errors.layouts[vIx].alternatives[aIx] &&
              errors.layouts[vIx].alternatives[aIx].minDays && (
                <Form.Control.Feedback type="invalid">
                  {errors.layouts[vIx].alternatives[aIx].minDays.message}
                </Form.Control.Feedback>
              )}
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Maximum days
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="number"
              {...register(`layouts[${vIx}].alternatives[${aIx}].maxDays`)}
              defaultValue={item.maxDays}
              isInvalid={
                !!(
                  errors.layouts &&
                  errors.layouts[vIx] &&
                  errors.layouts[vIx].alternatives &&
                  errors.layouts[vIx].alternatives[aIx] &&
                  errors.layouts[vIx].alternatives[aIx].maxDays
                )
              }
            />
            {errors.layouts &&
              errors.layouts[vIx] &&
              errors.layouts[vIx].alternatives &&
              errors.layouts[vIx].alternatives[aIx] &&
              errors.layouts[vIx].alternatives[aIx].maxDays && (
                <Form.Control.Feedback type="invalid">
                  {errors.layouts[vIx].alternatives[aIx].maxDays.message}
                </Form.Control.Feedback>
              )}
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            From date
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="input"
              {...register(`layouts[${vIx}].alternatives[${aIx}].fromDate`)}
              defaultValue={item.fromDate}
              isInvalid={
                !!(
                  errors.layouts &&
                  errors.layouts[vIx] &&
                  errors.layouts[vIx].alternatives &&
                  errors.layouts[vIx].alternatives[aIx] &&
                  errors.layouts[vIx].alternatives[aIx].fromDate
                )
              }
            />
            {errors.layouts &&
              errors.layouts[vIx] &&
              errors.layouts[vIx].alternatives &&
              errors.layouts[vIx].alternatives[aIx] &&
              errors.layouts[vIx].alternatives[aIx].fromDate && (
                <Form.Control.Feedback type="invalid">
                  {errors.layouts[vIx].alternatives[aIx].fromDate.message}
                </Form.Control.Feedback>
              )}
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            To date
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="input"
              {...register(`layouts[${vIx}].alternatives[${aIx}].toDate`)}
              defaultValue={item.toDate}
              isInvalid={
                !!(
                  errors.layouts &&
                  errors.layouts[vIx] &&
                  errors.layouts[vIx].alternatives &&
                  errors.layouts[vIx].alternatives[aIx] &&
                  errors.layouts[vIx].alternatives[aIx].toDate
                )
              }
            />
            {errors.layouts &&
              errors.layouts[vIx] &&
              errors.layouts[vIx].alternatives &&
              errors.layouts[vIx].alternatives[aIx] &&
              errors.layouts[vIx].alternatives[aIx].toDate && (
                <Form.Control.Feedback type="invalid">
                  {errors.layouts[vIx].alternatives[aIx].toDate.message}
                </Form.Control.Feedback>
              )}
          </Col>
        </Form.Group>
      </Card.Body>
    </Card>
  );
}
