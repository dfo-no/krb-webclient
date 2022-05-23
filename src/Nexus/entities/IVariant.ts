import CustomJoi from '../../common/CustomJoi';
import VariantType from './VariantType';
import { CheckboxQuestionSchema } from './ICheckboxQuestion';
import { CodelistQuestionSchema } from './ICodelistQuestion';
import {
  FileUploadWorkbenchInfoSchema,
  FileUploadWorkbenchSchema
} from './IFileUploadQuestion';
import { PeriodDateWorkbenchSchema } from './IPeriodDateQuestion';
import { QuestionTypes } from '../../models/QuestionTypes';
import { QuestionVariant } from '../../enums';
import { SliderQuestionSchema } from './ISliderQuestion';
import { TextQuestionSchema } from './ITextQuestion';
import { TimeWorkbenchSchema } from './ITimeQuestion';

export interface IVariant {
  id: string;
  description: string;
  requirementText: string;
  instruction: string;
  useProduct: boolean;
  useSpesification: boolean;
  useQualification: boolean;
  products: string[];
  questions: QuestionTypes;
  type: VariantType;
}

export const VariantSchema = CustomJoi.object().keys({
  id: CustomJoi.string()
    .guid({ version: ['uuidv4'] })
    .length(36)
    .required(),
  description: CustomJoi.string().required(),
  requirementText: CustomJoi.string().allow('').required(),
  instruction: CustomJoi.string().allow('').required(),
  useProduct: CustomJoi.boolean().required(),
  useSpesification: CustomJoi.boolean().required(),
  useQualification: CustomJoi.boolean().required(),
  products: CustomJoi.array()
    .items()
    .when('useProduct', {
      is: true,
      then: CustomJoi.array().items(CustomJoi.string()).min(1).required(),
      otherwise: CustomJoi.array().length(0).required()
    })
    .required(),
  type: CustomJoi.string().valid(...Object.values(VariantType)),
  questions: CustomJoi.array().when('type', {
    is: VariantType.info,
    then: CustomJoi.array()
      .items(
        CustomJoi.alternatives().conditional('.type', {
          switch: [
            { is: QuestionVariant.Q_SLIDER, then: SliderQuestionSchema },
            { is: QuestionVariant.Q_CODELIST, then: CodelistQuestionSchema },
            { is: QuestionVariant.Q_TEXT, then: TextQuestionSchema },
            {
              is: QuestionVariant.Q_PERIOD_DATE,
              then: PeriodDateWorkbenchSchema
            },
            { is: QuestionVariant.Q_TIME, then: TimeWorkbenchSchema },
            { is: QuestionVariant.Q_CHECKBOX, then: CheckboxQuestionSchema },
            {
              is: QuestionVariant.Q_FILEUPLOAD,
              then: FileUploadWorkbenchInfoSchema
            }
          ]
        })
      )
      .max(1),
    otherwise: CustomJoi.array().items(
      CustomJoi.alternatives().conditional('.type', {
        switch: [
          { is: QuestionVariant.Q_SLIDER, then: SliderQuestionSchema },
          { is: QuestionVariant.Q_CODELIST, then: CodelistQuestionSchema },
          { is: QuestionVariant.Q_TEXT, then: TextQuestionSchema },
          {
            is: QuestionVariant.Q_PERIOD_DATE,
            then: PeriodDateWorkbenchSchema
          },
          { is: QuestionVariant.Q_TIME, then: TimeWorkbenchSchema },
          { is: QuestionVariant.Q_CHECKBOX, then: CheckboxQuestionSchema },
          { is: QuestionVariant.Q_FILEUPLOAD, then: FileUploadWorkbenchSchema }
        ]
      })
    )
  })
});

export const PostVariantSchema = VariantSchema.keys({
  id: CustomJoi.string().equal('').required()
});
