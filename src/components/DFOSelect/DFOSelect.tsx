import React from 'react';
import theme from '../../theme';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import makeStyles from '@mui/styles/makeStyles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export interface DFOSelectProps {
  options: any;
}

const useStyles = makeStyles({
  select: {
    width: '100%',
    border: `2px solid ${theme.palette.indigo.main}`,
    height: 60,
    paddingLeft: 20,
    '& .MuiInputBase-input': {
      backgroundColor: theme.palette.dfoWhite.main
    }
  },
  selectIcon: {
    color: theme.palette.gray700.main,
    marginRight: 8,
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
    <Select className={classes.select} value={0} IconComponent={SelectIcon}>
      {options.map((element: any, index: number) => (
        <MenuItem key={index} value={index} selected>
          {element.name}
        </MenuItem>
      ))}
    </Select>
  );
}
