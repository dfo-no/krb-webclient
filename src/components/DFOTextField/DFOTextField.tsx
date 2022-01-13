import TextField from '@mui/material/TextField';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import theme from '../../theme';
import { Box, Typography } from '@mui/material/';
import { createStyles, makeStyles } from '@material-ui/core';
import { DFOTextFieldStyleProps } from './DFOTextFieldStyleProps';

interface IProps {
  textField?: ControllerRenderProps<FieldValues, string>;
  value?: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      '& .MuiInputLabel-root': {
        color: (props: DFOTextFieldStyleProps) => `${props.fontColor}`,
        lineHeight: '1.7rem'
      },
      '& .MuiInputLabel-root.Mui-focused': {
        color: (props: DFOTextFieldStyleProps) => `${props.fontColor}`,
        fontSize: '1.063rem'
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
  })
);

export const DFOTextField = ({
  textField,
  value,
  label,
  error,
  errorMessage
}: IProps): React.ReactElement => {
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
        {...textField}
        className={classes.root}
        label={label}
        autoComplete="off"
        value={value || ''}
      />
      <Typography variant="textCtrlErrorMessage">{errorMessage}</Typography>
    </Box>
  );
};
