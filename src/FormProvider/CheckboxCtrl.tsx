import { get } from 'lodash';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DFOCheckbox } from '../components/DFOCheckbox/DFOCheckbox';

interface IProps {
  name: string;
  label?: string;
  defaultValue?: boolean;
}

const CheckboxCtrl = ({
  name,
  label,
  defaultValue = false
}: IProps): React.ReactElement => {
  const {
    formState: { errors }
  } = useFormContext();

  return (
    <Controller
      name={name}
      render={({ field }) => (
        <DFOCheckbox
          element={field}
          defaultValue={defaultValue}
          label={label}
          error={get(errors, name)}
          errorMessage={get(errors, name)?.message}
        />
      )}
    />
  );
};

export default CheckboxCtrl;
