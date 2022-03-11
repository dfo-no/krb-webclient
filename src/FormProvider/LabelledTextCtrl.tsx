import { FormControl, FormLabel } from '@mui/material';
import { get } from 'lodash';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import DFOInput from '../components/DFOInput/DFOInput';

interface IProps {
  name: string;
  label?: string;
  placeholder?: string;
}

const LabelledTextCtrl = ({
  name,
  label = '',
  placeholder = ''
}: IProps): React.ReactElement => {
  const {
    formState: { errors }
  } = useFormContext();

  return (
    <FormControl error={!!get(errors, name)} sx={{ width: '100%' }}>
      <FormLabel>{label}</FormLabel>
      <Controller
        name={name}
        render={({ field }) => (
          <DFOInput {...field} placeholder={placeholder} disableUnderline />
        )}
      />
      {!!get(errors, name) && (
        <FormLabel>{get(errors, name)?.message ?? ''}</FormLabel>
      )}
    </FormControl>
  );
};

export default LabelledTextCtrl;
