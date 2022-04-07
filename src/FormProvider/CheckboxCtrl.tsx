import { Box, FormControl, FormLabel } from '@mui/material';
import { get } from 'lodash';
import React, { ReactElement } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DFOCheckbox } from '../components/DFOCheckbox/DFOCheckbox';

interface IProps {
  name: string;
  label: string | number | ReactElement;
  variant?: string;
  value?: boolean;
}

const CheckboxCtrl = ({
  name,
  label,
  variant,
  value
}: IProps): React.ReactElement => {
  const {
    formState: { errors }
  } = useFormContext();

  return (
    <FormControl error={!!get(errors, name)}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Controller
          name={name}
          render={({ field }) => (
            <DFOCheckbox element={field} variant={variant} value={value} />
          )}
        />
        {label && <FormLabel id={name}>{label}</FormLabel>}
      </Box>
      {!!get(errors, name) && (
        <FormLabel>{get(errors, name)?.message ?? ''}</FormLabel>
      )}
    </FormControl>
  );
};

export default CheckboxCtrl;
