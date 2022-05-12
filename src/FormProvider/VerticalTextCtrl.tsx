import { Box, FormControl, FormLabel, Typography } from '@mui/material';
import { get } from 'lodash';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import DFOTextField from '../components/DFOTextField/DFOTextField';
import theme from '../theme';

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
      <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
        <Typography variant={'smBold'} color={theme.palette.primary.main}>
          {label}
        </Typography>
        <Controller
          name={name}
          render={({ field }) => (
            <DFOTextField
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
      </Box>
    </FormControl>
  );
};

export default VerticalTextCtrl;
