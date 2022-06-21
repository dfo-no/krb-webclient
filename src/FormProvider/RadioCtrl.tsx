import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup/RadioGroup';
import React, { ReactElement } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { get } from 'lodash';
import { Typography } from '@mui/material';

import theme from '../theme';
import { DFORadio } from '../components/DFORadio/DFORadio';
import { IOption } from '../Nexus/entities/IOption';

interface IProps {
  className?: string;
  name: string;
  options: IOption[];
  label?: string;
}

const RadioCtrl = ({
  className,
  name,
  options,
  label
}: IProps): ReactElement => {
  const {
    formState: { errors }
  } = useFormContext();

  const renderOptions = (opts: IOption[]): ReactElement[] => {
    return opts.map((option) => {
      const formLabel: ReactElement = (
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
      if (option.recommended) {
        return <b key={option.value}>{formLabel}</b>;
      }
      return formLabel;
    });
  };

  return (
    <FormControl className={className} error={!!get(errors, name)}>
      {label && <FormLabel id={name}>{label}</FormLabel>}
      <Controller
        name={name}
        defaultValue={options[0]}
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
