import React, { ReactElement } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import { InputProps } from '../../models/InputProps';

import CodelistSelect from './CodelistSelect';

interface IProps extends InputProps {
  item: any;
  vIx: number;
  aIx: number;
  project: any;
}

export default function CodeListAlternative({
  register,
  control,
  formState: { errors },
  item,
  vIx,
  aIx,
  project
}: IProps): ReactElement {
  return (
    <Card className="mb-3">
      <Card.Body>
        <h6>Alternative: Codelist</h6>
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
        <CodelistSelect
          control={control}
          name={`layouts[${vIx}].alternatives[${aIx}].codelist`}
          defaultValue={item.codelist}
          codelists={project.codelist}
          errors={errors}
        />
      </Card.Body>
    </Card>
  );
}
