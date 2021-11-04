import Slider from '@mui/material/Slider';
import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import {
  Controller,
  FieldError,
  FieldValues,
  UseControllerProps
} from 'react-hook-form';
import { IOption } from '../models/IOption';

interface Props<T> extends UseControllerProps<T> {
  error: FieldError | undefined;
  min: number;
  max: number;
  step: number;
  unit: string;
  marks: IOption[];
}

const ControlledSlider = <T extends FieldValues>({
  name,
  control,
  error,
  min,
  max,
  step,
  unit,
  marks
}: Props<T>): React.ReactElement => {
  return (
    <div className="d-flex align-items-center">
      {marks.length === 0 && <div className="px-2">{`${min} ${unit}`}</div>}

      <span className="mx-3 flex-grow-1">
        <Form.Group controlId={name}>
          <Controller
            control={control}
            name={name}
            render={({ field }) => (
              <Slider
                valueLabelDisplay="on"
                name={field.name}
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
          <Form.Control type="hidden" isInvalid={!!error} />
          <FormControl.Feedback type="invalid">
            {error?.message}
          </FormControl.Feedback>
        </Form.Group>
      </span>
      {marks.length === 0 && <span className="px-2">{`${max} ${unit}`}</span>}
    </div>
  );
};

export default ControlledSlider;
