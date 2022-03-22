import { FormControl, FormLabel } from '@mui/material';
import { get } from 'lodash';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import DFOSelect from '../components/DFOSelect/DFOSelect';

interface IProps {
  name: string;
  label: string;
  options: string[];
}

const SelectCtrl = ({
  name,
  label = '',
  options
}: IProps): React.ReactElement => {
  const {
    formState: { errors }
  } = useFormContext();

  return (
    <FormControl error={!!get(errors, name)}>
      <FormLabel sx={{ paddingBottom: 2 }}>{label}</FormLabel>
      <Controller
        name={name}
        render={({ field }) => (
          <DFOSelect
            {...field.name}
            {...field.onBlur}
            {...field.onChange}
            {...field.value}
            options={options}
          />
        )}
      />
      {!!get(errors, name) && (
        <FormLabel>{get(errors, name)?.message ?? ''}</FormLabel>
      )}
    </FormControl>
  );
};

export default SelectCtrl;
