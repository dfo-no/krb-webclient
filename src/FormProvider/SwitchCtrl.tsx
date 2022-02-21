import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DFOSwitch } from '../components/DFOSwitch/DFOSwitch';
import { get } from 'lodash';

interface IProps {
  name: string;
  label?: string;
}

const SwitchCtrl = ({ name, label }: IProps): React.ReactElement => {
  const {
    formState: { errors }
  } = useFormContext();

  return (
    <Controller
      name={name}
      render={({ field }) => <DFOSwitch element={field} />}
    />
  );
};

export default SwitchCtrl;
