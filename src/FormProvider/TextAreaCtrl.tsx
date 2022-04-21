import { FormControl, FormLabel, Typography } from '@mui/material';
import { get } from 'lodash';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import DFOTextarea from '../components/DFOTextarea/DFOTextarea';
import theme from '../theme';

interface IProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
}

const TextAreaCtrl = ({
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
      <Typography
        variant={'smBold'}
        color={theme.palette.primary.main}
        sx={{ marginBottom: 2 }}
      >
        {label}
      </Typography>
      <Controller
        name={name}
        render={({ field }) => (
          <DFOTextarea
            maxRows={3}
            minRows={3}
            multiline={true}
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

export default TextAreaCtrl;
