import React, { ReactElement } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import { InputProps } from '../../models/InputProps';

interface IProps extends InputProps {
  item: any;
  vIx: number;
  aIx: number;
}

export default function CodeListAlternative({
  register,
  errors,
  item,
  vIx,
  aIx
}: IProps): ReactElement {
  return (
    <Card className="mb-3">
      <Card.Body>
        <h6>Alternative: Yes/No</h6>
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
      </Card.Body>
    </Card>
  );
}
