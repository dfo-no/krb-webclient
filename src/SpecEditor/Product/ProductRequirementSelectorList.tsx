import React from 'react';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { BsArrowReturnRight } from 'react-icons/bs';
import Utils from '../../common/Utils';
import { IBank } from '../../models/IBank';
import { INeed } from '../../models/INeed';
import { Nestable } from '../../models/Nestable';
import { IRequirement } from '../../models/Requirement';
import { SpecificationProduct } from '../../models/SpecificationProduct';
import styles from './ProductSpecEditor.module.scss';
import ProductSpesificationRequirement from './ProductSpecificationRequirement';

interface InputProps {
  selectedBank: IBank;
  product: SpecificationProduct;
}

export default function ProductRequirementSelectorList({
  selectedBank,
  product
}: InputProps): React.ReactElement {
  const requirementsAnswers = (requirementArray: IRequirement[]) => {
    return requirementArray.map((req) => {
      const selected = !!product.requirements.includes(req.id);
      return (
        <ProductSpesificationRequirement
          key={req.id}
          selected={selected}
          requirement={req}
          productId={product.id}
        />
      );
    });
  };

  const [associatedRequirements, associatedNeeds] =
    Utils.findAssociatedRequirements(product.originProduct, selectedBank);
  const childrenHierarchy = (listOfNeed: Nestable<INeed>[], level: number) => {
    let n = level;
    let children: JSX.Element[];
    const cssClass = `level${n}`;
    let requirementsArray: IRequirement[] = [];
    return listOfNeed.map((element) => {
      if (element.children && element.children.length > 0) {
        n += 1;
        children = childrenHierarchy(element.children, n);
      }
      if (
        element.id in associatedRequirements &&
        associatedRequirements[element.id].length > 0
      )
        requirementsArray = associatedRequirements[element.id];
      return (
        <div className={` ${styles[cssClass]} pt-0`} key={element.id}>
          <Row>
            <Col className="d-flex justify-content-start">
              <BsArrowReturnRight className="ml-2 mt-1 mr-2" />
              <p>{element.title}</p>
            </Col>
          </Row>
          {requirementsArray.length > 0 &&
            requirementsAnswers(requirementsArray)}
          {element.children && element.children.length > 0 && children}
        </div>
      );
    });
  };

  const needHierarchy = (needsList: Nestable<INeed>[]) => {
    const newList = Utils.unflatten(needsList)[0];
    let children: JSX.Element[];
    let requirementsArray: IRequirement[] = [];
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
        <ListGroup.Item className="mt-2 ml-0 pl-0" key={element.id}>
          <b>{element.title}</b>
          {requirementsArray.length > 0 &&
            requirementsAnswers(requirementsArray)}
          {element.children && element.children.length > 0 && children}
        </ListGroup.Item>
      );
    });
    return (
      <ListGroup variant="flush" className="mt-4 ml-0 p-0 w-100">
        {hierarchy}
      </ListGroup>
    );
  };

  return <>{needHierarchy(associatedNeeds)}</>;
}
