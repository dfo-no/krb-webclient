import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller, useFormContext } from 'react-hook-form';
import { get } from 'lodash';
import { isDate, isValid } from 'date-fns';
import { TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useTranslation } from 'react-i18next';

import DateUtils from '../common/DateUtils';
import DFOPickerField from '../components/DFOPickerField/DFOPickerField';

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
  maxTime,
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
          <TimePicker
            {...field}
            label={label}
            mask={maskMap[i18n.language]}
            minTime={min}
            maxTime={max}
            onChange={(e) => field.onChange(getDate(e))}
            renderInput={(params) => (
              <DFOPickerField
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
