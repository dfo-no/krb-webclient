import React, { ReactElement, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useFieldArray } from 'react-hook-form';

import { v4 as uuidv4 } from 'uuid';

import CodeListAlternative from './CodeListAlternative';
import ValueAlternative from './ValueAlternative';

import { InputProps } from '../../models/InputProps';

interface IProps extends InputProps {
  prefix: string;
  variantIndex: number;
  alternatives: any;
  project: any;
}

export default function AlternativeArray({
  control,
  register,
  errors,
  getValues,
  setValue,
  variantIndex,
  prefix,
  project
}: IProps): ReactElement {
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
        type: 'codelist',
        codelist: { ...project.codelist[0] }
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
          </Form.Control>
        </Col>
        <Button onClick={() => addAlternative()}>Add</Button>
      </Form.Group>
      {fields.map((item, index) => {
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
                  errors,
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
                  errors,
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
