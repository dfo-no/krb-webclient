import React, { ReactElement, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { BsArrowReturnRight } from 'react-icons/bs';
import Utils from '../../common/Utils';
import { Need } from '../../models/Need';
import { Nestable } from '../../models/Nestable';
import { Requirement } from '../../models/Requirement';
import RequirementAnswer from './RequirementAnswer';
import styles from './RequirementView.module.scss';

interface InputProps {
  needList: Nestable<Need>[];
  // eslint-disable-next-line react/require-default-props
  requirementList?: Requirement[];
}

export default function RequirementView({
  needList,
  requirementList = []
}: InputProps): ReactElement {
  const [reqs, setReqs] = useState();
  const requirements = (requirementArray: Requirement[]) => {
    return requirementArray.map((req) => {
      return <RequirementAnswer key={req.id} requirement={req} />;
    });
  };

  const childrenHierarchy = (listOfNeed: Nestable<Need>[], level: number) => {
    let n = level;
    let children: JSX.Element[];
    const cssClass = `level${n}`;
    return listOfNeed.map((element) => {
      if (element.children && element.children.length > 0) {
        n += 1;
        children = childrenHierarchy(element.children, n);
      }
      return (
        <div key={element.id} className={` ${styles[cssClass]} pt-0`}>
          <Row>
            <BsArrowReturnRight className="ml-2 mt-1 mr-2" />
            <p>{element.title}</p>
          </Row>
          {element.requirements.length > 0 &&
            requirements(element.requirements)}
          {element.children && element.children.length > 0 && children}
        </div>
      );
    });
  };

  const needHierarchy = (needsList: Nestable<Need>[]) => {
    const newList = Utils.unflatten(needsList)[0];
    let children: JSX.Element[];
    const hierarchy = newList.map((element) => {
      if (element.children && element.children.length > 0) {
        children = childrenHierarchy(element.children, 1);
      }
      return (
        <ListGroup.Item key={element.id} className="mt-2 ml-0 pl-0">
          <b>{element.title}</b>
          {element.requirements.length > 0 &&
            requirements(element.requirements)}
          {element.children && element.children.length > 0 && children}
        </ListGroup.Item>
      );
    });
    return (
      <ListGroup variant="flush" className="mt-4 ml-0 p-0">
        {hierarchy}
      </ListGroup>
    );
  };

  return <>{needHierarchy(needList)}</>;
}
