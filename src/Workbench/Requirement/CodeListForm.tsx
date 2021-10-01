import Switch from '@mui/material/Switch';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import {
  Control,
  Controller,
  FormState,
  UseFormRegister
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BsTrashFill } from 'react-icons/bs';
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
}: IProps): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const { t } = useTranslation();
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
        <h6>
          {t('Alternative')}: {t('Codelist')}
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
        <Form.Control
          as="select"
          {...register(
            `variants.${vIndex}.questions.${aIndex}.config.codelist` as const
          )}
        >
          {codelistOptions()}
        </Form.Control>
        <Form.Label>{t('Allow multiple selected codes')}</Form.Label>
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
