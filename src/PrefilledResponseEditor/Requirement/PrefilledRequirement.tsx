// import { DevTool } from '@hookform/devtools';
import { get } from 'lodash';
import React from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { FieldError, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Utils from '../../common/Utils';
import ControlledCheckbox from '../../Form/ControlledCheckbox';
import ControlledCodelistSelect from '../../Form/ControlledCodelistSelect';
import ControlledDate from '../../Form/ControlledDate';
import ControlledSlider from '../../Form/ControlledSlider';
import ControlledTextInput from '../../Form/ControlledTextInput';
import ErrorSummary from '../../Form/ErrorSummary';
import {
  ICheckboxAnswer,
  ICheckboxQuestion
} from '../../models/ICheckboxQuestion';
import {
  ICodelistAnswer,
  ICodelistQuestion
} from '../../models/ICodelistQuestion';
import {
  IFileUploadAnswer,
  IFileUploadQuestion
} from '../../models/IFileUploadQuestion';
import {
  IPeriodDateAnswer,
  IPeriodDateQuestion
} from '../../models/IPeriodDateQuestion';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { ISliderAnswer, ISliderQuestion } from '../../models/ISliderQuestion';
import { ITextAnswer, ITextQuestion } from '../../models/ITextQuestion';
import { ITimeAnswer, ITimeQuestion } from '../../models/ITimeQuestion';
import { Levelable } from '../../models/Levelable';
import ModelType from '../../models/ModelType';
import { Need } from '../../models/Need';
import QuestionEnum from '../../models/QuestionEnum';
import { QuestionType } from '../../models/QuestionType';
import { Requirement } from '../../models/Requirement';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setRequirementAnswers } from '../../store/reducers/PrefilledResponseReducer';

interface FormProps {
  cart: IRequirementAnswer[];
}

