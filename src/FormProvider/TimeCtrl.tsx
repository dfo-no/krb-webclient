import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller, useFormContext } from 'react-hook-form';
import { get } from 'lodash';
import { isDate, isValid } from 'date-fns';
import { DesktopTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

import DateUtils from '../common/DateUtils';
import DFOPickerField from '../components/DFOPickerField/DFOPickerField';
import css from './FormProvider.module.scss';

interface IProps {
  name: string;
  label?: string;
  minTime?: string;
  maxTime?: string;
  color?: string;
  className?: string;
  isDisabled?: boolean;
}

const TimeCtrl = ({
  name,
  label,
  minTime,
  maxTime,
  color,
  className,
  isDisabled,
}: IProps): React.ReactElement => {
  const {
    formState: { errors },
  } = useFormContext();

  const { i18n } = useTranslation();
  const maskMap: { [key: string]: string } = {
    en: '__:__',
    nb: '__:__',
  };

  const min = !!minTime ? new Date(minTime) : minTime;
  const max = !!maxTime ? new Date(maxTime) : minTime;

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
            <DesktopTimePicker
              {...field}
              mask={maskMap[i18n.language]}
              minTime={min}
              maxTime={max}
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

export default TimeCtrl;
