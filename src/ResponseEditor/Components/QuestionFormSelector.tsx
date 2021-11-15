import React from 'react';
import Card from 'react-bootstrap/Card';
import { IRequirement } from '../../models/IRequirement';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import QuestionEnum from '../../models/QuestionEnum';
import RequirementType from '../../models/RequirementType';
import CheckBoxInfo from '../InfoanswerFields/CheckBoxInfo';
import CodelistInfo from '../InfoanswerFields/CodelistInfo';
import DateInfo from '../InfoanswerFields/DateInfo';
import SliderInfo from '../InfoanswerFields/SliderInfo';
import TextInfo from '../InfoanswerFields/TextInfo';
import ICheckBoxAnswer from '../QuestionAnswerForms/ICheckBoxAnswer';
import ICodelistAnswer from '../QuestionAnswerForms/ICodeListAnswer';
import PeriodDateAnswer from '../QuestionAnswerForms/IPeriodDateAnswer';
import ISliderAnswer from '../QuestionAnswerForms/ISliderAnswer';
import ITextAnswer from '../QuestionAnswerForms/TextAnswerForm';

interface IProps {
  selectedAnswer: IRequirementAnswer;
  req: IRequirement;
  requirementText: string;
}

export default function QuestionFormSelector({
  selectedAnswer,
  req,
  requirementText
}: IProps): React.ReactElement {
  return (
    <div key={selectedAnswer.id}>
      {req.requirement_Type === RequirementType.requirement && (
        <Card key={req.id} className="ml-3 mb-3">
          <Card.Body>{requirementText}</Card.Body>
          {selectedAnswer.question.type === QuestionEnum.Q_SLIDER && (
            <ISliderAnswer
              key={selectedAnswer.id}
              parentAnswer={selectedAnswer}
            />
          )}
          {selectedAnswer.question.type === QuestionEnum.Q_TEXT && (
            <ITextAnswer
              key={selectedAnswer.id}
              parentAnswer={selectedAnswer}
            />
          )}
          {selectedAnswer.question.type === QuestionEnum.Q_CHECKBOX && (
            <ICheckBoxAnswer
              key={selectedAnswer.id}
              parentAnswer={selectedAnswer}
            />
          )}
          {selectedAnswer.question.type === QuestionEnum.Q_CODELIST && (
            <ICodelistAnswer
              key={selectedAnswer.id}
              parentAnswer={selectedAnswer}
            />
          )}
          {selectedAnswer.question.type === QuestionEnum.Q_PERIOD_DATE && (
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
        req.variants[0].questions[0].type === QuestionEnum.Q_PERIOD_DATE && (
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
    </div>
  );
}
