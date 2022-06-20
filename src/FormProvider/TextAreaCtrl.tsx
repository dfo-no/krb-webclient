import { FormControl, FormLabel } from '@mui/material';
import { get } from 'lodash';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import DFOTextarea from '../components/DFOTextarea/DFOTextarea';

interface IProps {
  className?: string;
  name: string;
  placeholder?: string;
  type?: string;
  rows?: number;
}

const TextAreaCtrl = ({
  className,
  name,
  placeholder = '',
  type = 'text',
  rows = 3
}: IProps): React.ReactElement => {
  const {
    formState: { errors }
  } = useFormContext();

  return (
    <FormControl
      className={className}
      error={!!get(errors, name)}
      sx={{ height: '100%', width: '100%' }}
    >
      <Controller
        name={name}
        render={({ field }) => (
          <DFOTextarea
            maxRows={rows}
            minRows={rows}
            multiline={true}
            {...field}
            placeholder={placeholder}
            type={type}
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

export default TextAreaCtrl;
