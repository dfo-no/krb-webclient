import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DFOSwitch } from '../components/DFOSwitch/DFOSwitch';

interface IProps {
  name: string;
  label?: string;
}

const SwitchCtrl = ({ name, label }: IProps): React.ReactElement => {
  return (
    <Controller
      name={name}
      render={({ field }) => <DFOSwitch element={field} label={label} />}
    />
  );
};

export default SwitchCtrl;
