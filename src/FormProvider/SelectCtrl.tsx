import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { get } from 'lodash';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import DFOTextField from '../components/DFOTextField/DFOTextField';
import { IOption } from '../Nexus/entities/IOption';
import theme from '../theme';
import css from './FormProvider.module.scss';

interface IProps {
  name: string;
  label: string;
  options: IOption[];
  required?: boolean;
}

const SelectCtrl = ({
  name,
  label,
  options,
  required,
}: IProps): React.ReactElement => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl
      className={css.FormProvider}
      error={!!get(errors, name)}
      fullWidth
    >
      {label && (
        <Typography
          variant="smBold"
          color={theme.palette.primary.main}
          sx={{ marginBottom: 1 }}
          data-required={required}
        >
          {label}
        </Typography>
      )}
      <Controller
        name={name}
        render={({ field }) => (
          <Select input={<DFOTextField />} {...field} disableUnderline>
            {options.map((option) => {
              return (
                <MenuItem value={option.value} key={option.value}>
                  {option.label}
                </MenuItem>
              );
            })}
          </Select>
        )}
      />
      {!!get(errors, name) && (
        <FormLabel>{get(errors, name)?.message ?? ''}</FormLabel>
      )}
    </FormControl>
  );
};

export default SelectCtrl;
