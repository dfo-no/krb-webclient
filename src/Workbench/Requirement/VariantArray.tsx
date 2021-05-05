import React, { ReactElement, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import {
  Control,
  FieldError,
  FormState,
  useFieldArray,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue
} from 'react-hook-form';
import { BsTrashFill } from 'react-icons/bs';
import { has, get } from 'lodash';

import { v4 as uuidv4 } from 'uuid';
import Row from 'react-bootstrap/Row';
import styles from './Variant.module.scss';

import Utils from '../../common/Utils';
import { Product } from '../../models/Product';
import AlternativeArray from './AlternativeArray';
import { Requirement } from '../../models/Requirement';
import { Bank } from '../../models/Bank';
import { Nestable } from '../../models/Nestable';

type IProps = {
  control: Control<Requirement>;
  register: UseFormRegister<Requirement>;
  formState: FormState<Requirement>;
  project: Bank;
  getValues: UseFormGetValues<Requirement>;
  setValue: UseFormSetValue<Requirement>;
};

export default function VariantArray({
  control,
  register,
  formState,
  project
}: IProps): ReactElement {
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    keyName: 'guid',
    control,
    name: 'layouts'
  });

  const [productChecked, setProductChecked] = useState<string[]>([]);

  const toggleProductChecked = (id: string, checked: boolean) => {
    if (checked) {
      const newArr = [...productChecked, id];
      setProductChecked(newArr);
    } else {
      const filteredArray = productChecked.filter((str) => {
        return str !== id;
      });
      setProductChecked(filteredArray);
    }
  };

  const levelOptions = (productList: Nestable<Product>[]) => {
    const newList = Utils.unflatten(productList)[0];
    const options: IOption[] = [];

    const getAllItemsPerChildren = (item: Nestable<Product>, level = 0) => {
      options.push({
        id: item.id,
        title: item.title,
        level
      });
      if (item.children) {
        const iteration = level + 1;
        item.children.map((i: Nestable<Product>) =>
          getAllItemsPerChildren(i, iteration)
        );
      }
    };

    newList.map((element) => {
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

  return (
    <>
      <Button
        className="mb-3"
        type="button"
        onClick={() => {
          append({
            id: uuidv4(),
            requirementText: '',
            instruction: '',
            use_Product: false,
            use_Spesification: false,
            use_Qualification: false,
            products: [],
            alternatives: []
          });
        }}
      >
        Add Variant
      </Button>
      {fields.map((item, index) => {
        return (
          <Card className="mb-3" key={item.id}>
            <Card.Body>
              <Row className="d-flex justify-content-between">
                <h5>Variant</h5>
                <Button
                  className="mb-3"
                  type="button"
                  variant="danger"
                  onClick={() => {
                    remove(index);
                  }}
                >
                  <BsTrashFill />
                </Button>
              </Row>

              <Form.Control
                readOnly
                as="input"
                type="hidden"
                {...register(`layouts.${index}.id` as const)}
                defaultValue={item.id}
              />
              {/* TODO: check replacement with Input */}
              <Form.Group>
                <Form.Label>Requirement Text</Form.Label>
                <Form.Control
                  as="textarea"
                  {...register(`layouts.${index}.requirementText` as const)}
                  defaultValue={item.requirementText}
                  isInvalid={!!has(errors, `layouts[${index}].requirementText`)}
                />
                {errors.layouts &&
                  errors.layouts[index] &&
                  errors.layouts[index]?.requirementText && (
                    <Form.Control.Feedback type="invalid">
                      {get(errors, `layouts[${index}].requirementText.message`)}
                    </Form.Control.Feedback>
                  )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Instruction</Form.Label>
                <Form.Control
                  as="textarea"
                  {...register(`layouts.${index}.instruction` as const)}
                  defaultValue={item.instruction}
                  isInvalid={!!has(errors, `layouts[${index}].instruction`)}
                />

                <Form.Control.Feedback type="invalid">
                  {get(errors, `layouts[${index}].instruction.message`)}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Usage:</Form.Label>

                <Form.Check
                  type="checkbox"
                  label="Qualification"
                  {...register(`layouts.${index}.use_Qualification` as const)}
                  defaultChecked={item.use_Qualification}
                  isInvalid={
                    !!has(errors, `layouts[${index}].use_Qualification`)
                  }
                  feedback={get(
                    errors,
                    `layouts[${index}].use_Qualification.message`
                  )}
                />
                <Form.Check
                  type="checkbox"
                  label="Requirement Spesification"
                  {...register(`layouts.${index}.use_Spesification` as const)}
                  defaultChecked={item.use_Spesification}
                  isInvalid={
                    !!has(errors, `layouts[${index}].use_Spesification`)
                  }
                  feedback={get(
                    errors,
                    `layouts[${index}].use_Spesification.message`
                  )}
                />
                <Form.Check
                  {...register(`layouts.${index}.use_Product` as const)}
                  type="checkbox"
                  label="Products"
                  defaultChecked={item.use_Product}
                  // TODO: should be false/readOnly if no products exists, or if products has been removed
                  onChange={(e) => {
                    toggleProductChecked(item.id, e.target.checked);
                  }}
                  isInvalid={!!has(errors, `layouts[${index}].use_Product`)}
                  feedback={get(
                    errors,
                    `layouts[${index}].use_Product.message`
                  )}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Select Associated Products:</Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  {...register(`layouts.${index}.products` as const)}
                  defaultValue={item.products}
                  isInvalid={!!has(errors, `layouts[${index}].products`)}
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
                {/* TODO: This Feedback do not show */}
                <Form.Control.Feedback type="invalid">
                  {errors.layouts &&
                    errors.layouts[index] &&
                    errors.layouts[index]?.products &&
                    renderMultipleErrors(errors.layouts[index]?.products)}
                </Form.Control.Feedback>
              </Form.Group>

              <AlternativeArray
                project={project}
                {...{
                  variantIndex: index,
                  control,
                  register,
                  formState,
                  alternatives: item.alternatives
                }}
                {...{ remove }}
              />
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
}
