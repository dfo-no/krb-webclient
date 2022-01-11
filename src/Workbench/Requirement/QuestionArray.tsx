import 'date-fns';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import {
  Control,
  FormState,
  useFieldArray,
  UseFormRegister
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import QuestionEnum from '../../models/QuestionEnum';
import { QuestionType } from '../../models/QuestionType';
import { IBank } from '../../Nexus/entities/IBank';
import { ICheckboxQuestion } from '../../Nexus/entities/ICheckboxQuestion';
import { ICodelistQuestion } from '../../Nexus/entities/ICodelistQuestion';
import { IFileUploadQuestion } from '../../Nexus/entities/IFileUploadQuestion';
import { IPeriodDateQuestion } from '../../Nexus/entities/IPeriodDateQuestion';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { ISliderQuestion } from '../../Nexus/entities/ISliderQuestion';
import { ITextQuestion } from '../../Nexus/entities/ITextQuestion';
import { ITimeQuestion } from '../../Nexus/entities/ITimeQuestion';
import CheckboxForm from './CheckboxForm';
import CodeListForm from './CodeListForm';
import DateForm from './DateForm';
import FileUploadForm from './FileUploadForm';
import SliderForm from './SliderForm';
import TextForm from './TextForm';
import TimeForm from './TimeForm';

type IProps = {
  control: Control<IRequirement>;
  register: UseFormRegister<IRequirement>;
  formState: FormState<IRequirement>;
  variantIndex: number;
  project: IBank;
};

export default function QuestionArray({
  control,
  register,
  formState,
  variantIndex,
  project
}: IProps): React.ReactElement {
  const { fields, append, remove } = useFieldArray({
    name: `variants.${variantIndex}.questions` as 'variants.0.questions',
    control
  });
  const { t } = useTranslation();
  const [question, setSelectedQuestion] = useState('value');

  const addQuestion = () => {
    const uuid = uuidv4();
    if (question === QuestionEnum.Q_SLIDER) {
      const q: ISliderQuestion = {
        id: uuid,
        type: QuestionEnum.Q_SLIDER,
        config: {
          min: 0,
          max: 10,
          step: 1,
          unit: 'GB',
          defaultPoint: 1,
          scoreValues: [
            { score: 0, value: 0 },
            { value: 10, score: 100 }
          ]
        },
        answer: {
          point: 0,
          value: 0
        },
        sourceRel: null,
        sourceOriginal: null
      };
      append(q);
    } else if (question === QuestionEnum.Q_CODELIST) {
      const q: ICodelistQuestion = {
        id: uuid,
        type: QuestionEnum.Q_CODELIST,
        config: {
          mandatoryCodes: [],
          optionalCodes: [],
          codelist: project.codelist[0].id,
          defaultPoint: 1,
          optionalCodeMinAmount: 0,
          optionalCodeMaxAmount: 1
        },
        answer: {
          point: 0,
          codes: []
        },
        sourceRel: null,
        sourceOriginal: null
      };
      append(q);
    } else if (question === QuestionEnum.Q_TEXT) {
      const q: ITextQuestion = {
        id: uuid,
        type: QuestionEnum.Q_TEXT,
        config: {
          max: 10000,
          defaultPoint: 1
        },
        answer: {
          point: 0,
          text: ''
        },
        sourceRel: null,
        sourceOriginal: null
      };
      append(q);
    } else if (question === QuestionEnum.Q_PERIOD_DATE) {
      const q: IPeriodDateQuestion = {
        id: uuid,
        type: QuestionEnum.Q_PERIOD_DATE,
        config: {
          fromBoundary: null,
          toBoundary: null,
          isPeriod: false,
          periodMin: 0,
          periodMax: 1,
          defaultPoint: 1,
          dateScores: []
        },
        answer: {
          point: 0,
          fromDate: null,
          toDate: null
        },
        sourceRel: null,
        sourceOriginal: null
      };
      append(q);
    } else if (question === QuestionEnum.Q_TIME) {
      const q: ITimeQuestion = {
        id: uuid,
        type: QuestionEnum.Q_TIME,
        config: {
          fromBoundary: null,
          toBoundary: null,
          isPeriod: false,
          periodMinutes: 0,
          periodHours: 0,
          defaultPoint: 1,
          timeScores: []
        },
        answer: {
          point: 0,
          fromTime: null,
          toTime: null
        },
        sourceRel: null,
        sourceOriginal: null
      };
      append(q);
    } else if (question === QuestionEnum.Q_CHECKBOX) {
      const q: ICheckboxQuestion = {
        id: uuid,
        type: QuestionEnum.Q_CHECKBOX,
        config: {
          pointsNonPrefered: 0,
          defaultPoint: 1,
          preferedAlternative: true
        },
        answer: {
          point: 0,
          value: false
        },
        sourceRel: null,
        sourceOriginal: null
      };
      append(q);
    } else if (question === QuestionEnum.Q_FILEUPLOAD) {
      const q: IFileUploadQuestion = {
        id: uuid,
        type: QuestionEnum.Q_FILEUPLOAD,
        config: {
          template: null,
          uploadInSpec: false,
          allowMultipleFiles: false,
          fileEndings: [],
          defaultPoint: 1
        },
        answer: {
          point: 0,
          files: ['']
        },
        sourceRel: null,
        sourceOriginal: null
      };
      append(q);
    }
  };

  return (
    <div>
      <h6>{t('Answer types')}</h6>
      <Form.Label column sm="3">
        {t('Select answer type')}
      </Form.Label>
      <Col sm={6}>
        <Form.Control
          as="select"
          onChange={(e) => setSelectedQuestion(e.currentTarget.value)}
        >
          <option value="">...</option>
          <option value={QuestionEnum.Q_SLIDER}>Value</option>
          {project.codelist && project.codelist.length > 0 && (
            <option value={QuestionEnum.Q_CODELIST}>Codelist</option>
          )}
          <option value={QuestionEnum.Q_TEXT}>Text</option>
          <option value={QuestionEnum.Q_PERIOD_DATE}>Date</option>
          <option value={QuestionEnum.Q_TIME}>Time</option>
          <option value={QuestionEnum.Q_CHECKBOX}>Yes/No </option>
          <option value={QuestionEnum.Q_FILEUPLOAD}>File upload </option>
        </Form.Control>
      </Col>
      <Col sm={1}>
        <Button onClick={() => addQuestion()}>Add</Button>
      </Col>

      {fields.map((item: QuestionType, index) => {
        return (
          <div key={uuidv4()}>
            {item.type === QuestionEnum.Q_SLIDER && (
              <SliderForm
                control={control}
                register={register}
                formState={formState}
                item={item}
                vIndex={variantIndex}
                aIndex={index}
                remove={remove}
              />
            )}

            {item.type === QuestionEnum.Q_CODELIST && (
              <CodeListForm
                control={control}
                register={register}
                formState={formState}
                item={item}
                vIndex={variantIndex}
                aIndex={index}
                project={project}
                remove={remove}
              />
            )}
            {item.type === QuestionEnum.Q_TEXT && (
              <TextForm
                control={control}
                register={register}
                formState={formState}
                item={item}
                vIndex={variantIndex}
                aIndex={index}
                remove={remove}
              />
            )}
            {item.type === QuestionEnum.Q_PERIOD_DATE && (
              <DateForm
                control={control}
                register={register}
                formState={formState}
                item={item}
                vIndex={variantIndex}
                aIndex={index}
                remove={remove}
              />
            )}
            {item.type === QuestionEnum.Q_CHECKBOX && (
              <CheckboxForm
                control={control}
                register={register}
                formState={formState}
                item={item}
                vIndex={variantIndex}
                aIndex={index}
                remove={remove}
              />
            )}
            {item.type === QuestionEnum.Q_TIME && (
              <TimeForm
                control={control}
                register={register}
                formState={formState}
                item={item}
                vIndex={variantIndex}
                aIndex={index}
                remove={remove}
              />
            )}
            {item.type === QuestionEnum.Q_FILEUPLOAD && (
              <FileUploadForm
                control={control}
                register={register}
                formState={formState}
                item={item}
                vIndex={variantIndex}
                aIndex={index}
                remove={remove}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
