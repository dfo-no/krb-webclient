import Switch from '@mui/material/Switch';
import { makeStyles } from '@material-ui/core';
import { DFOSwitchProps } from './DFOSwitchProps';

const useStyles = makeStyles({});

export const DFOSwitch = ({ element }: DFOSwitchProps): React.ReactElement => {
  const classes = useStyles();

  return <Switch {...element} />;
};
