import React, { ReactElement } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { BsArrowReturnRight } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import Utils from '../../common/Utils';
import { Bank } from '../../models/Bank';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { Need } from '../../models/Need';
import { Nestable } from '../../models/Nestable';
import QuestionEnum from '../../models/QuestionEnum';
import { Requirement } from '../../models/Requirement';
import RequirementType from '../../models/RequirementType';
import { ResponseProduct } from '../../models/ResponseProduct';
import { SpecificationProduct } from '../../models/SpecificationProduct';
import { RootState } from '../../store/store';
import ICheckBoxAnswer from '../AlternativeAnswerForms/ICheckBoxAnswer';
import ICodelistAnswer from '../AlternativeAnswerForms/ICodeListAnswer';
import PeriodDateAnswer from '../AlternativeAnswerForms/IPeriodDateAnswer';
import ISliderAnswer from '../AlternativeAnswerForms/ISliderAnswer';
import ITextAnswer from '../AlternativeAnswerForms/TextAnswerForm';
import CheckBoxInfo from '../InfoanswerFields/CheckBoxInfo';
import CodelistInfo from '../InfoanswerFields/CodelistInfo';
import DateInfo from '../InfoanswerFields/DateInfo';
import SliderInfo from '../InfoanswerFields/SliderInfo';
import TextInfo from '../InfoanswerFields/TextInfo';
import styles from '../Requirement/RequirementView.module.scss';

interface InputProps {
  product: SpecificationProduct;
}

export default function ResponseProductRequirementSelector({
  product
}: InputProps): ReactElement {
  const { response } = useSelector((state: RootState) => state.response);
  const { list } = useSelector((state: RootState) => state.bank);
  const { id } = useSelector((state: RootState) => state.selectedBank);

  const selectedBank = Utils.ensure(list.find((bank: Bank) => bank.id === id));
  const productIndex = Utils.ensure(
    response.spesification.products.findIndex(
      (specProduct: SpecificationProduct) => specProduct.id === product.id
    )
  );

  const responseProductIndex = response.products.findIndex(
    (responseProduct: ResponseProduct) =>
      responseProduct.originProduct.id === product.id
  );
  function checkIfNeedHasChildWithRequirements(
    listofneed: Nestable<Need>[]
  ): boolean {
    let foundMatch = false;
    listofneed.forEach((element) => {
      if (element.requirements.length > 0) {
        element.requirements.forEach((requirement) => {
          if (
            response.spesification.products[productIndex].requirements.includes(
              requirement.id
            )
          )
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
        if (
          response.spesification.products[productIndex].requirements.includes(
            requirement.id
          )
        )
          used = true;
      });
    }
    if (element.children && element.children.length > 0 && !used) {
      used = checkIfNeedHasChildWithRequirements(element.children);
    }
    return used;
  }
  const requirementsAnswers = (requirementArray: Requirement[]) => {
    return requirementArray.map((req) => {
      const selected = !!response.spesification.products[
        productIndex
      ].requirements.includes(req.id);
      if (selected) {
        let requirementText;
        let selectedAnswer: IRequirementAnswer =
          response.spesification.products[productIndex].requirementAnswers[0];
        req.variants.forEach((variant) => {
          if (
            response.products[responseProductIndex].requirementAnswers.find(
              (answer) => answer.reqTextId === variant.id
            )
          ) {
            const index = response.products[
              responseProductIndex
            ].requirementAnswers.findIndex(
              (answer) => answer.reqTextId === variant.id
            );
            selectedAnswer =
              response.products[responseProductIndex].requirementAnswers[index];
            requirementText = variant.requirementText;
          } else {
            if (
              response.spesification.products[
                productIndex
              ].requirementAnswers.find(
                (answer) => answer.reqTextId === variant.id
              )
            )
              requirementText = variant.requirementText;
            const index = response.spesification.products[
              productIndex
            ].requirementAnswers.findIndex(
              (answer) => answer.reqTextId === variant.id
            );
            selectedAnswer =
              response.spesification.products[productIndex].requirementAnswers[
                index
              ];
          }
        });
        return (
          <>
            {req.requirement_Type === RequirementType.requirement && (
              <Card key={req.id} className="ml-3 mb-3">
                <Card.Body>{requirementText}</Card.Body>
                {selectedAnswer.alternative.type === QuestionEnum.Q_SLIDER && (
                  <ISliderAnswer
                    key={selectedAnswer.id}
                    parentAnswer={selectedAnswer}
                  />
                )}
                {selectedAnswer.alternative.type === QuestionEnum.Q_TEXT && (
                  <ITextAnswer
                    key={selectedAnswer.id}
                    parentAnswer={selectedAnswer}
                  />
                )}
                {selectedAnswer.alternative.type ===
                  QuestionEnum.Q_CHECKBOX && (
                  <ICheckBoxAnswer
                    key={selectedAnswer.id}
                    parentAnswer={selectedAnswer}
                  />
                )}
                {selectedAnswer.alternative.type ===
                  QuestionEnum.Q_CODELIST && (
                  <ICodelistAnswer
                    key={selectedAnswer.id}
                    parentAnswer={selectedAnswer}
                  />
                )}
                {selectedAnswer.alternative.type ===
                  QuestionEnum.Q_PERIOD_DATE && (
                  <PeriodDateAnswer
                    key={selectedAnswer.id}
                    parentAnswer={selectedAnswer}
                  />
                )}
              </Card>
            )}
            {req.requirement_Type === RequirementType.info &&
              req.variants[0].questions[0].type === QuestionEnum.Q_SLIDER && (
                <SliderInfo
                  parent_requirement={req}
                  answer={selectedAnswer}
                  key={selectedAnswer.id}
                />
              )}
            {req.requirement_Type === RequirementType.info &&
              req.variants[0].questions[0].type ===
                QuestionEnum.Q_PERIOD_DATE && (
                <DateInfo
                  parent_requirement={req}
                  answer={selectedAnswer}
                  key={selectedAnswer.id}
                />
              )}
            {req.requirement_Type === RequirementType.info &&
              req.variants[0].questions[0].type === QuestionEnum.Q_CHECKBOX && (
                <CheckBoxInfo
                  parent_requirement={req}
                  answer={selectedAnswer}
                  key={selectedAnswer.id}
                />
              )}
            {req.requirement_Type === RequirementType.info &&
              req.variants[0].questions[0].type === QuestionEnum.Q_CODELIST && (
                <CodelistInfo
                  parent_requirement={req}
                  answer={selectedAnswer}
                  key={selectedAnswer.id}
                />
              )}
            {req.requirement_Type === RequirementType.info &&
              req.variants[0].questions[0].type === QuestionEnum.Q_TEXT && (
                <TextInfo
                  parent_requirement={req}
                  answer={selectedAnswer}
                  key={selectedAnswer.id}
                />
              )}
          </>
        );
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
      if (!checkNeed(element)) return <> </>;
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
