import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopTimePicker from '@mui/lab/DesktopTimePicker';
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
  minTime?: string;
  maxTime?: string;
}

const TimeCtrl = ({
  name,
  label,
  minTime,
  maxTime
}: IProps): React.ReactElement => {
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

  const min = minTime !== undefined ? new Date(minTime) : minTime;
  const max = maxTime !== undefined ? new Date(maxTime) : maxTime;

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      locale={localeMap[i18n.language]}
    >
      <Controller
        name={name}
        render={({ field }) => (
          <DesktopTimePicker
            label={label}
            mask={maskMap[i18n.language]}
            ref={field.ref}
            value={field.value}
            minTime={min}
            maxTime={max}
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

export default TimeCtrl;

TimeCtrl.defaultProps = {
  label: '',
  minTime: undefined,
  maxTime: undefined
};
