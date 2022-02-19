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
  allWhiteCheckbox: {
    border: `2px solid ${theme.palette.dfoWhite.main}`,
    '& .MuiSvgIcon-root': {
      color: theme.palette.dfoWhite.main
    }
  },
  blueCheckbox: {
    border: `2px solid ${theme.palette.dfoBlue.main}`,
    '& .MuiSvgIcon-root': {
      color: 'white',
      backgroundColor: theme.palette.dfoBlue.main
    }
  },
  blueBorderCheckbox: {
    border: `2px solid ${theme.palette.dfoLightBlue.main}`,
    '& .MuiSvgIcon-root': {
      color: theme.palette.dfoLightBlue.main
    }
  }
});

export const DFOCheckbox = ({
  element,
  value,
  variant
}: DFOCheckboxProps): React.ReactElement => {
  const classes = useStyles();

  const checkboxes = {
    white: {
      icon: () => {
        return Object(
          <Box
            className={`${classes.checkbox} ${classes.allWhiteCheckbox}`}
          ></Box>
        );
      },
      checkedIcon: () => {
        return Object(
          <Box className={`${classes.checkbox} ${classes.allWhiteCheckbox}`}>
            <CheckIcon />
          </Box>
        );
      }
    },
    blue: {
      icon: () => {
        return (
          <Box className={`${classes.checkbox} ${classes.blueCheckbox}`}></Box>
        );
      },
      checkedIcon: () => {
        return (
          <Box className={`${classes.checkbox} ${classes.blueCheckbox}`}>
            <CheckIcon />
          </Box>
        );
      }
    },
    blueBorder: {
      icon: () => {
        return Object(
          <Box
            className={`${classes.checkbox} ${classes.blueBorderCheckbox}`}
          ></Box>
        );
      },
      checkedIcon: () => {
        return Object(
          <Box className={`${classes.checkbox} ${classes.blueBorderCheckbox}`}>
            <CheckIcon />
          </Box>
        );
      }
    }
  };

  let checkboxType = {
    icon: checkboxes.blue.icon,
    checkedIcon: checkboxes.blue.checkedIcon
  };

  switch (variant) {
    case 'white':
      checkboxType = {
        icon: checkboxes.white.icon,
        checkedIcon: checkboxes.white.checkedIcon
      };
      break;
    case 'blueBorder':
      checkboxType = {
        icon: checkboxes.blueBorder.icon,
        checkedIcon: checkboxes.blueBorder.checkedIcon
      };
      break;
  }

  return (
    <Checkbox
      {...element}
      icon={<checkboxType.icon />}
      checkedIcon={<checkboxType.checkedIcon />}
      checked={value}
    />
  );
};
