import { DevTool } from '@hookform/devtools';
import React from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
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
  IPeriodDateAnswer,
  IPeriodDateQuestion
} from '../../models/IPeriodDateQuestion';
import { ISliderAnswer, ISliderQuestion } from '../../models/ISliderQuestion';
import { ITextAnswer, ITextQuestion } from '../../models/ITextQuestion';
import { ITimeAnswer, ITimeQuestion } from '../../models/ITimeQuestion';
import ModelType from '../../models/ModelType';
import { Need } from '../../models/Need';
import QuestionEnum from '../../models/QuestionEnum';
import { Requirement } from '../../models/Requirement';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addRequirementAnswer,
  setRequirementAnswers
} from '../../store/reducers/PrefilledResponseReducer';

export default function PrefilledRequirement(): React.ReactElement {
  const { prefilledResponse } = useAppSelector(
    (state) => state.prefilledResponse
  );

  const generateDefaultValues = () => {
    const needs = Utils.parentable2Levelable(prefilledResponse.bank.needs);
    const cartAry: any[] = [];
    const result = { cart: cartAry };
    needs.forEach((need) => {
      need.requirements.forEach((requirement) => {
        requirement.variants.forEach((variant) => {
          variant.questions.forEach((question) => {
            let questionResult = { ...question };

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

            const value = {
              id: uuidv4(),
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
  const { handleSubmit, formState, control } = useForm({
    defaultValues
  });

  const { errors } = formState;
  const onSubmit = (post: any) => {
    dispatch(setRequirementAnswers(post));
  };

  const renderQuestion = (question: any, ix: number) => {
    switch (question.type) {
      case QuestionEnum.Q_CHECKBOX: {
        return (
          <ControlledCheckbox
            name={`cart.${ix}.question.answer.value`}
            control={control}
            error={undefined}
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
              error={undefined}
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
            error={undefined}
          />
        );
      }
      case QuestionEnum.Q_PERIOD_DATE: {
        return (
          <ControlledDate
            control={control}
            name={`cart.${ix}.question.answer.date`}
            error={undefined}
          />
        );
      }
      case QuestionEnum.Q_SLIDER: {
        return (
          <ControlledSlider
            question={question}
            control={control}
            name={`cart.${ix}.question.answer.value`}
            error={undefined}
          />
        );
      }
      case QuestionEnum.Q_TEXT: {
        return (
          <ControlledTextInput
            control={control}
            name={`cart.${ix}.question.answer.text`}
            error={undefined}
          />
        );
      }
      case QuestionEnum.Q_TIME: {
        return (
          <ControlledTextInput
            control={control}
            name={`cart.${ix}.question.answer.time`}
            error={undefined}
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

  const renderNeeds = (needs: Need[]) => {
    return needs.map((need) => {
      return (
        <ListGroup.Item key={need.id}>
          <b>{need.title}</b>
          {renderRequirements(need.requirements)}
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
      <DevTool control={control} />
    </Container>
  );
}