// TODO: SPlit this in lesser components to support nice UX flow.
export default function PrefilledRequirement(): React.ReactElement {
  const { prefilledResponse } = useAppSelector(
    (state) => state.prefilledResponse
  );

  const generateDefaultValues = (): FormProps => {
    const needs = Utils.parentable2Levelable(prefilledResponse.bank.needs);
    const cartAry: IRequirementAnswer[] = [];
    const result: FormProps = { cart: cartAry };
    needs.forEach((need) => {
      need.requirements.forEach((requirement) => {
        requirement.variants.forEach((variant) => {
          variant.questions.forEach((question) => {
            let questionResult: QuestionType = { ...question };

            if (question.type === QuestionEnum.Q_CHECKBOX) {
              const answer = {
                value: false,
                point: 0
              } as ICheckboxAnswer;
              questionResult = { ...question, answer } as ICheckboxQuestion;
            }
            if (question.type === QuestionEnum.Q_CODELIST) {
              const answer: ICodelistAnswer = { codes: '', point: 0 };
              questionResult = { ...question, answer } as ICodelistQuestion;
            }
            if (question.type === QuestionEnum.Q_PERIOD_DATE) {
              const answer: IPeriodDateAnswer = { date: null, point: 0 };
              questionResult = { ...question, answer } as IPeriodDateQuestion;
            }
            if (question.type === QuestionEnum.Q_SLIDER) {
              const answer: ISliderAnswer = {
                value: question.config.min,
                point: 0
              };
              questionResult = { ...question, answer } as ISliderQuestion;
            }
            if (question.type === QuestionEnum.Q_TEXT) {
              const answer: ITextAnswer = {
                text: '',
                point: 0
              };
              questionResult = { ...question, answer } as ITextQuestion;
            }
            if (question.type === QuestionEnum.Q_TIME) {
              const answer: ITimeAnswer = {
                time: '',
                point: 0
              };
              questionResult = { ...question, answer } as ITimeQuestion;
            }
            if (question.type === QuestionEnum.Q_FILEUPLOAD) {
              const answer: IFileUploadAnswer = {
                file: '',
                point: 0
              };
              questionResult = { ...question, answer } as IFileUploadQuestion;
            }

            const value: IRequirementAnswer = {
              id: requirement.id,
              questionId: question.id,
              weight: 0,
              variantId: variant.id,
              question: questionResult,
              type: ModelType.prefilledResponse,
              requirement
            };
            if (!result.cart.length) {
              result.cart = [];
            }
            result.cart.push(value);
          });
        });
      });
    });
    return result;
  };

  const displayNeeds = Utils.parentable2Levelable(prefilledResponse.bank.needs);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const defaultValues = generateDefaultValues();
  const { handleSubmit, formState, control } = useForm<FormProps>({
    defaultValues
  });

  const { errors } = formState;
  const onSubmit = (post: FormProps) => {
    dispatch(setRequirementAnswers(post));
  };

  const renderQuestion = (question: QuestionType, ix: number) => {
    switch (question.type) {
      case QuestionEnum.Q_CHECKBOX: {
        return (
          <ControlledCheckbox
            name={`cart.${ix}.question.answer.value`}
            control={control}
            error={
              get(errors, `cart.${ix}.question.answer.value`) as FieldError
            }
          />
        );
      }
      case QuestionEnum.Q_CODELIST: {
        const q = question;
        const codelistIndex = prefilledResponse.bank.codelist.findIndex(
          (elem) => elem.id === q.config.codelist
        );
        if (codelistIndex !== -1) {
          return (
            <ControlledCodelistSelect
              name={`cart.${ix}.question.answer.codes`}
              codelist={prefilledResponse.bank.codelist[codelistIndex]}
              control={control}
              error={
                get(errors, `cart.${ix}.question.answer.codes`) as FieldError
              }
            />
          );
        }

        return null;
      }
      case QuestionEnum.Q_FILEUPLOAD: {
        return (
          <ControlledTextInput
            control={control}
            name={`cart.${ix}.question.answer.file`}
            error={get(errors, `cart.${ix}.question.answer.file`) as FieldError}
          />
        );
      }
      case QuestionEnum.Q_PERIOD_DATE: {
        return (
          <ControlledDate
            control={control}
            name={`cart.${ix}.question.answer.date`}
            error={get(errors, `cart.${ix}.question.answer.date`) as FieldError}
            label=""
          />
        );
      }
      case QuestionEnum.Q_SLIDER: {
        return (
          <ControlledSlider
            question={question}
            control={control}
            name={`cart.${ix}.question.answer.value`}
            error={
              get(errors, `cart.${ix}.question.answer.value`) as FieldError
            }
          />
        );
      }
      case QuestionEnum.Q_TEXT: {
        return (
          <ControlledTextInput
            control={control}
            name={`cart.${ix}.question.answer.text`}
            error={get(errors, `cart.${ix}.question.answer.text`) as FieldError}
          />
        );
      }
      case QuestionEnum.Q_TIME: {
        return (
          <ControlledTextInput
            control={control}
            name={`cart.${ix}.question.answer.time`}
            error={get(errors, `cart.${ix}.question.answer.time`) as FieldError}
          />
        );
      }
      default: {
        return <p>Error, not question type matches</p>;
      }
    }
  };

  let i = -1;
  const renderRequirements = (requirements: Requirement[]) => {
    return requirements.map((requirement) => {
      return requirement.variants.map((variant) => {
        return variant.questions.map((question) => {
          i += 1;
          return (
            <Card key={question.id}>
              <Card.Header>{t(question.type)}</Card.Header>
              <Card.Body>{renderQuestion(question, i)}</Card.Body>
            </Card>
          );
        });
      });
    });
  };

  const renderNeeds = (needs: Levelable<Need>[]) => {
    return needs.map((need) => {
      return (
        <ListGroup.Item key={need.id}>
          <Row>
            <Col xs={{ span: 12 - (need.level - 1), offset: need.level - 1 }}>
              <b>{need.title}</b>
              {renderRequirements(need.requirements)}
            </Col>
          </Row>
        </ListGroup.Item>
      );
    });
  };

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ListGroup>{renderNeeds(displayNeeds)}</ListGroup>

        <ErrorSummary errors={errors} />
        <Button type="submit">{t('save')}</Button>
      </Form>
      {/* <DevTool control={control} /> */}
    </Container>
  );
}
