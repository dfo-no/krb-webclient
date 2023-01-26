import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller, useFormContext } from 'react-hook-form';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { get } from 'lodash';
import { isDate, isValid } from 'date-fns';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

import DateUtils from '../common/DateUtils';
import DFOPickerField from '../components/DFOPickerField/DFOPickerField';
import css from './FormProvider.module.scss';

interface IProps {
  name: string;
  label?: string;
  minDate?: string;
  maxDate?: string;
  color?: string;
  className?: string;
  isDisabled?: boolean;
}

const DateCtrl = ({
  name,
  label,
  minDate,
  maxDate,
  color,
  className,
  isDisabled,
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
          <div
            className={classnames(css.FormProvider__DateAndTimeCtrl, className)}
            data-disabled={isDisabled}
          >
            {label && (
              <span className={css.FormProvider__DateAndTimeCtrl__label}>
                {label}
              </span>
            )}
            <DesktopDatePicker
              {...field}
              mask={maskMap[i18n.language]}
              minDate={min}
              maxDate={max}
              onChange={(e) => field.onChange(getDate(e))}
              disabled={isDisabled}
              renderInput={(params) => (
                <DFOPickerField
                  sx={{ backgroundColor: 'var(--white-color)' }}
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
