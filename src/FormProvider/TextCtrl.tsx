import { FormControl } from '@mui/material';
import { get } from 'lodash';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import DFOInput from '../components/DFOInput/DFOInput';

interface IProps {
  name: string;
  placeholder?: string;
}

const TextCtrl = ({ name, placeholder = '' }: IProps): React.ReactElement => {
  const {
    formState: { errors }
  } = useFormContext();

  return (
    <FormControl error={!!get(errors, name)} sx={{ width: '100%' }}>
      <Controller
        name={name}
        render={({ field }) => (
          <DFOInput {...field} placeholder={placeholder} disableUnderline />
        )}
      />
    </FormControl>
  );
};

export default TextCtrl;
