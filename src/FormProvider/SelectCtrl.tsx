import { FormControl } from '@mui/material';
import { get } from 'lodash';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import DFOSelect from '../components/DFOSelect/DFOSelect';

interface IProps {
  name: string;
  options: string[];
}

const SelectCtrl = ({ name, options }: IProps): React.ReactElement => {
  const {
    formState: { errors }
  } = useFormContext();

  return (
    <FormControl error={!!get(errors, name)} sx={{ width: '100%' }}>
      <Controller
        name={name}
        render={({ field }) => <DFOSelect options={options} field={field} />}
      />
    </FormControl>
  );
};

export default SelectCtrl;
