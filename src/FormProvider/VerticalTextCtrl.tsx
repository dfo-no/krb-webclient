import { FormControl, FormLabel, Typography } from '@mui/material';
import { get } from 'lodash';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import DFOInput from '../components/DFOInput/DFOInput';
import theme from '../theme';

interface IProps {
  name: string;
  label: string;
  placeholder: string;
}

const VerticalTextCtrl = ({
  name,
  label = '',
  placeholder = ''
}: IProps): React.ReactElement => {
  const {
    formState: { errors }
  } = useFormContext();

  return (
    <FormControl error={!!get(errors, name)} sx={{ width: '100%' }}>
      <FormLabel>
        <Typography
          variant="sm"
          sx={{
            color: theme.palette.primary.main
          }}
        >
          {label}
        </Typography>
      </FormLabel>
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

export default VerticalTextCtrl;
