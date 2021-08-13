import React, { ReactElement } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { BsArrowReturnRight } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import Utils from '../../common/Utils';
import { Bank } from '../../models/Bank';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { Need } from '../../models/Need';
import { Nestable } from '../../models/Nestable';
import { Requirement } from '../../models/Requirement';
import { RootState } from '../../store/store';
import QuestionFormSelector from './Components/QuestionFormSelector';
import styles from './RequirementView.module.scss';

export default function RequirementPage(): ReactElement {
  const { response } = useSelector((state: RootState) => state.response);
  const { list } = useSelector((state: RootState) => state.bank);
  const { id } = useSelector((state: RootState) => state.selectedBank);

  const selectedBank = Utils.ensure(list.find((bank: Bank) => bank.id === id));

  function checkIfNeedHasChildWithRequirements(
    listofneed: Nestable<Need>[]
  ): boolean {
    let foundMatch = false;
    listofneed.forEach((element) => {
      if (element.requirements.length > 0) {
        element.requirements.forEach((requirement) => {
          if (response.spesification.requirements.includes(requirement.id))
            foundMatch = true;
        });
        return foundMatch;
      }
      if (element.children && element.children.length > 0) {
        return checkIfNeedHasChildWithRequirements(element.children);
      }
      return foundMatch;
    });
    return foundMatch;
  }

  function checkNeed(element: Nestable<Need>): boolean {
    let used = false;
    if (element.requirements.length > 0) {
      element.requirements.forEach((requirement) => {
        if (response.spesification.requirements.includes(requirement.id))
          used = true;
      });
    }
    if (element.children && element.children.length > 0 && !used) {
      used = checkIfNeedHasChildWithRequirements(element.children);
    }
    return used;
  }
  const requirementsAnswers = (requirementArray: Requirement[]) => {
    if (response.spesification.requirementAnswers.length < 1) return null;
    return requirementArray.map((req) => {
      const selected = !!response.spesification.requirements.includes(req.id);
      if (selected) {
        let requirementText = '';
        let selectedAnswer: IRequirementAnswer =
          response.spesification.requirementAnswers[0];
        req.variants.forEach((variant) => {
          if (
            response.requirementAnswers.find(
              (answer) => answer.variantId === variant.id
            )
          ) {
            const index = response.requirementAnswers.findIndex(
              (answer) => answer.variantId === variant.id
            );
            selectedAnswer = response.requirementAnswers[index];
            requirementText = variant.requirementText;
          } else if (
            response.spesification.requirementAnswers.find(
              (answer) => answer.variantId === variant.id
            )
          ) {
            requirementText = variant.requirementText;
            const index = response.spesification.requirementAnswers.findIndex(
              (answer) => answer.variantId === variant.id
            );
            selectedAnswer = response.spesification.requirementAnswers[index];
          }
        });
        if (selectedAnswer !== undefined) {
          return (
            <QuestionFormSelector
              selectedAnswer={selectedAnswer}
              requirementText={requirementText}
              req={req}
            />
          );
        }
        return null;
      }
      return null;
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
      if (!checkNeed(element)) return <></>;
      return (
        <div key={element.id} className={` ${styles[cssClass]} pt-0`}>
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
    return (
      <ListGroup variant="flush" className="mt-4 ml-0 p-0">
        {hierarchy}
      </ListGroup>
    );
  };

  return <>{needHierarchy(selectedBank.needs)}</>;
}
