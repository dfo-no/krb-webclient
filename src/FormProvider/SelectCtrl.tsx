import { FormControl, FormLabel } from '@mui/material';
import { get } from 'lodash';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import DFOSelect from '../components/DFOSelect/DFOSelect';

interface IProps {
  name: string;
  label: string;
}

const SelectCtrl = ({ name, label }: IProps): React.ReactElement => {
  const {
    formState: { errors }
  } = useFormContext();

  const options = ['BMW', 'Mercedes', 'Volvo'];

  return (
    <FormControl error={!!get(errors, name)} sx={{ width: '100%' }}>
      <Controller
        name={name}
        render={({ field }) => <DFOSelect {...field} options={options} />}
      />
    </FormControl>
  );
};

export default SelectCtrl;
