import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { get } from 'lodash';
import { isDate, isValid } from 'date-fns';
import { useTranslation } from 'react-i18next';

import DateUtils from '../common/DateUtils';
import DFOPickerField from '../components/DFOPickerField/DFOPickerField';
import css from './FormProvider.module.scss';

interface IProps {
  name: string;
  label?: string;
  minDate?: string;
  maxDate?: string;
  color?: string;
}

const DateCtrl = ({
  name,
  label,
  minDate,
  maxDate,
  color,
}: IProps): React.ReactElement => {
  const {
    formState: { errors },
  } = useFormContext();

  const { i18n } = useTranslation();

  const maskMap: { [key: string]: string } = {
    en: '__/__/____',
    nb: '__.__.____',
  };

  const min = !!minDate ? new Date(minDate) : minDate;
  const max = !!maxDate ? new Date(maxDate) : maxDate;

  const getDate = (e: string | Date | null): string | Date | null => {
    if (e) {
      if (isDate(e) && isValid(e) && typeof e !== 'string') {
        return DateUtils.formatDate(e);
      }
    }
    return null;
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={DateUtils.localeMap[i18n.language]}
    >
      <Controller
        name={name}
        render={({ field }) => (
          <div className={css.FormProvider__DateCtrl}>
            <span className={css.FormProvider__DateCtrl__label}>{label}</span>
            <DatePicker
              {...field}
              mask={maskMap[i18n.language]}
              minDate={min}
              maxDate={max}
              onChange={(e) => field.onChange(getDate(e))}
              renderInput={(params) => (
                <DFOPickerField
                  _color={color}
                  {...params}
                  error={!!get(errors, name)}
                  helperText={get(errors, name)?.message ?? ''}
                />
              )}
            />
          </div>
        )}
      />
    </LocalizationProvider>
  );
};

export default DateCtrl;
