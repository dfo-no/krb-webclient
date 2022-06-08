import React from 'react';

import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { useAppSelector } from '../../store/hooks';

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

  // Commented out delow due to moving requirement_Type from IRequirement to
  // type on IVariant. Thsi must be fixed up in another task
  return (
    <div key={selectedAnswer.id}>
      {/* {req.requirement_Type === RequirementType.requirement && (
        <Card key={req.id} className="ml-3 mb-3">
          <Card.Body>
            {requirementText}{' '}
            {markedRequirements.includes(selectedAnswer.questionId) && (
              <WarningAmberIcon />
            )}
          </Card.Body>
          {selectedAnswer.question.type === QuestionVariant.Q_SLIDER && (
            <ISliderAnswerForm
              key={selectedAnswer.id}
              parentAnswer={selectedAnswer}
            />
          )}
          {selectedAnswer.question.type === QuestionVariant.Q_TEXT && (
            <ITextAnswerForm
              key={selectedAnswer.id}
              parentAnswer={selectedAnswer}
            />
          )}
          {selectedAnswer.question.type === QuestionVariant.Q_CHECKBOX && (
            <ICheckBoxAnswerForm
              key={selectedAnswer.id}
              parentAnswer={selectedAnswer}
            />
          )}
          {selectedAnswer.question.type === QuestionVariant.Q_CODELIST && (
            <ICodelistAnswerForm
              key={selectedAnswer.id}
              parentAnswer={selectedAnswer}
            />
          )}
          {selectedAnswer.question.type === QuestionVariant.Q_PERIOD_DATE && (
            <PeriodDateAnswerForm
              key={selectedAnswer.id}
              parentAnswer={selectedAnswer}
            />
          )}
          {selectedAnswer.question.type === QuestionVariant.Q_TIME && (
            <TimeAnswerForm
              key={selectedAnswer.id}
              parentAnswer={selectedAnswer}
            />
          )}
          {selectedAnswer.question.type === QuestionVariant.Q_FILEUPLOAD && (
            <FileUploadAnswerForm
              key={selectedAnswer.id}
              parentAnswer={selectedAnswer}
            />
          )}
        </Card>
      )}
      {req.requirement_Type === RequirementType.info &&
        req.variants[0].questions[0].type === QuestionVariant.Q_SLIDER && (
          <SliderInfo
            parent_requirement={req}
            answer={selectedAnswer}
            key={selectedAnswer.id}
          />
        )}
      {req.requirement_Type === RequirementType.info &&
        req.variants[0].questions[0].type === QuestionVariant.Q_PERIOD_DATE && (
          <DateInfo
            parent_requirement={req}
            answer={selectedAnswer}
            key={selectedAnswer.id}
          />
        )}
      {req.requirement_Type === RequirementType.info &&
        req.variants[0].questions[0].type === QuestionVariant.Q_CHECKBOX && (
          <CheckBoxInfo
            parent_requirement={req}
            answer={selectedAnswer}
            key={selectedAnswer.id}
          />
        )}
      {req.requirement_Type === RequirementType.info &&
        req.variants[0].questions[0].type === QuestionVariant.Q_CODELIST && (
          <CodelistInfo
            parent_requirement={req}
            answer={selectedAnswer}
            key={selectedAnswer.id}
          />
        )}
      {req.requirement_Type === RequirementType.info &&
        req.variants[0].questions[0].type === QuestionVariant.Q_TEXT && (
          <TextInfo
            parent_requirement={req}
            answer={selectedAnswer}
            key={selectedAnswer.id}
          />
        )}
      {req.requirement_Type === RequirementType.info &&
        req.variants[0].questions[0].type === QuestionVariant.Q_TIME && (
          <TimeInfo
            parent_requirement={req}
            answer={selectedAnswer}
            key={selectedAnswer.id}
          />
        )}
      {req.requirement_Type === RequirementType.info &&
        req.variants[0].questions[0].type === QuestionVariant.Q_FILEUPLOAD && (
          <FileUploadInfo
            parent_requirement={req}
            answer={selectedAnswer}
            key={selectedAnswer.id}
          />
        )} */}
    </div>
  );
}
