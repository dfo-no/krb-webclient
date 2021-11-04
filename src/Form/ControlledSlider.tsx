import Slider from '@mui/material/Slider';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import {
  Controller,
  FieldError,
  FieldValues,
  UseControllerProps
} from 'react-hook-form';
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
  return (
    <Row>
      <Col xs={2}>{`${question.config.min} ${question.config.unit}`}</Col>
      <Col xs={8}>
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
                min={question.config.min}
                max={question.config.max}
                step={question.config.step}
              />
            )}
          />
          <Form.Control type="hidden" isInvalid={!!error} />
          <FormControl.Feedback type="invalid">
            {error?.message}
          </FormControl.Feedback>
        </Form.Group>
      </Col>
      <Col xs={2}>{`${question.config.max} ${question.config.unit}`}</Col>
    </Row>
  );
};

export default ControlledSlider;
