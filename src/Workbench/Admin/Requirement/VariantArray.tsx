import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { get, has, toPath } from 'lodash';
import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import {
  Control,
  FieldError,
  FormState,
  useFieldArray,
  UseFormRegister
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import Utils from '../../../common/Utils';
import { Nestable } from '../../../models/Nestable';
import { IBank } from '../../../Nexus/entities/IBank';
import { IProduct } from '../../../Nexus/entities/IProduct';
import { IRequirement } from '../../../Nexus/entities/IRequirement';
import { IVariant } from '../../../Nexus/entities/IVariant';
import VariantType from '../../../Nexus/entities/VariantType';
import QuestionArray from './QuestionArray';
import styles from './Variant.module.scss';

type IProps = {
  control: Control<IRequirement>;
  register: UseFormRegister<IRequirement>;
  formState: FormState<IRequirement>;
  project: IBank;
};

export default function VariantArray({
  control,
  register,
  formState,
  project
}: IProps): React.ReactElement {
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray<
    IRequirement,
    'variants',
    'id'
  >({
    control,
    name: 'variants'
  });

  const { t } = useTranslation();

  const levelOptions = (productList: Nestable<IProduct>[]) => {
    const newList = Utils.unflatten(productList)[0];
    const options: IOption[] = [];

    const getAllItemsPerChildren = (item: Nestable<IProduct>, level = 0) => {
      options.push({
        id: item.id,
        title: item.title,
        level
      });
      if (item.children) {
        const iteration = level + 1;
        item.children.forEach((i: Nestable<IProduct>) =>
          getAllItemsPerChildren(i, iteration)
        );
      }
    };

    newList.forEach((element) => {
      return getAllItemsPerChildren(element);
    });
    return options;
  };

  interface IOption {
    id: string;
    title: string;
    level: number;
  }

  const renderMultipleErrors = (values: unknown) => {
    const value = values as FieldError;
    return (
      <Form.Control.Feedback type="invalid">
        {value?.message}
      </Form.Control.Feedback>
    );
  };

  const hasError = (str: string) => {
    let retVal = null;
    const path = toPath(str);
    if (has(errors, path)) {
      retVal = true;
    } else {
      retVal = false;
    }
    return retVal;
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={() => {
          const newVariant: IVariant = {
            id: uuidv4(),
            requirementText: '',
            instruction: '',
            useProduct: false,
            useSpesification: false,
            useQualification: false,
            products: [],
            questions: [],
            type: VariantType.requirement
          };
          append(newVariant);
        }}
      >
        {t('Add Variant')}
      </Button>
      {fields.map((item, index) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Card className="mb-3" key={uuidv4()}>
            <Card.Body>
              <h5>
                {t('Variant')}{' '}
                <Button
                  variant="primary"
                  onClick={() => {
                    remove(index);
                  }}
                >
                  <DeleteIcon />
                </Button>
              </h5>
              <Form.Control
                as="input"
                type="hidden"
                {...register(`variants.${index}.id` as const)}
                defaultValue={item.id}
              />
              <Form.Group>
                <Form.Label>{t('Requirement text')}</Form.Label>
                <Form.Control
                  as="textarea"
                  {...register(`variants.${index}.requirementText` as const)}
                  defaultValue={item.requirementText}
                  isInvalid={
                    !!has(errors, `variants[${index}].requirementText`)
                  }
                />
                {!!hasError(`variants[${index}].requirementText`) && (
                  <Form.Control.Feedback type="invalid">
                    {get(errors, `variants[${index}].requirementText.message`)}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>{t('Instruction')}</Form.Label>
                <Form.Control
                  as="textarea"
                  {...register(`variants.${index}.instruction` as const)}
                  defaultValue={item.instruction}
                  isInvalid={!!has(errors, `variants[${index}].instruction`)}
                />

                <Form.Control.Feedback type="invalid">
                  {get(errors, `variants[${index}].instruction.message`)}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>{t('Usage')}:</Form.Label>

                <Form.Check
                  type="checkbox"
                  label={t('Qualification')}
                  {...register(`variants.${index}.useQualification` as const)}
                  defaultChecked={item.useQualification}
                  isInvalid={
                    !!has(errors, `variants[${index}].useQualification`)
                  }
                  feedback={get(
                    errors,
                    `variants[${index}].useQualification.message`
                  )}
                />
                <Form.Check
                  type="checkbox"
                  label={t('Requirement spesification')}
                  {...register(`variants.${index}.useSpesification` as const)}
                  defaultChecked={item.useSpesification}
                  isInvalid={
                    !!has(errors, `variants[${index}].useSpesification`)
                  }
                  feedback={get(
                    errors,
                    `variants[${index}].useSpesification.message`
                  )}
                />
                <Form.Check
                  {...register(`variants.${index}.useProduct` as const)}
                  type="checkbox"
                  label={t('Products')}
                  defaultChecked={item.useProduct}
                  isInvalid={!!has(errors, `variants[${index}].useProduct`)}
                  feedback={get(
                    errors,
                    `variants[${index}].useProduct.message`
                  )}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>{t('Select associated products')}:</Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  {...register(`variants.${index}.products` as const)}
                  defaultValue={item.products}
                  isInvalid={!!has(errors, `variants[${index}].products`)}
                >
                  {levelOptions(project.products).map((element) => (
                    <option
                      key={element.id}
                      value={element.id}
                      className={` ${styles[`level${element.level}`]}`}
                    >
                      {element.title}
                    </option>
                  ))}
                </Form.Control>

                {!!has(errors, `variants[${index}].products`) &&
                  renderMultipleErrors(`variants[${index}].products`)}
              </Form.Group>

              <QuestionArray
                control={control}
                register={register}
                formState={formState}
                variantIndex={index}
                project={project}
              />
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
}
