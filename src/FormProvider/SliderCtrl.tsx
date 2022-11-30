import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import { get } from 'lodash';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { IMark } from '../Nexus/entities/IMark';

interface IProps {
  name: string;
  min: number;
  max: number;
  step: number;
  marks?: IMark[];
  label?: string;
  text?: string;
  showValue?: boolean;
  className?: string;
}

const SliderCtrl = ({
  name,
  min,
  max,
  step,
  marks,
  label,
  text,
  showValue = true,
  className,
}: IProps): React.ReactElement => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <Box className={className}>
      {label && <span>{label}</span>}
      <FormControl fullWidth error={!!get(errors, name)}>
        <Stack
          width={'50%'}
          spacing={2}
          direction="row"
          sx={{ mb: 1 }}
          alignItems="center"
        >
          <Controller
            name={name}
            defaultValue={min}
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
                value={+field.value}
                id={name}
                sx={{
                  '& .MuiSlider-rail': {
                    color: 'var(--line-color-dark)',
                  },
                  '& .MuiSlider-thumb': {
                    width: '1.3rem',
                    height: '1.3rem',
                  },
                }}
              />
            )}
          />
          {text && <span>{text}</span>}
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
  label: '',
};
