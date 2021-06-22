import 'date-fns';
import React, { ReactElement, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {
  Control,
  FormState,
  useFieldArray,
  UseFormRegister
} from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { Bank } from '../../models/Bank';
import { ICheckboxQuestion } from '../../models/ICheckboxQuestion';
import { ICodelistQuestion } from '../../models/ICodelistQuestion';
import { IFileUploadQuestion } from '../../models/IFileUploadQuestion';
import { IPeriodDateQuestion } from '../../models/IPeriodDateQuestion';
import { ISliderQuestion } from '../../models/ISliderQuestion';
import { ITextQuestion } from '../../models/ITextQuestion';
import { ITimeQuestion } from '../../models/ITimeQuestion';
import QuestionEnum from '../../models/QuestionEnum';
import { QuestionType } from '../../models/QuestionType';
import { Requirement } from '../../models/Requirement';
import CheckboxForm from './CheckboxForm';
import CodeListForm from './CodeListForm';
import FileUploadForm from './FileUploadForm';
import PeriodDateForm from './PeriodDateForm';
import SliderForm from './SliderForm';
import TextForm from './TextForm';
import TimeForm from './TimeForm';

type IProps = {
  control: Control<Requirement>;
  register: UseFormRegister<Requirement>;
  formState: FormState<Requirement>;
  variantIndex: number;
  project: Bank;
};

export default function QuestionArray({
  control,
  register,
  formState,
  variantIndex,
  project
}: IProps): ReactElement {
  const { fields, append, remove } = useFieldArray({
    name: `variants.${variantIndex}.questions` as 'variants.0.questions',
    control
  });

  const [getAlternative, setAlternativeSelected] = useState('value');

  const addAlternative = () => {
    if (getAlternative === QuestionEnum.Q_SLIDER) {
      append({
        id: uuidv4(),
        type: QuestionEnum.Q_SLIDER,
        config: {
          min: 0,
          max: 0,
          step: 1,
          unit: 'GB'
        }
      } as ISliderQuestion);
    } else if (getAlternative === QuestionEnum.Q_CODELIST) {
      append({
        id: uuidv4(),
        type: QuestionEnum.Q_CODELIST,
        config: {
          multipleSelect: false,
          codelist: project.codelist[0].id
        }
      } as ICodelistQuestion);
    } else if (getAlternative === QuestionEnum.Q_TEXT) {
      append({
        id: uuidv4(),
        type: QuestionEnum.Q_TEXT,
        config: {
          max: 0
        }
      } as ITextQuestion);
    } else if (getAlternative === QuestionEnum.Q_PERIOD_DATE) {
      append({
        id: uuidv4(),
        type: QuestionEnum.Q_PERIOD_DATE,
        config: {
          fromDate: new Date().toISOString(),
          toDate: new Date().toISOString()
        }
      } as IPeriodDateQuestion);
    } else if (getAlternative === QuestionEnum.Q_TIME) {
      append({
        id: uuidv4(),
        type: QuestionEnum.Q_TIME,
        config: {
          fromTime: '',
          toTime: ''
        }
      } as ITimeQuestion);
    } else if (getAlternative === QuestionEnum.Q_CHECKBOX) {
      append({
        id: uuidv4(),
        type: QuestionEnum.Q_CHECKBOX
      } as ICheckboxQuestion);
    } else if (getAlternative === QuestionEnum.Q_FILEUPLOAD) {
      append({
        id: uuidv4(),
        type: QuestionEnum.Q_FILEUPLOAD
      } as IFileUploadQuestion);
    }
  };

  return (
    <div>
      <h6>Alternatives</h6>
      <Form.Group as={Row}>
        <Form.Label column sm="3">
          Select Alternative Type
        </Form.Label>
        <Col sm={5}>
          <Form.Control
            as="select"
            onChange={(e) => setAlternativeSelected(e.currentTarget.value)}
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
        <Button onClick={() => addAlternative()}>Add</Button>
      </Form.Group>

      {fields.map((item: QuestionType, index) => {
        return (
          <div key={item.id}>
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
