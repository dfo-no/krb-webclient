import React, { ReactElement } from 'react';
import { Box, FormControl, FormLabel } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { get } from 'lodash';
import { Typography } from '@mui/material/';

import theme from '../theme';
import { DFOCheckbox } from '../components/DFOCheckbox/DFOCheckbox';

interface IProps {
  className?: string;
  name: string;
  label?: string | number | ReactElement;
}

const CheckboxCtrl = ({
  className,
  name,
  label
}: IProps): React.ReactElement => {
  const {
    formState: { errors }
  } = useFormContext();

  return (
    <FormControl className={className} error={!!get(errors, name)}>
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
