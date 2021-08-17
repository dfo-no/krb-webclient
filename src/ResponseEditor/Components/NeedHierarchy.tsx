import React, { ReactElement } from 'react';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Row from 'react-bootstrap/esm/Row';
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
}: IProps): ReactElement {
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
      if (!Utils.checkNeed(element, searchList)) return <></>;
      return (
        <div key={element.id} className={` ${styles[cssClass]} pt-0`}>
          <Row>
            <BsArrowReturnRight className="ml-2 mt-1 mr-2" />
            <p>{element.title}</p>
          </Row>
          {element.requirements.length > 0 && (
            <RequirementAnswers
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
    if (!Utils.checkNeed(element, searchList)) return null;
    if (element.children && element.children.length > 0) {
      children = needChildrenHierarchy(element.children, 1);
    }
    return (
      <ListGroup.Item key={element.id} className="mt-2 ml-0 pl-0">
        <b>{element.title}</b>
        {element.requirements.length > 0 && (
          <RequirementAnswers
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
