import Slider from '@mui/material/Slider';
import React from 'react';
import Form from 'react-bootstrap/Form';
import {
  Controller,
  FieldError,
  FieldValues,
  UseControllerProps
} from 'react-hook-form';
import { IOption } from '../models/IOption';
import { ISliderQuestion } from '../models/ISliderQuestion';

interface Props<T> extends UseControllerProps<T> {
  error: FieldError | undefined;
  question: ISliderQuestion;
}

const ControlledSlider = <T extends FieldValues>({
  question,
  name,
  control,
  error
}: Props<T>): React.ReactElement => {
  const marks: IOption[] = [
    {
      value: question.config.min,
      label: `${question.config.min} ${question.config.unit}`
    },
    {
      value: question.config.max,
      label: `${question.config.max} ${question.config.unit}`
    }
  ];

  return (
    <Form.Group controlId={name}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Slider
            name={field.name}
            onBlur={field.onBlur}
            ref={field.ref}
            onChange={(_, value) => {
              field.onChange(value);
            }}
            min={question.config.min}
            max={question.config.max}
            step={question.config.step}
            marks={marks}
          />
        )}
      />
    </Form.Group>
  );
};

export default ControlledSlider;
