import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { isDate, isValid } from 'date-fns';
import enLocale from 'date-fns/locale/en-US';
import nbLocale from 'date-fns/locale/nb';
import { get } from 'lodash';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import formatDate from '../common/DateUtils';
import theme from '../theme';
import makeStyles from '@mui/styles/makeStyles';
import { Box, Typography } from '@mui/material';

interface IProps {
  name: string;
  label?: string;
  minDate?: string;
  maxDate?: string;
}

const useStyles = makeStyles({
  datePicker: {
    '& .MuiOutlinedInput-root': {
      height: 45,
      borderRadius: 0,
      '& fieldset': {
        border: `2px solid ${theme.palette.primary.main}`
      },
      '&.Mui-focused fieldset': {
        border: `3px solid ${theme.palette.primary.main}`
      },
      '&:hover fieldset': {
        border: `3px solid ${theme.palette.primary.main}`
      }
    }
  }
});

const DateCtrl = ({
  name,
  label,
  minDate,
  maxDate
}: IProps): React.ReactElement => {
  const classes = useStyles();

  const {
    formState: { errors }
  } = useFormContext();

  const { i18n } = useTranslation();
  const localeMap: { [key: string]: Locale } = {
    en: enLocale,
    nb: nbLocale
  };

  const maskMap: { [key: string]: string } = {
    en: '__/__/____',
    nb: '__.__.____'
  };

  const min = minDate !== undefined ? new Date(minDate) : minDate;
  const max = maxDate !== undefined ? new Date(maxDate) : maxDate;

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      locale={localeMap[i18n.language]}
    >
      <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
        {label && (
          <Typography variant={'smBold'} color={theme.palette.primary.main}>
            {label}
          </Typography>
        )}
        <Controller
          name={name}
          render={({ field }) => (
            <DatePicker
              mask={maskMap[i18n.language]}
              ref={field.ref}
              minDate={min}
              maxDate={max}
              value={field.value}
              clearable
              clearText="Clear"
              onChange={(e: Date | null) => {
                if (e) {
                  if (isDate(e) && isValid(e)) {
                    const newValue = formatDate(e);
                    field.onChange(newValue);
                  } else {
                    field.onChange(e);
                  }
                } else {
                  field.onChange(null);
                }
              }}
              renderInput={(params) => (
                <TextField
                  className={classes.datePicker}
                  {...params}
                  error={!!get(errors, name)}
                  helperText={get(errors, name)?.message ?? ''}
                />
              )}
            />
          )}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default DateCtrl;

DateCtrl.defaultProps = {
  label: '',
  minDate: undefined,
  maxDate: undefined
};
