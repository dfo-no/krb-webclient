// eslint-disable-next-line import/no-named-default
import { Slider as MuiSlider } from '@mui/material';
import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { useFormContext } from 'react-hook-form';

interface IProps {
  name: string;
}

const SliderCtrl = ({ name }: IProps): React.ReactElement => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <Form.Group controlId={name}>
      <MuiSlider {...register(name)} />

      <Form.Control type="hidden" isInvalid={!!errors[name]} />
      <FormControl.Feedback type="invalid">
        {errors[name]?.message ?? ''}
      </FormControl.Feedback>
    </Form.Group>
  );
};

export default SliderCtrl;
