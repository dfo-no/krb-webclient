import Checkbox from '@mui/material/Checkbox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { makeStyles } from '@material-ui/core';
import { DFOCheckboxProps } from './DFOCheckboxProps';

const useStyles = makeStyles({
  root: {
    padding: 0,
    '& .MuiSvgIcon-root': {
      width: '30px',
      height: '30px',
      color: '#005B91'
    }
  }
});

export const DFOCheckbox = ({
  element
}: DFOCheckboxProps): React.ReactElement => {
  const classes = useStyles();
  return (
    <Checkbox
      {...element}
      className={classes.root}
      icon={<CheckBoxOutlineBlankIcon />}
      checkedIcon={<CheckBoxIcon />}
    />
  );
};
