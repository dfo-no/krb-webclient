import React from 'react';
import { useFormContext } from 'react-hook-form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import theme from '../theme';
import { makeStyles } from '@material-ui/core';

interface IProps {
  name: string;
  label?: string;
}

const useStyles = makeStyles({
  textCtrlField: {
    border: '1px solid red'
  }
});

const TextCtrl = ({ name, label }: IProps): React.ReactElement => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  const classes = useStyles();

  return (
    <Box component="form">
      <TextField
        required
        id="outlined-required"
        label="Required"
        defaultValue="Hello World"
        className={classes.textCtrlField}
      />
    </Box>
  );
};
export default TextCtrl;

TextCtrl.defaultProps = {
  label: ''
};
