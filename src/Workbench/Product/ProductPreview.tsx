/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Badge, ListGroup, Row } from 'react-bootstrap';
import { BsArrowReturnRight, BsPencil } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/store';

import Utils from '../../common/Utils';
import { Bank } from '../../models/Bank';
import { Product } from '../../models/Product';
import { Need } from '../../models/Need';
import { Requirement } from '../../models/Requirement';
import { RequirementLayout } from '../../models/RequirementLayout';
import styles from './ProductPreview.module.scss';
import { selectNeed } from '../../store/reducers/selectedNeed-reducer';
import { selectRequirement } from '../../store/reducers/selectedRequirement-reducer';

export default function ProductPreview(): ReactElement {
  const dispatch = useDispatch();
  const { id } = useSelector((state: RootState) => state.selectedProject);
  const { list } = useSelector((state: RootState) => state.project);
  const { productId } = useSelector(
    (state: RootState) => state.selectedProduct
  );

  if (!id) {
    return <p>No Project selected</p>;
  }

  if (!productId) {
    return <p>No Product selected</p>;
  }

  const selectedProject = Utils.ensure(
    list.find((bank: Bank) => bank.id === id)
  );

  const selectedProduct = Utils.ensure(
    selectedProject.products.find(
      (product: Product) => product.id === productId
    )
  );

  function findNeedParents(element: Need, parents: Need[]): Need[] {
    const parentList = parents;
    const parentNeed = Utils.ensure(
      selectedProject.needs.find((need: Need) => need.id === element.parent)
    );
    parentList.push(parentNeed);
    if (parentNeed.parent !== '') {
      findNeedParents(parentNeed, parentList);
    }
    return parentList;
  }

  function checkParentInProductList(
    products: string[],
    parentId: string
  ): boolean {
    if (parentId === '') return false;
    const parentProduct = Utils.ensure(
      selectedProject.products.find(
        (product: Product) => product.id === parentId
      )
    );
    if (products.includes(parentId)) {
      return true;
    }

    if (parentProduct.parent !== '') {
      return checkParentInProductList(products, parentProduct.parent);
    }

    return false;
  }

  function findAssociatedRequirements(
    needs: Need[]
  ): [{ [key: string]: Requirement[] }, Need[], RequirementLayout[]] {
    const relevantRequirements: { [key: string]: Requirement[] } = {};
    let needList: Need[] = [];
    const layoutList: RequirementLayout[] = [];
    needs.forEach((element: Need) => {
      element.requirements.forEach((req: Requirement) => {
        req.layouts.forEach((layout: RequirementLayout) => {
          if (
            layout.products.includes(selectedProduct.id) ||
            checkParentInProductList(layout.products, selectedProduct.parent)
          ) {
            layoutList.push(layout);
            if (element.id in relevantRequirements) {
              const prevArray = relevantRequirements[element.id];
              relevantRequirements[element.id] = [...prevArray, req];
              needList.push(element);
              if (
                !needList.some((e) => e.id === element.parent) &&
                element.parent.length > 0
              ) {
                const parentNeed = Utils.ensure(
                  selectedProject.needs.find(
                    (need: Need) => need.id === element.parent
                  )
                );
                needList.push(parentNeed);
              }
            } else {
              relevantRequirements[element.id] = [];
              relevantRequirements[element.id] = [req];
              needList.push(element);
              if (
                !needList.some((e) => e.id === element.parent) &&
                element.parent.length > 0
              ) {
                const parentList = findNeedParents(element, []);
                needList = [...needList, ...parentList];
              }
            }
          }
        });
      });
    });
    return [relevantRequirements, needList, layoutList];
  }

  const [
    associatedRequirements,
    associatedNeeds,
    associatedLayouts
  ] = findAssociatedRequirements(selectedProject.needs);

  const findRequirementText = (layouts: RequirementLayout[]) => {
    const texts = layouts.map((layout: RequirementLayout) => {
      if (associatedLayouts.includes(layout)) {
        if (layout.requirementText.trim().length > 0)
          return { text: layout.requirementText };
      }
      return null;
    });

    const textFiltered = texts.filter((text) => text !== null);

    if (textFiltered.length === 1) {
      return texts[0]?.text;
    }
    let returnText = '';
    textFiltered.forEach((text, index) => {
      if (textFiltered.length - 1 !== index) returnText += `${text?.text}, `;
      else returnText += `${text?.text}`;
    });
    return returnText;
  };

  const requirementList = (requirements: Requirement[], need: Need) => {
    const reqList = requirements.map((element: Requirement) => {
      return (
        <ListGroup.Item key={element.id}>
          <Row className="d-flex justify-content-between mr-2">
            <p className="ml-2 mt-1">
              {element.title}
              <Badge
                className="ml-2"
                variant={
                  element.requirement_Type === 'requirement'
                    ? 'primary'
                    : 'info'
                }
              >
                {Utils.capitalizeFirstLetter(element.requirement_Type)}
              </Badge>
            </p>
            <Link
              to={`/workbench/${id}/requirement/${element.id}/edit`}
              onClick={() => {
                dispatch(selectRequirement(element.id));
                dispatch(selectNeed(need.id));
              }}
            >
              <BsPencil />
            </Link>
          </Row>
          <p>{findRequirementText(element.layouts)}</p>
        </ListGroup.Item>
      );
    });
    return (
      <>
        <ListGroup className="ml-3 mt-3 mb-4">{reqList}</ListGroup>
      </>
    );
  };

  const childrenHierarchy = (listofneed: any[], level: number) => {
    let n = level;
    let children: any;
    const cssClass = `level${n}`;
    let requirements: Requirement[] = [];
    return listofneed.map((element: any) => {
      if (element.children.length > 0) {
        n += 1;
        children = childrenHierarchy(element.children, n);
      }
      if (
        element.id in associatedRequirements &&
        associatedRequirements[element.id].length > 0
      )
        requirements = associatedRequirements[element.id];
      return (
        <div className={` ${styles[cssClass]} pt-0`}>
          <Row>
            <BsArrowReturnRight className="ml-2 mt-1 mr-2" />
            <p>{element.title}</p>
          </Row>
          {requirements.length > 0 && requirementList(requirements, element)}
          {element.children.length > 0 && children}
        </div>
      );
    });
  };

  const needHierarchy = (needsList: Need[]) => {
    const newList = Utils.unflatten(needsList);
    let children: any;
    let requirements: Requirement[] = [];
    const hierarchy = newList.map((element: any) => {
      if (
        element.id in associatedRequirements &&
        associatedRequirements[element.id].length > 0
      )
        requirements = associatedRequirements[element.id];
      if (element.children.length > 0) {
        children = childrenHierarchy(element.children, 1);
      }
      return (
        <>
          <ListGroup.Item className="mt-2 ml-0 pl-0">
            <b>{element.title}</b>
            {requirements.length > 0 && requirementList(requirements, element)}
            {element.children.length > 0 && children}
          </ListGroup.Item>
        </>
      );
    });
    return (
      <ListGroup variant="flush" className="mt-4 ml-0 p-0">
        {hierarchy}
      </ListGroup>
    );
  };

  return (
    <div className="pb-4 ml-3">
      <h3 className="mt-4 mb-4">
        {Utils.capitalizeFirstLetter(selectedProduct.title)}
      </h3>
      {needHierarchy(associatedNeeds)}
    </div>
  );
}
