import React, { ReactElement, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useFieldArray } from 'react-hook-form';
import { BsTrashFill } from 'react-icons/bs';

import { v4 as uuidv4 } from 'uuid';
import Row from 'react-bootstrap/Row';
import { InputProps } from '../../models/InputProps';
import styles from './Variant.module.scss';

import Utils from '../../common/Utils';
import { Product } from '../../models/Product';
import AlternativeArray from './AlternativeArray';

interface IProps extends InputProps {
  project: any;
}

export default function VariantArray({
  control,
  register,
  errors,
  project,
  getValues,
  setValue
}: IProps): ReactElement {
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

  const childrenHierarchy = (listofProducts: any[], level: number) => {
    let n = level;
    let children: any;
    const cssClass = `level${n}`;
    return listofProducts.map((element: any) => {
      if (element.children.length > 0) {
        n += 1;
        children = childrenHierarchy(element.children, n);
      }
      return (
        <>
          <option
            key={element.id}
            value={element.id}
            className={` ${styles[cssClass]}`}
          >
            {element.title}
          </option>
          {children}
        </>
      );
    });
  };

  const productHierarchy = (productList: Product[]) => {
    const newList = Utils.unflatten(productList)[0];
    let children: any;
    const result = newList.map((element: any) => {
      if (element.children.length > 0) {
        children = childrenHierarchy(element.children, 1);
      }

      return (
        <>
          <option key={element.id} value={element.id}>
            {element.title}
          </option>
          {children}
        </>
      );
    });
    return result;
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
                name={`layouts[${index}].id`}
                type="hidden"
                ref={register}
                defaultValue={item.id}
                isInvalid={!!(errors[index] && errors[index].id)}
              />
              <Form.Group>
                <Form.Label>Requirement Text</Form.Label>
                <Form.Control
                  as="textarea"
                  name={`layouts[${index}].requirementText`}
                  ref={register}
                  defaultValue={item.requirementText}
                  isInvalid={
                    !!(
                      errors.layouts &&
                      errors.layouts[index] &&
                      errors.layouts[index].requirementText
                    )
                  }
                />
                {errors.layouts &&
                  errors.layouts[index] &&
                  errors.layouts[index].requirementText && (
                    <Form.Control.Feedback type="invalid">
                      {errors.layouts[index].requirementText.message}
                    </Form.Control.Feedback>
                  )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Instruction</Form.Label>
                <Form.Control
                  as="textarea"
                  name={`layouts[${index}].instruction`}
                  ref={register}
                  defaultValue={item.instruction}
                  isInvalid={
                    !!(
                      errors.layouts &&
                      errors.layouts[index] &&
                      errors.layouts[index].instruction
                    )
                  }
                />
                {errors.layouts &&
                  errors.layouts[index] &&
                  errors.layouts[index].instruction && (
                    <Form.Control.Feedback type="invalid">
                      {errors.layouts[index].instruction.message}
                    </Form.Control.Feedback>
                  )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Usage:</Form.Label>

                <Form.Check
                  name={`layouts[${index}].use_Qualification`}
                  type="checkbox"
                  label="Qualification"
                  ref={register}
                  defaultChecked={item.use_Qualification}
                  isInvalid={
                    !!(
                      errors.layouts &&
                      errors.layouts[index] &&
                      errors.layouts[index].use_Qualification
                    )
                  }
                  feedback={errors.use_Qualification?.message}
                />
                <Form.Check
                  name={`layouts[${index}].use_Spesification`}
                  type="checkbox"
                  label="Requirement Spesification"
                  ref={register}
                  defaultChecked={item.use_Spesification}
                  isInvalid={
                    !!(
                      errors.layouts &&
                      errors.layouts[index] &&
                      errors.layouts[index].use_Spesification
                    )
                  }
                  feedback={errors.use_Spesification?.message}
                />
                <Form.Check
                  name={`layouts[${index}].use_Product`}
                  ref={register}
                  type="checkbox"
                  label="Products"
                  defaultChecked={item.use_Product}
                  /* TODO: should be false/readOnly if no products exists, or if products has been removed */
                  onChange={(e) => {
                    toggleProductChecked(item.id, e.target.checked);
                  }}
                  isInvalid={
                    !!(
                      errors.layouts &&
                      errors.layouts[index] &&
                      errors.layouts[index].use_Product
                    )
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Select Associated Products:</Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  name={`layouts[${index}].products`}
                  ref={register}
                  defaultValue={item.products}
                  isInvalid={
                    !!(
                      errors.layouts &&
                      errors.layouts[index] &&
                      errors.layouts[index].products
                    )
                  }
                >
                  {/*  TODO: Fix unique key props */}
                  {productHierarchy(project.products)}
                </Form.Control>
                {errors.layouts &&
                  errors.layouts[index] &&
                  errors.layouts[index].products && (
                    <Form.Control.Feedback type="invalid">
                      {errors.layouts[index].products.message}
                    </Form.Control.Feedback>
                  )}
              </Form.Group>

              <AlternativeArray
                prefix={`layouts[${index}].alternatives`}
                project={project}
                {...{
                  variantIndex: index,
                  control,
                  register,
                  errors,
                  getValues,
                  setValue,
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
