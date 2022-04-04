import CustomJoi from '../../common/CustomJoi';
import QuestionEnum from '../../models/QuestionEnum';
import { QuestionTypes } from '../../models/QuestionTypes';
import { CheckboxQuestionSchema } from './ICheckboxQuestion';
import { CodelistQuestionSchema } from './ICodelistQuestion';
import {
  FileUploadWorkbenchInfoSchema,
  FileUploadWorkbenchSchema
} from './IFileUploadQuestion';
import { PeriodDateWorkbenchSchema } from './IPeriodDateQuestion';
import { SliderQuestionSchema } from './ISliderQuestion';
import { TextQuestionSchema } from './ITextQuestion';
import { TimeWorkbenchSchema } from './ITimeQuestion';
import VariantType from './VariantType';

export interface IVariant {
  id: string;
  description: string | null;
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
  id: CustomJoi.string().max(36).required(),
  description: CustomJoi.string().allow(null, '').required(),
  requirementText: CustomJoi.string().allow(null, '').required(),
  instruction: CustomJoi.string().allow(null, '').required(),
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
            { is: QuestionEnum.Q_SLIDER, then: SliderQuestionSchema },
            { is: QuestionEnum.Q_CODELIST, then: CodelistQuestionSchema },
            { is: QuestionEnum.Q_TEXT, then: TextQuestionSchema },
            {
              is: QuestionEnum.Q_PERIOD_DATE,
              then: PeriodDateWorkbenchSchema
            },
            { is: QuestionEnum.Q_TIME, then: TimeWorkbenchSchema },
            { is: QuestionEnum.Q_CHECKBOX, then: CheckboxQuestionSchema },
            {
              is: QuestionEnum.Q_FILEUPLOAD,
              then: FileUploadWorkbenchInfoSchema
            }
          ]
        })
      )
      .max(1),
    otherwise: CustomJoi.array().items(
      CustomJoi.alternatives().conditional('.type', {
        switch: [
          { is: QuestionEnum.Q_SLIDER, then: SliderQuestionSchema },
          { is: QuestionEnum.Q_CODELIST, then: CodelistQuestionSchema },
          { is: QuestionEnum.Q_TEXT, then: TextQuestionSchema },
          { is: QuestionEnum.Q_PERIOD_DATE, then: PeriodDateWorkbenchSchema },
          { is: QuestionEnum.Q_TIME, then: TimeWorkbenchSchema },
          { is: QuestionEnum.Q_CHECKBOX, then: CheckboxQuestionSchema },
          { is: QuestionEnum.Q_FILEUPLOAD, then: FileUploadWorkbenchSchema }
        ]
      })
    )
  })
});

export const PostVariantSchema = VariantSchema.keys({
  id: CustomJoi.string().equal('').required()
});
