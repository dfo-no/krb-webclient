import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { get } from 'lodash';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import DFOTextField from '../components/DFOInput/DFOInput';
import { IOption } from '../Nexus/entities/IOption';
import theme from '../theme';

interface IProps {
  name: string;
  label: string;
  options: IOption[];
}

const SelectCtrl = ({ name, label, options }: IProps): React.ReactElement => {
  const {
    formState: { errors }
  } = useFormContext();

  return (
    <FormControl error={!!get(errors, name)} fullWidth>
      <FormLabel>
        <Typography variant="sm" color={theme.palette.primary.main}>
          {label}
        </Typography>
      </FormLabel>
      <Controller
        name={name}
        render={({ field }) => (
          <Select input={<DFOTextField />} {...field}>
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
