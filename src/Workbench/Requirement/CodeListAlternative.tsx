import React, { ReactElement } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { BsTrashFill } from 'react-icons/bs';
import { InputProps } from '../../models/InputProps';

import CodelistSelect from './CodelistSelect';

interface IProps extends InputProps {
  item: any;
  vIx: number;
  aIx: number;
  project: any;
}

export default function CodeListAlternative({
  remove,
  register,
  control,
  formState,
  item,
  vIx,
  aIx,
  project
}: IProps): ReactElement {
  const { errors } = formState;
  return (
    <Card className="mb-3">
      <Card.Body>
        <Row className=" m-1 d-flex justify-content-between">
          <h6>Alternative: Codelist</h6>
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
        <CodelistSelect
          control={control}
          name={`layouts[${vIx}].alternatives[${aIx}].codelist`}
          defaultValue={item.codelist}
          codelists={project.codelist}
        />
      </Card.Body>
    </Card>
  );
}
