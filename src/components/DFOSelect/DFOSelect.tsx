import React from 'react';
import { makeStyles, MenuItem, Select } from '@material-ui/core';
import { DFOSelectProps } from './DFOSelectProps';
import theme from '../../theme';

const useStyles = makeStyles({
  select: {
    width: '100%',
    border: `2px solid ${theme.palette.indigo.main}`,
    height: 67,
    paddingLeft: 20,

    '& .MuiInputBase-input': {
      backgroundColor: theme.palette.gray100.main
    }
  }
});

export default function DFOSelect({
  options
}: DFOSelectProps): React.ReactElement {
  const classes = useStyles();

  return (
    <Select className={classes.select} value={0} disableUnderline>
      {options.map((element: any, index: any) => (
        <MenuItem key={index} value={index} selected>
          {element.name}
        </MenuItem>
      ))}
    </Select>
  );
}
