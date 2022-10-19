import FormLabel from '@mui/material/FormLabel';
import { get } from 'lodash';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface IProps {
  name: string;
}

/**
 * Use this when you to show an error message for a field,
 * but you DO NOT want to show the value to the user.
 */
const HiddenCtrl = ({ name }: IProps): React.ReactElement => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      render={({ field }) => (
        <FormLabel {...field} error={!!get(errors, name)}>
          {get(errors, name)?.message}
        </FormLabel>
      )}
    />
  );
};

export default HiddenCtrl;
