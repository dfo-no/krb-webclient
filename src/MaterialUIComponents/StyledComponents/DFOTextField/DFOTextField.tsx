import TextField from '@mui/material/TextField';
import theme from '../../../theme';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core';

interface IProps {
  textField?: any;
  label?: string;
  error?: boolean;
  errorMessage?: string;
}

const useStyles = makeStyles({
  textFieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  },
  textField: {
    width: 300
  }
});

export const DFOTextField = ({
  textField,
  label,
  error,
  errorMessage
}: IProps): React.ReactElement => {
  const classes = useStyles();

  const borderColor = error
    ? theme.palette.dfoErrorRed.main
    : theme.palette.indigo.main;

  return (
    <div className={classes.textFieldContainer}>
      <Box
        component="form"
        sx={{
          // Normal
          '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            border: `2px solid ${borderColor}`,
            height: '67px'
          },
          // Border hover
          '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            border: `3px solid ${borderColor}`
          },
          // Border focus
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
            {
              border: `3px solid ${borderColor}`
            },
          // Label color no hover or focus
          '& .MuiInputLabel-root': {
            color: theme.palette.black.main,
            lineHeight: '1.626rem',
            fontSize: '1.125rem'
          },
          // Label color hover
          '&:hover .MuiInputLabel-root': {
            color: 'red'
          },
          // Label color focus
          '& .MuiInputLabel-root.Mui-focused': {
            color: theme.palette.black.main,
            fontSize: '1.063rem'
          }
        }}
        autoComplete="off"
      >
        <TextField
          {...textField}
          InputProps={{
            className: classes.textField
          }}
          error={error}
          value=""
          label={label}
        />
      </Box>
      <Typography variant="textCtrlErrorMessage">{errorMessage}</Typography>
    </div>
  );
};
