import Switch from '@mui/material/Switch';
import { Box, Typography } from '@mui/material/';
import { createStyles, makeStyles } from '@material-ui/core';
import { DFOSwitchProps } from './DFOSwitchProps';

const useStyles = makeStyles(() =>
  createStyles({
    dfoSwitchContainer: {
      display: 'flex',
      gap: 30,
      alignItems: 'center'
    },
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
  label
}: DFOSwitchProps): React.ReactElement => {
  const classes = useStyles();
  return (
    <Box className={classes.dfoSwitchContainer}>
      <Box className={`${label ? classes.showLabel : classes.hideLabel}`}>
        <Typography>{label}</Typography>
      </Box>
      <Box>
        <Switch {...element} />
      </Box>
    </Box>
  );
};
