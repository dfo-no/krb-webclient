import Switch from '@mui/material/Switch';
import { Box, Typography } from '@mui/material/';
import makeStyles from '@mui/styles/makeStyles';
import { DFOSwitchProps } from './DFOSwitchProps';

const useStyles = makeStyles({
  dfoSwitchContainer: {},
  dfoSwitch: { display: 'flex', gap: 10, alignItems: 'center' },
  hideLabel: {
    display: 'none'
  },
  showLabel: {
    display: 'inline-flex'
  }
});

export const DFOSwitch = ({
  element,
  label,
  errorMessage
}: DFOSwitchProps): React.ReactElement => {
  const classes = useStyles();
  return (
    <Box className={classes.dfoSwitchContainer}>
      <Box className={classes.dfoSwitch}>
        <Typography
          className={`${label ? classes.showLabel : classes.hideLabel}`}
        >
          {label}
        </Typography>
        <Switch {...element} />
      </Box>
      <Box>
        <Typography variant="formCtrlErrorMessage">{errorMessage}</Typography>
      </Box>
    </Box>
  );
};
