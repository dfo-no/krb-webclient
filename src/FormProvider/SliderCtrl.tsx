import Slider from '@mui/material/Slider';
import { get } from 'lodash';
import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { Controller, useFormContext } from 'react-hook-form';
import { IMark } from '../Nexus/entities/IMark';

interface IProps {
  name: string;
  min: number;
  max: number;
  step: number;
  unit: string;
  marks: IMark[];
}

const SliderCtrl = ({
  name,
  min,
  max,
  step,
  unit,
  marks
}: IProps): React.ReactElement => {
  const {
    formState: { errors }
  } = useFormContext();

  return (
    <div className="d-flex align-items-center">
      {marks.length === 0 && <div className="px-2">{`${min} ${unit}`}</div>}

      <span className="mx-3 flex-grow-1">
        <Form.Group controlId={name}>
          <Controller
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
                value={field.value}
              />
            )}
          />
          <Form.Control type="hidden" isInvalid={!!get(errors, name)} />
          <FormControl.Feedback type="invalid">
            {get(errors, name)?.message ?? ''}
          </FormControl.Feedback>
        </Form.Group>
      </span>
      {marks.length === 0 && <span className="px-2">{`${max} ${unit}`}</span>}
    </div>
  );
};

export default SliderCtrl;
