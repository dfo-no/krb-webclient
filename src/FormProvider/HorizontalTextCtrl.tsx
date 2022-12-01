import { FormControl, FormLabel, InputAdornment } from '@mui/material';
import { get } from 'lodash';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import DFOInput from '../components/DFOTextField/DFOTextField';

interface IProps {
  className?: string;
  name: string;
  label?: string;
  placeholder: string;
  type?: string;
  size?: string;
  autoFocus?: boolean;
  adornment?: string;
  color?: string;
  defaultValue?: string | number;
}

const HorizontalTextCtrl = ({
  className,
  name,
  label,
  placeholder = '',
  type = 'text',
  size = '',
  autoFocus,
  adornment,
  color,
  defaultValue,
}: IProps): React.ReactElement => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl
      className={className}
      error={!!get(errors, name)}
      sx={{ width: '100%' }}
    >
      <Controller
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <>
            {label && <span aria-label={'label'}>{label}</span>}
            <DFOInput
              {...field}
              _color={color}
              placeholder={placeholder}
              type={type}
              endAdornment={
                <InputAdornment position="end">{adornment}</InputAdornment>
              }
              onWheel={(e) => (e.target as HTMLElement).blur()}
              error={!!get(errors, name)}
              disableUnderline
              sx={size === 'small' ? { height: 26 } : { height: 45 }}
              autoFocus={autoFocus}
            />
          </>
        )}
      />
      {!!get(errors, name) && (
        <FormLabel>{get(errors, name)?.message ?? ''}</FormLabel>
      )}
    </FormControl>
  );
};

export default HorizontalTextCtrl;
