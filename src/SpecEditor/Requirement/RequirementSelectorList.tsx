import React, { ReactElement } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { BsArrowReturnRight } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import Utils from '../../common/Utils';
import { Need } from '../../models/Need';
import { Requirement } from '../../models/Requirement';
import { RootState } from '../../store/store';
import styles from './RequirementView.module.scss';
import SpesificationRequirement from './SpesificationRequirement';

interface InputProps {
  needList: Need[];
}

export default function RequirementView({
  needList
}: InputProps): ReactElement {
  const { spec } = useSelector((state: RootState) => state.specification);
  const requirementsAnswers = (requirementArray: Requirement[]) => {
    return requirementArray.map((req) => {
      const selected = !!spec.requirements.includes(req.id);
      return (
        <SpesificationRequirement
          key={req.id}
          selected={selected}
          requirement={req}
        />
      );
    });
  };
  const childrenHierarchy = (listofneed: any[], level: number) => {
    let n = level;
    let children: any;
    const cssClass = `level${n}`;
    return listofneed.map((element: any) => {
      if (element.children.length > 0) {
        n += 1;
        children = childrenHierarchy(element.children, n);
      }
      return (
        <div className={` ${styles[cssClass]} pt-0`}>
          <Row>
            <BsArrowReturnRight className="ml-2 mt-1 mr-2" />
            <p>{element.title}</p>
          </Row>
          {element.requirements.length > 0 &&
            requirementsAnswers(element.requirements)}
          {element.children.length > 0 && children}
        </div>
      );
    });
  };

  const needHierarchy = (needsList: Need[]) => {
    const newList = Utils.unflatten(needsList)[0];
    let children: any;
    const hierarchy = newList.map((element: any) => {
      if (element.children.length > 0) {
        children = childrenHierarchy(element.children, 1);
      }
      return (
        <>
          <ListGroup.Item className="mt-2 ml-0 pl-0">
            <b>{element.title}</b>
            {element.requirements.length > 0 &&
              requirementsAnswers(element.requirements)}
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

  return <>{needHierarchy(needList)}</>;
}
