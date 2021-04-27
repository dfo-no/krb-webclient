import React, { ReactElement, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useFieldArray } from 'react-hook-form';

import { v4 as uuidv4 } from 'uuid';

import CodeListAlternative from './CodeListAlternative';
import ValueAlternative from './ValueAlternative';
import TextAlternative from './TextAlternative';
import PeriodDateAlternative from './PeriodDateAlternative';
import TimeAlternative from './TimeAlternative';
import { InputProps } from '../../models/InputProps';
import YesNoAlternative from './YesNoAlternative';
import FileUploadAlternative from './FileUploadAlternative';

interface IProps extends InputProps {
  prefix: string;
  variantIndex: number;
  // eslint-disable-next-line react/no-unused-prop-types
  alternatives: any;
  project: any;
}

export default function AlternativeArray({
  control,
  register,
  formState,
  getValues,
  setValue,
  variantIndex,
  prefix,
  project
}: IProps): ReactElement {
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    keyName: 'guid',
    control,
    name: `${prefix}`
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
      });
    } else if (getAlternative === 'codelist') {
      append({
        id: uuidv4(),
        codelist: { ...project.codelist[0] },
        type: 'codelist'
      });
    } else if (getAlternative === 'text') {
      append({
        id: uuidv4(),
        max: 0,
        text: '',
        type: 'text'
      });
    } else if (getAlternative === 'periodDate') {
      append({
        id: uuidv4(),
        minDays: 0,
        maxDays: 0,
        // fromDate: new Date(),
        // toDate: new Date(),
        fromDate: '',
        toDate: '',
        type: 'periodDate'
      });
    } else if (getAlternative === 'time') {
      append({
        id: uuidv4(),
        fromTime: '',
        toTime: '',
        type: 'time'
      });
    } else if (getAlternative === 'yesNo') {
      append({
        id: uuidv4(),
        type: 'yesNo'
      });
    } else if (getAlternative === 'fileUpload') {
      append({
        id: uuidv4(),
        type: 'fileUpload',
        fileEndings: ''
      });
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
      {fields.map((item: any, index) => {
        return (
          <div key={item.id}>
            {item.type === 'value' && (
              <ValueAlternative
                vIx={variantIndex}
                aIx={index}
                defaultValues
                item={item}
                {...{
                  control,
                  register,
                  formState,
                  getValues,
                  setValue
                }}
              />
            )}

            {item.type === 'codelist' && (
              <CodeListAlternative
                vIx={variantIndex}
                aIx={index}
                defaultValues
                item={item}
                project={project}
                {...{
                  control,
                  register,
                  formState,
                  getValues,
                  setValue
                }}
              />
            )}
            {item.type === 'text' && (
              <TextAlternative
                vIx={variantIndex}
                aIx={index}
                defaultValues
                item={item}
                {...{
                  control,
                  register,
                  formState,
                  getValues,
                  setValue
                }}
              />
            )}
            {item.type === 'periodDate' && (
              <PeriodDateAlternative
                vIx={variantIndex}
                aIx={index}
                defaultValues
                item={item}
                {...{
                  control,
                  register,
                  formState,
                  getValues,
                  setValue
                }}
              />
            )}
            {item.type === 'yesNo' && (
              <YesNoAlternative
                vIx={variantIndex}
                aIx={index}
                defaultValues
                item={item}
                {...{
                  control,
                  register,
                  formState,
                  getValues,
                  setValue
                }}
              />
            )}
            {item.type === 'time' && (
              <TimeAlternative
                vIx={variantIndex}
                aIx={index}
                defaultValues
                item={item}
                {...{
                  control,
                  register,
                  formState,
                  getValues,
                  setValue
                }}
              />
            )}
            {item.type === 'fileUpload' && (
              <FileUploadAlternative
                vIx={variantIndex}
                aIx={index}
                defaultValues
                item={item}
                {...{
                  control,
                  register,
                  formState,
                  getValues,
                  setValue
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
