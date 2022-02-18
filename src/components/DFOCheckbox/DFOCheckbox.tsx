import Checkbox from '@mui/material/Checkbox';
import CheckIcon from '@mui/icons-material/Check';
import { Box, makeStyles } from '@material-ui/core';
import { DFOCheckboxProps } from './DFOCheckboxProps';
import theme from '../../theme';

const useStyles = makeStyles({
  checkbox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '22px',
    height: '22px'
  },
  whiteCheckbox: {
    border: `2px solid ${theme.palette.dfoLightBlue.main}`,
    '& .MuiSvgIcon-root': {
      color: theme.palette.dfoLightBlue.main
    }
  },
  blueCheckbox: {
    border: `2px solid ${theme.palette.dfoBlue.main}`,
    '& .MuiSvgIcon-root': {
      color: 'white',
      backgroundColor: theme.palette.dfoBlue.main
    }
  }
});

export const DFOCheckbox = ({
  element,
  checked,
  variant
}: DFOCheckboxProps): React.ReactElement => {
  const classes = useStyles();

  const CheckboxWhiteBackgroundIcon = () => {
    return (
      <Box className={`${classes.checkbox} ${classes.whiteCheckbox}`}></Box>
    );
  };

  const CheckboxWhiteBackgroundCheckedIcon = () => {
    return (
      <Box className={`${classes.checkbox} ${classes.whiteCheckbox}`}>
        <CheckIcon />
      </Box>
    );
  };

  const CheckboxBlueBackgroundIcon = () => {
    return (
      <Box className={`${classes.checkbox} ${classes.blueCheckbox}`}></Box>
    );
  };

  const CheckboxBlueBackgroundCheckedIcon = () => {
    return (
      <Box className={`${classes.checkbox} ${classes.blueCheckbox}`}>
        <CheckIcon />
      </Box>
    );
  };

  const useCheckmarkBackground =
    variant === 'white'
      ? Object(<CheckboxWhiteBackgroundIcon />)
      : Object(<CheckboxBlueBackgroundIcon />);

  const useCheckmarkCheck =
    variant === 'white'
      ? Object(<CheckboxWhiteBackgroundCheckedIcon />)
      : Object(<CheckboxBlueBackgroundCheckedIcon />);

  return (
    <Checkbox
      {...element}
      icon={useCheckmarkBackground}
      checkedIcon={useCheckmarkCheck}
      checked={checked}
    />
  );
};
