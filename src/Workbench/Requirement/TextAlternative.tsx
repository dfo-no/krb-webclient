import React, { ReactElement } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { BsTrashFill } from 'react-icons/bs';
import { InputProps } from '../../models/InputProps';

interface IProps extends InputProps {
  item: any;
  vIx: number;
  aIx: number;
}

export default function TextAlternative({
  remove,
  register,
  errors,
  item,
  vIx,
  aIx
}: IProps): ReactElement {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Row className="m-1 d-flex justify-content-between">
          <h6>Alternative: Text</h6>
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
          name={`layouts[${vIx}].alternatives[${aIx}].id`}
          ref={register}
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
          name={`layouts[${vIx}].alternatives[${aIx}].type`}
          ref={register}
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
            Max
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="number"
              name={`layouts[${vIx}].alternatives[${aIx}].max`}
              ref={register}
              defaultValue={item.max}
              isInvalid={
                !!(
                  errors.layouts &&
                  errors.layouts[vIx] &&
                  errors.layouts[vIx].alternatives &&
                  errors.layouts[vIx].alternatives[aIx] &&
                  errors.layouts[vIx].alternatives[aIx].max
                )
              }
            />
            {errors.layouts &&
              errors.layouts[vIx] &&
              errors.layouts[vIx].alternatives &&
              errors.layouts[vIx].alternatives[aIx] &&
              errors.layouts[vIx].alternatives[aIx].max && (
                <Form.Control.Feedback type="invalid">
                  {errors.layouts[vIx].alternatives[aIx].max.message}
                </Form.Control.Feedback>
              )}
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Text
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="input"
              name={`layouts[${vIx}].alternatives[${aIx}].text`}
              ref={register}
              defaultValue={item.text}
              isInvalid={
                !!(
                  errors.layouts &&
                  errors.layouts[vIx] &&
                  errors.layouts[vIx].alternatives &&
                  errors.layouts[vIx].alternatives[aIx] &&
                  errors.layouts[vIx].alternatives[aIx].text
                )
              }
            />
            {errors.layouts &&
              errors.layouts[vIx] &&
              errors.layouts[vIx].alternatives &&
              errors.layouts[vIx].alternatives[aIx] &&
              errors.layouts[vIx].alternatives[aIx].text && (
                <Form.Control.Feedback type="invalid">
                  {errors.layouts[vIx].alternatives[aIx].text.message}
                </Form.Control.Feedback>
              )}
          </Col>
        </Form.Group>
      </Card.Body>
    </Card>
  );
}
