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

import CodeListAlternative from './CodeListAlternative';
import ValueAlternative from './SliderWorkbenchForm';
import TextAlternative from './TextAlternative';
import PeriodDateAlternative from './PeriodDateAlternative';
import TimeAlternative from './TimeAlternative';
import YesNoAlternative from './YesNoAlternative';
import FileUploadAlternative from './FileUploadAlternative';
import { Requirement } from '../../models/Requirement';
import { Bank } from '../../models/Bank';
import { ISliderQuestion } from '../../models/Slider/ISliderQuestion';
import { ICodelistQuestion } from '../../models/ICodelistQuestion';
import { ITextQuestion } from '../../models/ITextQuestion';
import { IPeriodDateQuestion } from '../../models/IPeriodDateQuestion';
import { ITimeQuestion } from '../../models/ITimeQuestion';
import { ICheckboxQuestion } from '../../models/ICheckboxQuestion';
import { IFileUploadQuestion } from '../../models/IFileUploadQuestion';
import { AlternativeType } from '../../models/IVariant';
import QuestionType from '../../models/QuestionType';

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
    keyName: 'guid',
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
        config: {
          max: 0
        },
        type: QuestionType.Q_TEXT
      } as ITextQuestion);
    } else if (getAlternative === QuestionType.Q_PERIOD_DATE) {
      append({
        id: uuidv4(),
        config: { minDays: 0, maxDays: 0, fromDate: '', toDate: '' },
        type: QuestionType.Q_PERIOD_DATE
      } as IPeriodDateQuestion);
    } else if (getAlternative === QuestionType.Q_TIME) {
      append({
        id: uuidv4(),
        config: {
          fromTime: '',
          toTime: ''
        },
        type: QuestionType.Q_TIME
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
              <option value="codelist">Codelist</option>
            )}
            <option value="text">Text</option>
            <option value="periodDate">Period</option>
            <option value="time">Time</option>
            <option value="yesNo">Yes/No </option>
            <option value="fileUpload">File upload </option>
          </Form.Control>
        </Col>
        <Button onClick={() => addAlternative()}>Add</Button>
      </Form.Group>
      {fields.map((item: AlternativeType, index) => {
        return (
          <div key={item.id}>
            {item.type === QuestionType.Q_SLIDER && (
              <ValueAlternative
                control={control}
                register={register}
                formState={formState}
                item={item as ISliderQuestion}
                vIndex={variantIndex}
                aIndex={index}
                remove={remove}
              />
            )}

            {item.type === QuestionType.Q_CODELIST && (
              <CodeListAlternative
                control={control}
                register={register}
                formState={formState}
                item={item as ICodelistQuestion}
                vIndex={variantIndex}
                aIndex={index}
                project={project}
                remove={remove}
              />
            )}
            {item.type === QuestionType.Q_TEXT && (
              <TextAlternative
                control={control}
                register={register}
                formState={formState}
                item={item as ITextQuestion}
                vIndex={variantIndex}
                aIndex={index}
                remove={remove}
              />
            )}
            {item.type === QuestionType.Q_PERIOD_DATE && (
              <PeriodDateAlternative
                control={control}
                register={register}
                formState={formState}
                item={item as IPeriodDateQuestion}
                vIndex={variantIndex}
                aIndex={index}
                remove={remove}
              />
            )}
            {item.type === QuestionType.Q_CHECKBOX && (
              <YesNoAlternative
                control={control}
                register={register}
                formState={formState}
                item={item as ICheckboxQuestion}
                vIndex={variantIndex}
                aIndex={index}
                remove={remove}
              />
            )}
            {item.type === QuestionType.Q_TIME && (
              <TimeAlternative
                control={control}
                register={register}
                formState={formState}
                item={item as ITimeQuestion}
                vIndex={variantIndex}
                aIndex={index}
                remove={remove}
              />
            )}
            {item.type === QuestionType.Q_FILEUPLOAD && (
              <FileUploadAlternative
                control={control}
                register={register}
                formState={formState}
                item={item as IFileUploadQuestion}
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
