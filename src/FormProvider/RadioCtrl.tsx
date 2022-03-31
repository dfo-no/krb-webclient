import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup/RadioGroup';
import { get } from 'lodash';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { IOption } from '../Nexus/entities/IOption';

interface IProps {
  name: string;
  options: IOption[];
  label?: string;
}

const RadioCtrl = ({ name, label, options }: IProps): React.ReactElement => {
  const {
    formState: { errors }
  } = useFormContext();

  const renderOptions = (opts: IOption[]) => {
    return opts.map((option) => {
      return (
        <FormControlLabel
          key={option.value}
          value={option.value}
          control={<Radio />}
          label={option.label}
        />
      );
    });
  };

  return (
    <FormControl error={!!get(errors, name)}>
      {label && <FormLabel id={name}>{label}</FormLabel>}
      <Controller
        name={name}
        render={({ field }) => (
          <RadioGroup row={true} {...field}>
            {renderOptions(options)}
          </RadioGroup>
        )}
      />
      {!!get(errors, name) && (
        <FormLabel>{get(errors, name)?.message ?? ''}</FormLabel>
      )}
    </FormControl>
  );
};

export default RadioCtrl;
