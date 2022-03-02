import { get } from 'lodash';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import DFOTextField from '../components/DFOTextField/DFOTextField';

interface IProps {
  name: string;
  label: string;
}

const SwitchCtrl = ({ name, label }: IProps): React.ReactElement => {
  const {
    formState: { errors }
  } = useFormContext();

  return (
    <Controller
      name={name}
      render={({ field }) => (
        <DFOTextField
          {...field}
          label={label}
          value={field.value}
          variant="outlined"
          error={get(errors, name)}
        />
      )}
    />
  );
};

export default SwitchCtrl;
