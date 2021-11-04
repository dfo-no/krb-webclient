import React from 'react';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { BsArrowReturnRight } from 'react-icons/bs';
import Utils from '../../common/Utils';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { Need } from '../../models/Need';
import { Nestable } from '../../models/Nestable';
import styles from '../Requirement/RequirementView.module.scss';
import RequirementAnswers from './RequirementAnswers';

interface IProps {
  needs: Nestable<Need>[];
  searchList: string[];
  specificationSearchList: IRequirementAnswer[];
  responseSearchList: IRequirementAnswer[];
}

export default function NeedHierarchy({
  needs,
  searchList,
  specificationSearchList,
  responseSearchList
}: IProps): React.ReactElement {
  const needChildrenHierarchy = (
    listofneed: Nestable<Need>[],
    level: number
  ) => {
    let n = level;
    let children: JSX.Element[];
    const cssClass = `level${n}`;
    return listofneed.map((element) => {
      if (element.children && element.children.length > 0) {
        n += 1;
        children = needChildrenHierarchy(element.children, n);
      }
      if (!Utils.checkIfNeedHasSelectedRequirements(element, searchList))
        return <div key={element.id} />;
      return (
        <div key={element.id} className={` ${styles[cssClass]} pt-0`}>
          <Row>
            <Col className="d-flex justify-content-start">
              <BsArrowReturnRight className="ml-2 mt-1 mr-2" />
              <p>{element.title}</p>
            </Col>
          </Row>
          {element.requirements.length > 0 && (
            <RequirementAnswers
              key={element.id}
              specificationSearchList={specificationSearchList}
              responseSearchList={responseSearchList}
              requirementSearchList={searchList}
              requirementArray={element.requirements}
            />
          )}
          {element.children && element.children.length > 0 && children}
        </div>
      );
    });
  };

  const newList = Utils.unflatten(needs)[0];
  let children: JSX.Element[];
  const hierarchy = newList.map((element) => {
    if (!Utils.checkIfNeedHasSelectedRequirements(element, searchList))
      return null;
    if (element.children && element.children.length > 0) {
      children = needChildrenHierarchy(element.children, 1);
    }
    return (
      <ListGroup.Item key={element.id} className="mt-2 ml-0 pl-0">
        <b>{element.title}</b>
        {element.requirements.length > 0 && (
          <RequirementAnswers
            key={element.id}
            specificationSearchList={specificationSearchList}
            responseSearchList={responseSearchList}
            requirementSearchList={searchList}
            requirementArray={element.requirements}
          />
        )}
        {element.children && element.children.length > 0 && children}
      </ListGroup.Item>
    );
  });
  return (
    <ListGroup variant="flush" className="mt-4 ml-0 p-0">
      {hierarchy}
    </ListGroup>
  );
}
