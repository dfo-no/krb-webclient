import React from 'react';
import { makeStyles, MenuItem, Select } from '@material-ui/core';
import { DFOSelectProps } from './DFOSelectProps';
import theme from '../../theme';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const useStyles = makeStyles({
  select: {
    width: '100%',
    border: `2px solid ${theme.palette.indigo.main}`,
    height: 48,
    paddingLeft: 20,
    '& .MuiInputBase-input': {
      backgroundColor: theme.palette.dfoWhite.main
    }
  },
  selectIcon: {
    color: theme.palette.gray700.main,
    fontSize: '38px !important'
  }
});

export default function DFOSelect({
  options
}: DFOSelectProps): React.ReactElement {
  const classes = useStyles();

  const SelectIcon = () => {
    return <KeyboardArrowDownIcon className={classes.selectIcon} />;
  };

  return (
    <Select
      className={classes.select}
      value={0}
      IconComponent={SelectIcon}
      disableUnderline
    >
      {options.map((element: any, index: any) => (
        <MenuItem key={index} value={index} selected>
          {element.name}
        </MenuItem>
      ))}
    </Select>
  );
}
