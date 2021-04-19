import React, { ReactElement } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { BsArrowReturnRight } from 'react-icons/bs';
import Utils from '../../common/Utils';
import { Need } from '../../models/Need';
import { Bank } from '../../models/Bank';
import { Requirement } from '../../models/Requirement';
import styles from './RequirementView.module.scss';
import { SpecificationProduct } from '../../models/SpecificationProduct';
import ProductSpesificationRequirement from './ProductSpecificationRequirement';
import { Nestable } from '../models/Nestable';

interface InputProps {
  selectedBank: Bank;
  product: SpecificationProduct;
}

export default function ProductRequirementSelectorList({
  selectedBank,
  product
}: InputProps): ReactElement {
  const requirementsAnswers = (requirementArray: Requirement[]) => {
    return requirementArray.map((req) => {
      const selected = !!product.requirements.includes(req.id);
      return (
        <ProductSpesificationRequirement
          selected={selected}
          requirement={req}
          productId={product.id}
        />
      );
    });
  };

  const [
    associatedRequirements,
    associatedNeeds
  ] = Utils.findAssociatedRequirements(product.originProduct, selectedBank);
  const childrenHierarchy = (listOfNeed: any[], level: number) => {
    let n = level;
    let children: JSX.Element[];
    const cssClass = `level${n}`;
    let requirementsArray: Requirement[] = [];
    return listOfNeed.map((element: any) => {
      if (element.children.length > 0) {
        n += 1;
        children = childrenHierarchy(element.children, n);
      }
      if (
        element.id in associatedRequirements &&
        associatedRequirements[element.id].length > 0
      )
        requirementsArray = associatedRequirements[element.id];
      return (
        <div className={` ${styles[cssClass]} pt-0`}>
          <Row>
            <BsArrowReturnRight className="ml-2 mt-1 mr-2" />
            <p>{element.title}</p>
          </Row>
          {requirementsArray.length > 0 &&
            requirementsAnswers(requirementsArray)}
          {element.children.length > 0 && children}
        </div>
      );
    });
  };

  const needHierarchy = (needsList: Nestable<Need>[]) => {
    const newList = Utils.unflatten(needsList)[0];
    let children: JSX.Element[];
    let requirementsArray: Requirement[] = [];
    const hierarchy = newList.map((element) => {
      if (
        element.id in associatedRequirements &&
        associatedRequirements[element.id].length > 0
      )
        requirementsArray = associatedRequirements[element.id];
      if (element.children && element.children.length > 0) {
        children = childrenHierarchy(element.children, 1);
      }
      return (
        <>
          <ListGroup.Item className="mt-2 ml-0 pl-0">
            <b>{element.title}</b>
            {requirementsArray.length > 0 &&
              requirementsAnswers(requirementsArray)}
            {element.children && element.children.length > 0 && children}
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

  return <>{needHierarchy(associatedNeeds)}</>;
}
