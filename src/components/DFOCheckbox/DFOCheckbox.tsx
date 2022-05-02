import Checkbox from '@mui/material/Checkbox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Box } from '@mui/material/';
import makeStyles from '@mui/styles/makeStyles';
import theme from '../../theme';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

interface DFOCheckboxProps {
  element?: ControllerRenderProps<FieldValues, string>;
  variant?: string;
  value?: boolean;
  onClick?: () => void;
}

const useStyles = makeStyles({
  checkbox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '22px',
    height: '22px'
  },
  allWhiteCheckbox: {
    border: `2px solid ${theme.palette.white.main}`,
    '& .MuiSvgIcon-root': {
      color: theme.palette.white.main
    }
  },
  blueCheckbox: {
    border: `2px solid ${theme.palette.primary.main}`,
    '& .MuiSvgIcon-root': {
      color: theme.palette.white.main,
      backgroundColor: theme.palette.primary.main
    }
  },
  blueBorderCheckbox: {
    border: `2px solid ${theme.palette.lightBlue.main}`,
    '& .MuiSvgIcon-root': {
      color: theme.palette.lightBlue.main
    }
  }
});

export const DFOCheckbox = ({
  element,
  value,
  variant,
  onClick = () => {}
}: DFOCheckboxProps): React.ReactElement => {
  const classes = useStyles();

  const checkboxes = {
    white: {
      icon: () => {
        return Object(
          <Box className={`${classes.checkbox} ${classes.allWhiteCheckbox}`} />
        );
      },
      checkedIcon: () => {
        return Object(
          <Box className={`${classes.checkbox} ${classes.allWhiteCheckbox}`}>
            <CheckBoxIcon />
          </Box>
        );
      }
    },
    blue: {
      icon: () => {
        return (
          <Box className={`${classes.checkbox} ${classes.blueCheckbox}`} />
        );
      },
      checkedIcon: () => {
        return (
          <Box className={`${classes.checkbox} ${classes.blueCheckbox}`}>
            <CheckBoxIcon />
          </Box>
        );
      }
    },
    blueBorder: {
      icon: () => {
        return Object(
          <Box
            className={`${classes.checkbox} ${classes.blueBorderCheckbox}`}
          />
        );
      },
      checkedIcon: () => {
        return Object(
          <Box className={`${classes.checkbox} ${classes.blueBorderCheckbox}`}>
            <CheckBoxIcon />
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
      onClick={onClick}
    />
  );
};
