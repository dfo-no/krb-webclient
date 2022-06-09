import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup/RadioGroup';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { get } from 'lodash';
import { Typography } from '@mui/material';

import theme from '../theme';
import { IOption } from '../Nexus/entities/IOption';
import { DFORadio } from '../components/DFORadio/DFORadio';

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
          control={<DFORadio />}
          label={
            <Typography variant={'sm'} color={theme.palette.black.main}>
              {option.label}
            </Typography>
          }
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
