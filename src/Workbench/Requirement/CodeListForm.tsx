import Switch from '@material-ui/core/Switch';
import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {
  Control,
  Controller,
  FormState,
  UseFormRegister
} from 'react-hook-form';
import { BsTrashFill } from 'react-icons/bs';
import Utils from '../../common/Utils';
import { Bank } from '../../models/Bank';
import { Codelist } from '../../models/Codelist';
import { ICodelistQuestion } from '../../models/ICodelistQuestion';
import { Requirement } from '../../models/Requirement';
import { useAppSelector } from '../../store/hooks';

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

export default function CodeListForm({
  remove,
  register,
  item,
  vIndex,
  aIndex,
  control
}: IProps): ReactElement {
  const { id } = useAppSelector((state) => state.selectedProject);
  const { list } = useAppSelector((state) => state.project);

  const project = Utils.ensure(list.find((bank: Bank) => bank.id === id));
  const codelistOptions = () => {
    return project.codelist.map((codelist: Codelist) => {
      return (
        <option value={codelist.id} key={codelist.id}>
          {codelist.title}
        </option>
      );
    });
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
          as="select"
          {...register(
            `variants.${vIndex}.questions.${aIndex}.config.codelist` as const
          )}
        >
          {codelistOptions()}
        </Form.Control>
        <Form.Label>Allow multiple selected Codes</Form.Label>
        <Controller
          control={control}
          name={
            `variants.${vIndex}.questions.${aIndex}.config.multipleSelect` as const
          }
          render={({ field }) => (
            <Switch
              {...field}
              checked={field.value}
              onChange={(_, value) => {
                field.onChange(value);
              }}
            />
          )}
        />
      </Card.Body>
    </Card>
  );
}
