import React, { ReactElement, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

import { Bank } from '../../models/Bank';
import { Requirement } from '../../models/Requirement';
import { RequirementLayout } from '../../models/RequirementLayout';
import styles from './RequirementLayout.module.scss';

import {
  editRequirementInNeed,
  putProjectThunk
} from '../../store/reducers/project-reducer';
import Alternatives from './Alternatives';
import Utils from '../../common/Utils';
import { Product } from '../../models/Product';

interface IProps {
  layout: RequirementLayout;
  nIndex: number;
  project: Bank;
  requirement: Requirement;
}

type FormValues = {
  reqText: string;
  instruction: string;
  product: boolean;
  qualification: boolean;
  spesification: boolean;
  productList: string[];
};

const layoutSchema = Joi.object().keys({
  reqText: Joi.string().required().min(5),
  instruction: Joi.string().required().min(5)
});

export default function Layout({
  project,
  nIndex,
  layout,
  requirement
}: IProps): ReactElement {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      id: layout.id,
      reqText: layout.requirementText,
      instruction: layout.instruction
    },
    resolver: joiResolver(layoutSchema)
  });
  const [validated] = useState(false);
  const [isProductChecked, setProductChecked] = useState(layout.use_Product);

  const onEditLayoutSubmit = (post: FormValues) => {
    const newLayout = {
      id: layout.id,
      requirementText: post.reqText,
      instruction: post.instruction,
      alternatives: layout.alternatives,
      use_Product: post.product,
      use_Spesification: post.spesification,
      use_Qualification: post.qualification,
      products: post.productList
    };
    const newLayoutList = [...requirement.layouts];
    const layoutindex = requirement.layouts.findIndex(
      (element) => element.id === layout.id
    );
    newLayoutList[layoutindex] = newLayout;
    const newRequirement = { ...requirement };
    newRequirement.layouts = newLayoutList;
    dispatch(
      editRequirementInNeed({
        projectId: project.id,
        needIndex: nIndex,
        requirement: newRequirement
      })
    );
    dispatch(putProjectThunk(project.id));
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

  const productHierarchy = (products: Product[]) => {
    const newList = Utils.unflatten(products);
    let children: any;
    return newList.map((element: any) => {
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
  };
  return (
    <Card className="bg-light m-3">
      <Card.Body>
        <h4>Variant</h4>
        <Form
          onSubmit={handleSubmit(onEditLayoutSubmit)}
          noValidate
          validated={validated}
        >
          <Form.Group>
            <Form.Label>Requirement Text</Form.Label>
            <Form.Control
              as="textarea"
              name="reqText"
              ref={register}
              isInvalid={!!errors.reqText}
            />
            {errors.reqText && (
              <Form.Control.Feedback type="invalid">
                {errors.reqText.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Instruction</Form.Label>
            <Form.Control
              as="textarea"
              name="instruction"
              ref={register}
              isInvalid={!!errors.instruction}
            />
            {errors.instruction && (
              <Form.Control.Feedback type="invalid">
                {errors.instruction?.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Usage:</Form.Label>
            <Form.Check
              name="product"
              ref={register}
              type="checkbox"
              label="Products"
              defaultChecked={layout.use_Product}
              onChange={(e) => {
                setProductChecked(e.target.checked);
              }}
            />
            <Form.Check
              name="qualification"
              type="checkbox"
              label="Qualification"
              ref={register}
              defaultChecked={layout.use_Qualification}
            />
            <Form.Check
              name="spesification"
              type="checkbox"
              label="Requirement Spesification"
              ref={register}
              defaultChecked={layout.use_Spesification}
            />
          </Form.Group>
          {isProductChecked && (
            <Form.Group>
              <Form.Label>Select Associated Products:</Form.Label>
              <Form.Control
                as="select"
                multiple
                name="productlist"
                ref={register}
                defaultValue={layout.products}
              >
                {productHierarchy(project.products)}
              </Form.Control>
            </Form.Group>
          )}
          <Button className="mt-2 mb-4" type="submit">
            Save
          </Button>
        </Form>
        <Alternatives
          project={project}
          nIndex={nIndex}
          requirement={requirement}
          alternatives={layout.alternatives}
          layout={layout}
        />
      </Card.Body>
    </Card>
  );
}
