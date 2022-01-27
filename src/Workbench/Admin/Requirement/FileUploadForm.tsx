import Button from '@mui/material/Button';
import { get, has } from 'lodash';
import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {
  Control,
  FieldError,
  FormState,
  UseFormRegister
} from 'react-hook-form';
import { BsTrashFill } from 'react-icons/bs';
import ControlledFileUpload from '../../../Form/ControlledFileUpload';
import RequirementType from '../../../models/RequirementType';
import { IFileUploadQuestion } from '../../../Nexus/entities/IFileUploadQuestion';
import { IRequirement } from '../../../Nexus/entities/IRequirement';

type IProps = {
  control: Control<IRequirement>;
  register: UseFormRegister<IRequirement>;
  formState: FormState<IRequirement>;
  item: IFileUploadQuestion;
  vIndex: number;
  aIndex: number;
  remove: (i: number) => void;
};

export default function FileUploadForm({
  remove,
  control,
  register,
  formState,
  item,
  vIndex,
  aIndex
}: IProps): React.ReactElement {
  const { errors } = formState;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _formValues } = control;

  return (
    <Card className="mb-3">
      <Card.Body>
        <h6>
          Alternative: File Upload
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
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Tilatte filtyper
          </Form.Label>
          <Col sm="4">
            <ControlledFileUpload
              label="Filtyper"
              control={control}
              name={`variants.${vIndex}.questions.${aIndex}.config.fileEndings`}
              error={
                get(
                  errors,
                  `variants.${vIndex}.questions.${aIndex}.config.fileEndings`
                ) as FieldError
              }
            />
          </Col>
        </Form.Group>
        <Form.Group
          controlId={
            `variants[${vIndex}].questions[${aIndex}].config.template` as const
          }
          as={Row}
        >
          <Form.Label column sm={2}>
            Mal
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              {...register(
                `variants.${vIndex}.questions.${aIndex}.config.template` as const
              )}
              isInvalid={
                !!has(
                  errors,
                  `variants[${vIndex}].questions[${aIndex}].config.template` as const
                )
              }
            />
            <Form.Control.Feedback type="invalid">
              {get(
                errors,
                `variants[${vIndex}].questions.[${aIndex}].config.template.message`
              )}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group
          controlId={
            `variants[${vIndex}].questions[${aIndex}].config.uploadInSpec` as const
          }
          as={Row}
        >
          <Form.Label column sm={2}>
            Opplasting i spesifikasjon
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="checkbox"
              disabled={_formValues.requirement_Type === RequirementType.info}
              {...register(
                `variants.${vIndex}.questions.${aIndex}.config.uploadInSpec` as const
              )}
              isInvalid={
                !!has(
                  errors,
                  `variants[${vIndex}].questions[${aIndex}].config.uploadInSpec` as const
                )
              }
            />
            <Form.Control.Feedback type="invalid">
              {get(
                errors,
                `variants[${vIndex}].questions.[${aIndex}].config.uploadInSpec.message`
              )}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group
          controlId={
            `variants[${vIndex}].questions[${aIndex}].config.allowMultipleFiles` as const
          }
          as={Row}
        >
          <Form.Label column sm={2}>
            Tillat flere vedlegg
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="checkbox"
              {...register(
                `variants.${vIndex}.questions.${aIndex}.config.allowMultipleFiles` as const
              )}
              isInvalid={
                !!has(
                  errors,
                  `variants[${vIndex}].questions[${aIndex}].config.allowMultipleFiles` as const
                )
              }
            />
            <Form.Control.Feedback type="invalid">
              {get(
                errors,
                `variants[${vIndex}].questions.[${aIndex}].config.allowMultipleFiles.message`
              )}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
      </Card.Body>
    </Card>
  );
}
