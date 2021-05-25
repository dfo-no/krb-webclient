import React, { ReactElement, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  Control,
  FormState,
  useFieldArray,
  UseFormRegister
} from 'react-hook-form';

import { v4 as uuidv4 } from 'uuid';

import { Requirement } from '../../models/Requirement';
import { Bank } from '../../models/Bank';

import CodeListForm from './CodeListForm';
import { ICodelistQuestion } from '../../models/ICodelistQuestion';
import SliderForm from './SliderForm';
import { ISliderQuestion } from '../../models/ISliderQuestion';
import TextForm from './TextForm';
import { ITextQuestion } from '../../models/ITextQuestion';
import PeriodDateForm from './PeriodDateForm';
import { IPeriodDateQuestion } from '../../models/IPeriodDateQuestion';
import FileUploadForm from './FileUploadForm';
import { IFileUploadQuestion } from '../../models/IFileUploadQuestion';
import CheckboxForm from './CheckboxForm';
import { ICheckboxQuestion } from '../../models/ICheckboxQuestion';
import TimeForm from './TimeForm';
import { ITimeQuestion } from '../../models/ITimeQuestion';

import QuestionType from '../../models/QuestionType';
import { AlternativeType } from '../../models/AlternativeType';

type IProps = {
  control: Control<Requirement>;
  register: UseFormRegister<Requirement>;
  formState: FormState<Requirement>;
  variantIndex: number;
  project: Bank;
};

export default function AlternativeArray({
  control,
  register,
  formState,
  variantIndex,
  project
}: IProps): ReactElement {
  const { fields, append, remove } = useFieldArray({
    name: `variants.${variantIndex}.alternatives` as 'variants.0.alternatives',
    control
  });

  const [getAlternative, setAlternativeSelected] = useState('value');

  const addAlternative = () => {
    if (getAlternative === QuestionType.Q_SLIDER) {
      append({
        id: uuidv4(),
        type: QuestionType.Q_SLIDER,
        config: {
          min: 0,
          max: 0,
          step: 1,
          unit: ''
        }
      } as ISliderQuestion);
    } else if (getAlternative === QuestionType.Q_CODELIST) {
      append({
        id: uuidv4(),
        type: QuestionType.Q_CODELIST
      } as ICodelistQuestion);
    } else if (getAlternative === QuestionType.Q_TEXT) {
      append({
        id: uuidv4(),
        type: QuestionType.Q_TEXT,
        config: {
          max: 0
        }
      } as ITextQuestion);
    } else if (getAlternative === QuestionType.Q_PERIOD_DATE) {
      append({
        id: uuidv4(),
        type: QuestionType.Q_PERIOD_DATE,
        config: {
          minDays: 0,
          maxDays: 0,
          fromDate: '',
          toDate: ''
        }
      } as IPeriodDateQuestion);
    } else if (getAlternative === QuestionType.Q_TIME) {
      append({
        id: uuidv4(),
        type: QuestionType.Q_TIME,
        config: {
          fromTime: '',
          toTime: ''
        }
      } as ITimeQuestion);
    } else if (getAlternative === QuestionType.Q_CHECKBOX) {
      append({
        id: uuidv4(),
        type: QuestionType.Q_CHECKBOX
      } as ICheckboxQuestion);
    } else if (getAlternative === QuestionType.Q_FILEUPLOAD) {
      append({
        id: uuidv4(),
        type: QuestionType.Q_FILEUPLOAD
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
            <option value={QuestionType.Q_SLIDER}>Value</option>
            {project.codelist && project.codelist.length > 0 && (
              <option value={QuestionType.Q_CODELIST}>Codelist</option>
            )}
            <option value={QuestionType.Q_TEXT}>Text</option>
            <option value={QuestionType.Q_PERIOD_DATE}>Period</option>
            <option value={QuestionType.Q_TIME}>Time</option>
            <option value={QuestionType.Q_CHECKBOX}>Yes/No </option>
            <option value={QuestionType.Q_FILEUPLOAD}>File upload </option>
          </Form.Control>
        </Col>
        <Button onClick={() => addAlternative()}>Add</Button>
      </Form.Group>

      {fields.map((item: AlternativeType, index) => {
        return (
          <div key={item.id}>
            {item.type === QuestionType.Q_SLIDER && (
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

            {item.type === QuestionType.Q_CODELIST && (
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
            {item.type === QuestionType.Q_TEXT && (
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
            {item.type === QuestionType.Q_PERIOD_DATE && (
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
            {item.type === QuestionType.Q_CHECKBOX && (
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
            {item.type === QuestionType.Q_TIME && (
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
            {item.type === QuestionType.Q_FILEUPLOAD && (
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
