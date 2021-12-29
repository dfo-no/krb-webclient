import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { format, isDate, isValid } from 'date-fns';
import enLocale from 'date-fns/locale/en-US';
import nbLocale from 'date-fns/locale/nb';
import React from 'react';
import Form from 'react-bootstrap/Form';
import {
  Controller,
  FieldError,
  FieldValues,
  UseControllerProps
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { DATETIME_ISO8601UTC } from '../common/Constants';

interface IProps<T> extends UseControllerProps<T> {
  error: FieldError | undefined;
  label: string;
  disabled?: boolean;
}

const localeMap: { [key: string]: Locale } = {
  en: enLocale,
  nb: nbLocale
};

const maskMap: { [key: string]: string } = {
  en: '__/__/____',
  nb: '__.__.____'
};

/**
 * @deprecated
 */
const ControlledDate = <T extends FieldValues>({
  name,
  control,
  error,
  label,
  disabled
}: IProps<T>): React.ReactElement => {
  const { i18n } = useTranslation();
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      locale={localeMap[i18n.language]}
    >
      <Form.Group controlId={name}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <DatePicker
              disabled={disabled}
              label={label}
              // onBlur={field.onBlur}
              mask={maskMap[i18n.language]}
              ref={field.ref}
              value={field.value}
              // inputFormat="dd.MM.yyyy"
              clearable
              clearText="Clear"
              onChange={(e: Date | null) => {
                if (e) {
                  if (isDate(e) && isValid(e)) {
                    const newValue = format(e, DATETIME_ISO8601UTC);
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
                  {...params}
                  error={!!error}
                  helperText={!!error && error.message}
                />
              )}
            />
          )}
        />
      </Form.Group>
    </LocalizationProvider>
  );
};

export default ControlledDate;

ControlledDate.defaultProps = {
  disabled: false
};
