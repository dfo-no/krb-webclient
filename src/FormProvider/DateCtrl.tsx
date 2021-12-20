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

interface IProps {
  name: string;
  label?: string;
}

const DateCtrl = ({ name, label }: IProps): React.ReactElement => {
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

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      locale={localeMap[i18n.language]}
    >
      <Controller
        name={name}
        render={({ field }) => (
          <DatePicker
            label={label}
            mask={maskMap[i18n.language]}
            ref={field.ref}
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
                {...params}
                error={!!get(errors, name)}
                helperText={get(errors, name)?.message ?? ''}
              />
            )}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DateCtrl;

DateCtrl.defaultProps = {
  label: ''
};
