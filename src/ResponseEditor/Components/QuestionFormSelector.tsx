import React from 'react';
import Card from 'react-bootstrap/Card';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import QuestionEnum from '../../models/QuestionEnum';
import RequirementType from '../../models/RequirementType';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { useAppSelector } from '../../store/hooks';
import CheckBoxInfo from '../InfoQuestionFields/CheckBoxInfo';
import CodelistInfo from '../InfoQuestionFields/CodelistInfo';
import DateInfo from '../InfoQuestionFields/DateInfo';
import FileUploadInfo from '../InfoQuestionFields/FileUploadInfo';
import SliderInfo from '../InfoQuestionFields/SliderInfo';
import TextInfo from '../InfoQuestionFields/TextInfo';
import TimeInfo from '../InfoQuestionFields/TimeInfo';
import FileUploadAnswerForm from '../QuestionAnswerForms/FileUploadAnswerForm';
import ICheckBoxAnswerForm from '../QuestionAnswerForms/ICheckBoxAnswerForm';
import ICodelistAnswerForm from '../QuestionAnswerForms/ICodeListAnswerForm';
import PeriodDateAnswerForm from '../QuestionAnswerForms/IPeriodDateAnswerForm';
import ISliderAnswerForm from '../QuestionAnswerForms/ISliderAnswerForm';
import ITextAnswerForm from '../QuestionAnswerForms/TextAnswerForm';
import TimeAnswerForm from '../QuestionAnswerForms/TimeForm';

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
  const { markedRequirements } = useAppSelector(
    (state) => state.uploadedResponse
  );
  return (
    <div key={selectedAnswer.id}>
      {req.requirement_Type === RequirementType.requirement && (
        <Card key={req.id} className="ml-3 mb-3">
          <Card.Body>
            {requirementText}{' '}
            {markedRequirements.includes(selectedAnswer.questionId) && (
              <BsFillExclamationTriangleFill />
            )}
          </Card.Body>
          {selectedAnswer.question.type === QuestionEnum.Q_SLIDER && (
            <ISliderAnswerForm
              key={selectedAnswer.id}
              parentAnswer={selectedAnswer}
            />
          )}
          {selectedAnswer.question.type === QuestionEnum.Q_TEXT && (
            <ITextAnswerForm
              key={selectedAnswer.id}
              parentAnswer={selectedAnswer}
            />
          )}
          {selectedAnswer.question.type === QuestionEnum.Q_CHECKBOX && (
            <ICheckBoxAnswerForm
              key={selectedAnswer.id}
              parentAnswer={selectedAnswer}
            />
          )}
          {selectedAnswer.question.type === QuestionEnum.Q_CODELIST && (
            <ICodelistAnswerForm
              key={selectedAnswer.id}
              parentAnswer={selectedAnswer}
            />
          )}
          {selectedAnswer.question.type === QuestionEnum.Q_PERIOD_DATE && (
            <PeriodDateAnswerForm
              key={selectedAnswer.id}
              parentAnswer={selectedAnswer}
            />
          )}
          {selectedAnswer.question.type === QuestionEnum.Q_TIME && (
            <TimeAnswerForm
              key={selectedAnswer.id}
              parentAnswer={selectedAnswer}
            />
          )}
          {selectedAnswer.question.type === QuestionEnum.Q_FILEUPLOAD && (
            <FileUploadAnswerForm
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
      {req.requirement_Type === RequirementType.info &&
        req.variants[0].questions[0].type === QuestionEnum.Q_TIME && (
          <TimeInfo
            parent_requirement={req}
            answer={selectedAnswer}
            key={selectedAnswer.id}
          />
        )}
      {req.requirement_Type === RequirementType.info &&
        req.variants[0].questions[0].type === QuestionEnum.Q_FILEUPLOAD && (
          <FileUploadInfo
            parent_requirement={req}
            answer={selectedAnswer}
            key={selectedAnswer.id}
          />
        )}
    </div>
  );
}
