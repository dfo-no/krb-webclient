import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { get } from 'lodash';
import { DFOTextField } from '../components/DFOTextField/DFOTextField';

interface IProps {
  name: string;
  label?: string;
}

const TextCtrl = ({ name, label }: IProps): React.ReactElement => {
  const {
    formState: { errors }
  } = useFormContext();

  return (
    <Controller
      name={name}
      render={({ field }) => (
        <DFOTextField
          element={field}
          label={label}
          value={field.value}
          error={get(errors, name)}
          errorMessage={get(errors, name)?.message}
        />
      )}
    />
  );
};

export default TextCtrl;
