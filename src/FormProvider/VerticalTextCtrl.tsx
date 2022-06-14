import React from 'react';
import { FormControl, FormLabel, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { get } from 'lodash';

import DFOInput from '../components/DFOTextField/DFOTextField';
import DFOTextField from '../components/DFOTextField/DFOTextField';
import theme from '../theme';

interface IProps {
  className?: string;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
}

const VerticalTextCtrl = ({
  className,
  name,
  label = '',
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
      <Typography
        variant={'smBold'}
        color={theme.palette.primary.main}
        sx={{ marginBottom: 1 }}
      >
        {label}
      </Typography>
      <Controller
        name={name}
        render={({ field }) => (
          <DFOInput
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

export default VerticalTextCtrl;
