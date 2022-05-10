import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { get } from 'lodash';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { IMark } from '../Nexus/entities/IMark';

interface IProps {
  name: string;
  min: number;
  max: number;
  step: number;
  marks: IMark[];
  unit?: string;
  label?: string;
  showValue?: boolean;
}

const SliderCtrl = ({
  name,
  min,
  max,
  step,
  marks,
  unit,
  label,
  showValue = true
}: IProps): React.ReactElement => {
  const {
    formState: { errors }
  } = useFormContext();

  return (
    <Box>
      <FormControl fullWidth error={!!get(errors, name)}>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          {label && (
            <Typography variant="smBold" sx={{ whiteSpace: 'nowrap' }}>
              {label}
            </Typography>
          )}
          {unit && (
            <Typography variant="sm" sx={{ whiteSpace: 'nowrap' }}>
              {min} {unit}
            </Typography>
          )}
          <Controller
            name={name}
            render={({ field }) => (
              <Slider
                valueLabelDisplay={showValue ? 'on' : 'off'}
                name={field.name}
                onBlur={field.onBlur}
                ref={field.ref}
                onChange={(_, value) => {
                  field.onChange(value);
                }}
                min={min}
                max={max}
                step={step}
                marks={marks}
                value={field.value}
                id={name}
              />
            )}
          />
          {unit && (
            <Typography variant="sm" sx={{ whiteSpace: 'nowrap' }}>
              {max} {unit}
            </Typography>
          )}
        </Stack>
        <FormHelperText id={name}>
          {get(errors, name)?.message ?? ''}
        </FormHelperText>
      </FormControl>
    </Box>
  );
};

export default SliderCtrl;

SliderCtrl.defaultProps = {
  label: ''
};
