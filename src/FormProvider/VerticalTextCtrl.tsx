import React from 'react';
import { FormControl, FormLabel, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { get } from 'lodash';

import DFOInput from '../components/DFOTextField/DFOTextField';
import theme from '../theme';

interface IProps {
  className?: string;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  autoFocus?: boolean;
}

const VerticalTextCtrl = ({
  className,
  name,
  label = '',
  placeholder = '',
  type = 'text',
  autoFocus
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
            autoFocus={autoFocus}
            placeholder={placeholder}
            type={type}
            onWheel={(e) => (e.target as HTMLElement).blur()}
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
