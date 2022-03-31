import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { get } from 'lodash';
import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { IMark } from '../Nexus/entities/IMark';

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  errors: FieldErrors;
  label: string;
  min: number;
  max: number;
  step: number;
  marks: IMark[];
}

/**
 * @deprecated use src/FormProvider/SliderCtrl instead
 */
export default function SliderSelect({
  control,
  name,
  errors,
  min,
  max,
  step,
  marks,
  label
}: IProps): React.ReactElement {
  return (
    <Box>
      <FormControl fullWidth error={!!get(errors, name)}>
        <Stack>{label}</Stack>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <Typography variant="body1" sx={{ whiteSpace: 'nowrap' }}>
            {min}
          </Typography>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <Slider
                name={field.name}
                value={field.value}
                onBlur={field.onBlur}
                ref={field.ref}
                onChange={(_, value) => {
                  field.onChange(value);
                }}
                min={min}
                max={max}
                step={step}
                marks={marks}
              />
            )}
          />
          <Typography variant="body1" sx={{ whiteSpace: 'nowrap' }}>
            {max}
          </Typography>
        </Stack>
        <Stack>
          <FormHelperText id={name}>
            {get(errors, name)?.message ?? ''}
          </FormHelperText>
        </Stack>
      </FormControl>
    </Box>
  );
}
