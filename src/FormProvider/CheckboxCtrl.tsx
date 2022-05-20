import { Box, FormControl, FormLabel } from '@mui/material';
import { get } from 'lodash';
import React, { ReactElement } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DFOCheckbox } from '../components/DFOCheckbox/DFOCheckbox';
import { Typography } from '@mui/material/';
import theme from '../theme';

interface IProps {
  name: string;
  label: string | number | ReactElement;
}

const CheckboxCtrl = ({ name, label }: IProps): React.ReactElement => {
  const {
    formState: { errors }
  } = useFormContext();

  return (
    <FormControl error={!!get(errors, name)}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Controller
          name={name}
          render={({ field }) => (
            <>
              <DFOCheckbox {...field} checked={field.value} />
              {label && (
                <FormLabel
                  id={name}
                  onClick={() => field.onChange(!field.value)}
                  sx={{ cursor: 'pointer', paddingLeft: 1 }}
                >
                  <Typography variant={'sm'} color={theme.palette.black.main}>
                    {label}
                  </Typography>
                </FormLabel>
              )}
            </>
          )}
        />
      </Box>
      {!!get(errors, name) && (
        <FormLabel>{get(errors, name)?.message ?? ''}</FormLabel>
      )}
    </FormControl>
  );
};

export default CheckboxCtrl;
