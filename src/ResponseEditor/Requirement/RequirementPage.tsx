import React, { ReactElement } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { BsArrowReturnRight } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import Utils from '../../common/Utils';
import { Bank } from '../../models/Bank';
import { Need } from '../../models/Need';
import { Nestable } from '../../models/Nestable';
import { Requirement } from '../../models/Requirement';
import { RootState } from '../../store/store';
import styles from './RequirementView.module.scss';

export default function RequirementPage(): ReactElement {
  const { response } = useSelector((state: RootState) => state.response);
  const { list } = useSelector((state: RootState) => state.bank);
  const { id } = useSelector((state: RootState) => state.selectedBank);

  const selectedBank = Utils.ensure(list.find((bank: Bank) => bank.id === id));
  const requirementsAnswers = (requirementArray: Requirement[]) => {
    return requirementArray.map((req) => {
      const selected = !!response.spesification.requirements.includes(req.id);
      if (selected) {
        return (
          <Card className="ml-3 mb-3">
            <Card.Body>Requirement response field</Card.Body>
          </Card>
        );
      }
      return <></>;
    });
  };
  const childrenHierarchy = (listofneed: Nestable<Need>[], level: number) => {
    let n = level;
    let children: JSX.Element[];
    const cssClass = `level${n}`;
    return listofneed.map((element) => {
      if (element.children && element.children.length > 0) {
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
        <>
          <ListGroup.Item key={element.id} className="mt-2 ml-0 pl-0">
            <b>{element.title}</b>
            {element.requirements.length > 0 &&
              requirementsAnswers(element.requirements)}
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

  return <>{needHierarchy(selectedBank.needs)}</>;
}
