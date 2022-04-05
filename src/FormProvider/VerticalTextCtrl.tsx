import { FormControl, FormLabel, Typography } from '@mui/material';
import { get } from 'lodash';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import DFOInput from '../components/DFOInput/DFOInput';

interface IProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
}

const VerticalTextCtrl = ({
  name,
  label = '',
  placeholder = '',
  type = 'text'
}: IProps): React.ReactElement => {
  const {
    formState: { errors }
  } = useFormContext();

  return (
    <FormControl error={!!get(errors, name)} sx={{ width: '100%' }}>
      <Typography variant="smallBold" sx={{ marginBottom: 2 }}>
        {label}
      </Typography>
      <Controller
        name={name}
        render={({ field }) => (
          <DFOInput
            {...field}
            placeholder={placeholder}
            type={type}
            sx={{ marginBottom: 4 }}
            disableUnderline
          />
        )}
      />
      {!!get(errors, name) && (
        <FormLabel>{get(errors, name)?.message ?? ''}</FormLabel>
      )}
    </FormControl>
  );
};

export default VerticalTextCtrl;
