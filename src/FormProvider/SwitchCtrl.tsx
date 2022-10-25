import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup/RadioGroup';
import { get } from 'lodash';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { DFOSwitch } from '../components/DFOSwitch/DFOSwitch';

interface IProps {
  name: string;
  label: string;
}

const SwitchCtrl = ({ name, label }: IProps): React.ReactElement => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl error={!!get(errors, name)}>
      <Controller
        name={name}
        render={({ field }) => (
          <RadioGroup row={true} {...field}>
            <FormControlLabel control={<DFOSwitch />} label={label} />
          </RadioGroup>
        )}
      />
      {!!get(errors, name) && (
        <FormLabel>{get(errors, name)?.message ?? ''}</FormLabel>
      )}
    </FormControl>
  );
};

export default SwitchCtrl;
