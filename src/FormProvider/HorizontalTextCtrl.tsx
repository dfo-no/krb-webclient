import { FormControl, FormLabel } from '@mui/material';
import { get } from 'lodash';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import DFOInput from '../components/DFOTextField/DFOTextField';

interface IProps {
  className?: string;
  name: string;
  placeholder: string;
  type?: string;
}

const HorizontalTextCtrl = ({
  className,
  name,
  placeholder = '',
  type = 'text'
}: IProps): React.ReactElement => {
  const {
    formState: { errors }
  } = useFormContext();

  return (
    <FormControl
      className={className}
      error={!!get(errors, name)}
      sx={{ width: '100%' }}
    >
      <Controller
        name={name}
        render={({ field }) => (
          <DFOInput
            {...field}
            placeholder={placeholder}
            type={type}
            error={!!get(errors, name)}
            disableUnderline
            sx={{ height: 45 }}
          />
        )}
      />
      {!!get(errors, name) && (
        <FormLabel>{get(errors, name)?.message ?? ''}</FormLabel>
      )}
    </FormControl>
  );
};

export default HorizontalTextCtrl;
