import Switch from '@mui/material/Switch';
import { makeStyles } from '@material-ui/core';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

interface DFOSwitchProps {
  element?: ControllerRenderProps<FieldValues, string>;
}

const useStyles = makeStyles({});

export const DFOSwitch = ({ element }: DFOSwitchProps): React.ReactElement => {
  return <Switch {...element} />;
};
