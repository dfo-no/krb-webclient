import Checkbox from '@mui/material/Checkbox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Box, Typography } from '@mui/material/';
import { createStyles, makeStyles } from '@material-ui/core';
import { DFOCheckboxProps } from './DFOCheckboxProps';
import theme from '../../theme';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: 0
    },
    dfoCheckboxContainer: {
      display: 'flex',
      alignItems: 'center'
    },
    dfoCheckbox: {
      position: 'relative',
      paddingRight: '6px'
    },
    dfoCheckboxIcon: {
      width: '40px !important',
      height: '40px !important',
      color: theme.palette.dfoDarkBlue.main
    },
    hideLabel: {
      display: 'none'
    },
    showLabel: {
      display: 'inline-flex'
    }
  })
);

export const DFOCheckbox = ({
  element,
  defaultValue,
  label,
  error,
  errorMessage
}: DFOCheckboxProps): React.ReactElement => {
  const classes = useStyles();
  return (
    <Box className={classes.dfoCheckboxContainer}>
      <Box className={classes.dfoCheckbox}>
        <Checkbox
          {...element}
          defaultChecked={defaultValue}
          icon={
            <CheckBoxOutlineBlankIcon className={classes.dfoCheckboxIcon} />
          }
          checkedIcon={<CheckBoxIcon className={classes.dfoCheckboxIcon} />}
        />
      </Box>
      <Box className={`${label ? classes.showLabel : classes.hideLabel}`}>
        <Typography variant="mediumBlue">{label}</Typography>
      </Box>
      <Box className={`${error ? classes.showLabel : classes.hideLabel}`}>
        <Typography variant="formCtrlErrorMessage">{errorMessage}</Typography>
      </Box>
    </Box>
  );
};
