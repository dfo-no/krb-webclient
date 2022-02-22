import TextField from '@mui/material/TextField';
import theme from '../../theme';
import { Box, Typography } from '@mui/material/';
import { makeStyles } from '@material-ui/core';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

interface DFOTextFieldProps {
  element?: ControllerRenderProps<FieldValues, string>;
  value?: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  callback?: any;
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    backgroundColor: theme.palette.dfoWhite.main,
    '& .MuiInputBase-adornedEnd': {
      backgroundColor: theme.palette.dfoWhite.main,
      '&:hover': {
        background: theme.palette.dfoWhite.main
      }
    }
  },
  dfoTextFieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 11,
    width: '100%'
  }
});

export const DFOTextField = ({
  element,
  value,
  label,
  error,
  errorMessage
}: DFOTextFieldProps): React.ReactElement => {
  const borderColor = error
    ? theme.palette.dfoErrorRed.main
    : theme.palette.indigo.main;

  const fontColor = error
    ? theme.palette.dfoErrorRed.main
    : theme.palette.black.main;

  const styles = {
    borderColor: borderColor,
    fontColor: fontColor
  };

  const classes = useStyles(styles);

  return (
    <Box className={classes.dfoTextFieldContainer}>
      <TextField
        variant="outlined"
        {...element}
        className={classes.root}
        label={label}
        autoComplete="off"
        value={value || ''}
      />
      <Typography variant="formCtrlErrorMessage">{errorMessage}</Typography>
    </Box>
  );
};
