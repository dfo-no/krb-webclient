import TextField from '@mui/material/TextField';
import theme from '../../theme';
import { Box, Typography } from '@mui/material/';
import { makeStyles } from '@material-ui/core';
import { DFOTextFieldStyleProps } from './DFOTextFieldStyleProps';
import { DFOTextFieldProps } from './DFOTextFieldProps';

const useStyles = makeStyles({
  root: {
    '& .MuiInputLabel-root': {
      color: (props: DFOTextFieldStyleProps) => `${props.fontColor}`,
      lineHeight: '1.6rem'
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: (props: DFOTextFieldStyleProps) => `${props.fontColor}`,
      textAlign: 'center'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: (props: DFOTextFieldStyleProps) =>
          `2px solid ${props.borderColor}`,
        height: 67
      },
      '&:hover fieldset': {
        border: (props: DFOTextFieldStyleProps) =>
          `3px solid ${props.borderColor}`
      },
      '&.Mui-focused fieldset': {
        border: (props: DFOTextFieldStyleProps) =>
          `3px solid ${props.borderColor}`
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
