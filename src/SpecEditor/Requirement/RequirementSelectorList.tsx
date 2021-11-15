import React from 'react';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { BsArrowReturnRight } from 'react-icons/bs';
import Utils from '../../common/Utils';
import { INeed } from '../../models/INeed';
import { Nestable } from '../../models/Nestable';
import { Requirement } from '../../models/Requirement';
import { useAppSelector } from '../../store/hooks';
import styles from './RequirementSelectorList.module.scss';
import SpesificationRequirement from './SpesificationRequirement';

interface InputProps {
  needList: Nestable<INeed>[];
}

export default function RequirementSelectorList({
  needList
}: InputProps): React.ReactElement {
  const { spec } = useAppSelector((state) => state.specification);
  const checkIfReqHasVariantMatch = (req: Requirement): boolean => {
    let found = false;
    req.variants.forEach((variant) => {
      if (variant.useSpesification === true) {
        found = true;
      }
    });

    return found;
  };

  function checkIfNeedHasChildWithRequirements(
    listofneed: Nestable<INeed>[]
  ): boolean {
    let foundMatch = false;
    listofneed.forEach((element) => {
      if (element.requirements.length > 0) {
        element.requirements.forEach((requirement) => {
          if (checkIfReqHasVariantMatch(requirement)) {
            foundMatch = true;
          }
        });
      }
      if (element.children && element.children.length > 0) {
        return checkIfNeedHasChildWithRequirements(element.children);
      }
      return foundMatch;
    });
    return foundMatch;
  }

  function checkNeed(element: Nestable<INeed>): boolean {
    let found = false;
    if (element.requirements.length > 0) {
      element.requirements.forEach((requirement) => {
        if (checkIfReqHasVariantMatch(requirement)) {
          found = true;
        }
      });
    }
    if (element.children && element.children.length > 0 && !found) {
      found = checkIfNeedHasChildWithRequirements(element.children);
    }
    return found;
  }

  const requirementsAnswers = (requirementArray: Requirement[]) => {
    return requirementArray.map((req) => {
      const selected = !!spec.requirements.includes(req.id);
      if (checkIfReqHasVariantMatch(req)) {
        return (
          <SpesificationRequirement
            key={req.id}
            selected={selected}
            requirement={req}
          />
        );
      }
      return null;
    });
  };
  const childrenHierarchy = (listofneed: Nestable<INeed>[], level: number) => {
    let n = level;
    let children: JSX.Element[];
    const cssClass = `level${n}`;
    return listofneed.map((element) => {
      if (element.children && element.children.length > 0) {
        n += 1;
        children = childrenHierarchy(element.children, n);
      }
      if (!checkNeed(element)) return <></>;
      return (
        <div key={element.id} className={` ${styles[cssClass]} pt-0`}>
          <Row>
            <Col className="d-flex justify-content-start">
              <BsArrowReturnRight className="ml-2 mt-1 mr-2" />
              <p>{element.title}</p>
            </Col>
          </Row>
          {element.requirements.length > 0 &&
            requirementsAnswers(element.requirements)}
          {element.children && element.children.length > 0 && children}
        </div>
      );
    });
  };

  const needHierarchy = (needsList: Nestable<INeed>[]) => {
    const newList = Utils.unflatten(needsList)[0];
    let children: JSX.Element[];
    return newList.map((element) => {
      if (!checkNeed(element)) return null;
      if (element.children && element.children.length > 0) {
        children = childrenHierarchy(element.children, 1);
      }
      return (
        <ListGroup.Item key={element.id} className="mt-2 ml-0 pl-0">
          <b>{element.title}</b>
          {element.requirements.length > 0 &&
            requirementsAnswers(element.requirements)}
          {element.children && element.children.length > 0 && children}
        </ListGroup.Item>
      );
    });
  };

  return (
    <ListGroup variant="flush" className="mt-4 ml-0 p-0">
      {needHierarchy(needList)}
    </ListGroup>
  );
}
