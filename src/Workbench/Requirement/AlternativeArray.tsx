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
import ValueAlternative from './ValueAlternative';
import TextAlternative from './TextAlternative';
import PeriodDateAlternative from './PeriodDateAlternative';
import TimeAlternative from './TimeAlternative';
import YesNoAlternative from './YesNoAlternative';
import FileUploadAlternative from './FileUploadAlternative';
import { Requirement } from '../../models/Requirement';
import { Bank } from '../../models/Bank';
import { IValueAlternative } from '../../models/IValueAlternative';
import { ICodelistAlternative } from '../../models/ICodelistAlternative';
import { ITextAlternative } from '../../models/ITextAlternative';
import { IPeriodDateAlternative } from '../../models/IPeriodDateAlternative';
import { ITimeAlternative } from '../../models/ITimeAlternative';
import { IYesNoAlternative } from '../../models/IYesNoAlternative';
import { IFileUploadAlternative } from '../../models/IFileUploadAlternative';
import { AlternativeType } from '../../models/IVariant';

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
    name: `layouts.${variantIndex}.alternatives` as 'layouts.0.alternatives',
    keyName: 'guid',
    control
  });

  const [getAlternative, setAlternativeSelected] = useState('value');

  const addAlternative = () => {
    if (getAlternative === 'value') {
      append({
        id: uuidv4(),
        min: 0,
        max: 0,
        step: 1,
        unit: '',
        type: 'value'
      } as IValueAlternative);
    } else if (getAlternative === 'codelist') {
      append({
        id: uuidv4(),
        codelist: project.codelist[0].id,
        type: 'codelist'
      } as ICodelistAlternative);
    } else if (getAlternative === 'text') {
      append({
        id: uuidv4(),
        max: 0,
        text: '',
        type: 'text'
      } as ITextAlternative);
    } else if (getAlternative === 'periodDate') {
      append({
        id: uuidv4(),
        minDays: 0,
        maxDays: 0,
        fromDate: '',
        toDate: '',
        type: 'periodDate'
      } as IPeriodDateAlternative);
    } else if (getAlternative === 'time') {
      append({
        id: uuidv4(),
        fromTime: '',
        toTime: '',
        type: 'time'
      } as ITimeAlternative);
    } else if (getAlternative === 'yesNo') {
      append({
        id: uuidv4(),
        type: 'yesNo'
      } as IYesNoAlternative);
    } else if (getAlternative === 'fileUpload') {
      append({
        id: uuidv4(),
        type: 'fileUpload',
        fileEndings: ''
      } as IFileUploadAlternative);
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
            <option value="value">Value</option>
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
            {item.type === 'value' && (
              <ValueAlternative
                control={control}
                register={register}
                formState={formState}
                item={item as IValueAlternative}
                vIndex={variantIndex}
                aIndex={index}
                remove={remove}
              />
            )}

            {item.type === 'codelist' && (
              <CodeListAlternative
                control={control}
                register={register}
                formState={formState}
                item={item as ICodelistAlternative}
                vIndex={variantIndex}
                aIndex={index}
                project={project}
                remove={remove}
              />
            )}
            {item.type === 'text' && (
              <TextAlternative
                control={control}
                register={register}
                formState={formState}
                item={item as ITextAlternative}
                vIndex={variantIndex}
                aIndex={index}
                remove={remove}
              />
            )}
            {item.type === 'periodDate' && (
              <PeriodDateAlternative
                control={control}
                register={register}
                formState={formState}
                item={item as IPeriodDateAlternative}
                vIndex={variantIndex}
                aIndex={index}
                remove={remove}
              />
            )}
            {item.type === 'yesNo' && (
              <YesNoAlternative
                control={control}
                register={register}
                formState={formState}
                item={item as IYesNoAlternative}
                vIndex={variantIndex}
                aIndex={index}
                remove={remove}
              />
            )}
            {item.type === 'time' && (
              <TimeAlternative
                control={control}
                register={register}
                formState={formState}
                item={item as ITimeAlternative}
                vIndex={variantIndex}
                aIndex={index}
                remove={remove}
              />
            )}
            {item.type === 'fileUpload' && (
              <FileUploadAlternative
                control={control}
                register={register}
                formState={formState}
                item={item as IFileUploadAlternative}
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
