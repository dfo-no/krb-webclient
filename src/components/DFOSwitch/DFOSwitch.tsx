import Switch from '@mui/material/Switch';
import { Box, Typography } from '@mui/material/';
import { createStyles, makeStyles } from '@material-ui/core';
import { DFOSwitchProps } from './DFOSwitchProps';

const useStyles = makeStyles(() =>
  createStyles({
    dfoSwitchContainer: {},
    dfoSwitch: { display: 'flex', gap: 10, alignItems: 'center' },
    hideLabel: {
      display: 'none'
    },
    showLabel: {
      display: 'inline-flex'
    }
  })
);

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
      <Box></Box>
    </Box>
  );
};
