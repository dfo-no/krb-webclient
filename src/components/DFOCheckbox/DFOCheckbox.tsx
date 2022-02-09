import Checkbox from '@mui/material/Checkbox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Box, Typography } from '@mui/material/';
import { makeStyles } from '@material-ui/core';
import { DFOCheckboxProps } from './DFOCheckboxProps';
import theme from '../../theme';

const useStyles = makeStyles({
  root: {
    padding: 0,
    '& .MuiSvgIcon-root': {
      width: '40px',
      height: '40px',
      color: theme.palette.dfoDarkBlue.main
    }
  },
  dfoCheckboxContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  dfoCheckbox: {
    position: 'relative',
    paddingRight: '6px'
  },
  hideLabel: {
    display: 'none'
  },
  showLabel: {
    display: 'inline-flex'
  }
});

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
          className={classes.root}
          defaultChecked={defaultValue}
          icon={<CheckBoxOutlineBlankIcon />}
          checkedIcon={<CheckBoxIcon />}
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
