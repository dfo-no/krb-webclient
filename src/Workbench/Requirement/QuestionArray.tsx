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
import { IBank } from '../../models/IBank';
import { ICheckboxQuestion } from '../../models/ICheckboxQuestion';
import { ICodelistQuestion } from '../../models/ICodelistQuestion';
import { IFileUploadQuestion } from '../../models/IFileUploadQuestion';
import { IPeriodDateQuestion } from '../../models/IPeriodDateQuestion';
import { ISliderQuestion } from '../../models/ISliderQuestion';
import { ITextQuestion } from '../../models/ITextQuestion';
import { ITimeQuestion } from '../../models/ITimeQuestion';
import QuestionEnum from '../../models/QuestionEnum';
import { QuestionType } from '../../models/QuestionType';
import { IRequirement } from '../../models/Requirement';
import CheckboxForm from './CheckboxForm';
import CodeListForm from './CodeListForm';
import FileUploadForm from './FileUploadForm';
import PeriodDateForm from './PeriodDateForm';
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
    if (question === QuestionEnum.Q_SLIDER) {
      append({
        id: uuidv4(),
        type: QuestionEnum.Q_SLIDER,
        config: {
          min: 0,
          max: 10,
          step: 1,
          unit: 'GB'
        }
      } as ISliderQuestion);
    } else if (question === QuestionEnum.Q_CODELIST) {
      append({
        id: uuidv4(),
        type: QuestionEnum.Q_CODELIST,
        config: {
          multipleSelect: false,
          codelist: project.codelist[0].id
        }
      } as ICodelistQuestion);
    } else if (question === QuestionEnum.Q_TEXT) {
      append({
        id: uuidv4(),
        type: QuestionEnum.Q_TEXT,
        config: {
          max: 0
        }
      } as ITextQuestion);
    } else if (question === QuestionEnum.Q_PERIOD_DATE) {
      append({
        id: uuidv4(),
        type: QuestionEnum.Q_PERIOD_DATE,
        config: {
          fromDate: null,
          toDate: null
        }
      } as IPeriodDateQuestion);
    } else if (question === QuestionEnum.Q_TIME) {
      append({
        id: uuidv4(),
        type: QuestionEnum.Q_TIME,
        config: {
          fromTime: '',
          toTime: ''
        }
      } as ITimeQuestion);
    } else if (question === QuestionEnum.Q_CHECKBOX) {
      append({
        id: uuidv4(),
        type: QuestionEnum.Q_CHECKBOX,
        config: {
          weightTrue: 100,
          weightFalse: 0
        }
      } as ICheckboxQuestion);
    } else if (question === QuestionEnum.Q_FILEUPLOAD) {
      append({
        id: uuidv4(),
        type: QuestionEnum.Q_FILEUPLOAD
      } as IFileUploadQuestion);
    }
  };

  return (
    <div>
      <h6>{t('Questions')}</h6>
      <Form.Label column sm="3">
        {t('Select question type')}
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
          <option value={QuestionEnum.Q_PERIOD_DATE}>Period</option>
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
              <PeriodDateForm
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
