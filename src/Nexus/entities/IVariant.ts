import Joi from 'joi';
import QuestionEnum from '../../models/QuestionEnum';
import { QuestionTypes } from '../../models/QuestionTypes';
import RequirementType from '../../models/RequirementType';
import { CheckboxQuestionSchema } from './ICheckboxQuestion';
import { CodelistQuestionSchema } from './ICodelistQuestion';
import { FileUploadQuestionSchema } from './IFileUploadQuestion';
import { PeriodDateWorkbenchSchema } from './IPeriodDateQuestion';
import { SliderQuestionSchema } from './ISliderQuestion';
import { TextQuestionSchema } from './ITextQuestion';
import { TimeWorkbenchSchema } from './ITimeQuestion';

export interface IVariant {
  id: string;
  requirementText: string;
  instruction: string;
  useProduct: boolean;
  useSpesification: boolean;
  useQualification: boolean;
  products: string[];
  questions: QuestionTypes;
}

export const VariantSchema = Joi.object().keys({
  id: Joi.string().max(36).required(),
  requirementText: Joi.string().allow(null, '').required(),
  instruction: Joi.string().allow(null, '').required(),
  useProduct: Joi.boolean().required(),
  useSpesification: Joi.boolean().required(),
  useQualification: Joi.boolean().required(),
  products: Joi.array()
    .items()
    .when('useProduct', {
      is: true,
      then: Joi.array().items(Joi.string()).min(1).required(),
      otherwise: Joi.array().length(0).required()
    })
    .required(),
  questions: Joi.array()
    .when('requirement_Type', {
      is: RequirementType.info,
      then: Joi.array()
        .items(
          Joi.alternatives().conditional('.type', {
            switch: [
              { is: QuestionEnum.Q_SLIDER, then: SliderQuestionSchema },
              { is: QuestionEnum.Q_CODELIST, then: CodelistQuestionSchema },
              { is: QuestionEnum.Q_TEXT, then: TextQuestionSchema },
              {
                is: QuestionEnum.Q_PERIOD_DATE,
                then: PeriodDateWorkbenchSchema
              },
              { is: QuestionEnum.Q_TIME, then: TimeWorkbenchSchema },
              { is: QuestionEnum.Q_CHECKBOX, then: CheckboxQuestionSchema },
              { is: QuestionEnum.Q_FILEUPLOAD, then: FileUploadQuestionSchema }
            ]
          })
        )
        .max(1)
    })
    .items(
      Joi.alternatives().conditional('.type', {
        switch: [
          { is: QuestionEnum.Q_SLIDER, then: SliderQuestionSchema },
          { is: QuestionEnum.Q_CODELIST, then: CodelistQuestionSchema },
          { is: QuestionEnum.Q_TEXT, then: TextQuestionSchema },
          { is: QuestionEnum.Q_PERIOD_DATE, then: PeriodDateWorkbenchSchema },
          { is: QuestionEnum.Q_TIME, then: TimeWorkbenchSchema },
          { is: QuestionEnum.Q_CHECKBOX, then: CheckboxQuestionSchema },
          { is: QuestionEnum.Q_FILEUPLOAD, then: FileUploadQuestionSchema }
        ]
      })
    )
});
