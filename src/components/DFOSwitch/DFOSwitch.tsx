import Switch from '@mui/material/Switch';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

interface DFOSwitchProps {
  element?: ControllerRenderProps<FieldValues, string>;
}

export const DFOSwitch = ({ element }: DFOSwitchProps): React.ReactElement => {
  return <Switch {...element} />;
};
