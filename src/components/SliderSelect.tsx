import Slider from '@mui/material/Slider';
import { get, has, toPath } from 'lodash';
import React from 'react';
import Form from 'react-bootstrap/Form';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { IMark } from '../Nexus/entities/IMark';

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  errors: FieldErrors;
  label: string;
  min: number;
  max: number;
  step: number;
  marks: IMark[];
}

export default function SliderSelect({
  control,
  name,
  errors,
  min,
  max,
  step,
  marks
}: IProps): React.ReactElement {
  const hasError = (str: string) => {
    let retVal = null;
    const path = toPath(str);
    if (has(errors, path)) {
      retVal = true;
    } else {
      retVal = false;
    }
    return retVal;
  };

  const getError = (str: string) => {
    const path = toPath(str);
    path.push('message');
    return get(errors, path);
  };
  return (
    <div className="m-4">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Slider
            name={field.name}
            value={field.value}
            onBlur={field.onBlur}
            ref={field.ref}
            onChange={(_, value) => {
              field.onChange(value);
            }}
            min={min}
            max={max}
            step={step}
            marks={marks}
          />
        )}
      />

      {hasError(name) && (
        <Form.Control.Feedback type="invalid">
          {getError(name)}
        </Form.Control.Feedback>
      )}
    </div>
  );
}
