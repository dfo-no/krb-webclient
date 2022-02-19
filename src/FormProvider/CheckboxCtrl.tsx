import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { get } from 'lodash';
import React, { JSXElementConstructor, ReactElement } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DFOCheckbox } from '../components/DFOCheckbox/DFOCheckbox';

interface IProps {
  name: string;
  label:
    | string
    | number
    | ReactElement<any, string | JSXElementConstructor<any>>;
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
      <Controller
        name={name}
        render={({ field }) => (
          <FormControlLabel
            control={<DFOCheckbox {...field} variant={variant} value={value} />}
            label={label}
          />
        )}
      />
      {!!get(errors, name) && (
        <FormLabel>{get(errors, name)?.message ?? ''}</FormLabel>
      )}
    </FormControl>
  );
};

export default CheckboxCtrl;
