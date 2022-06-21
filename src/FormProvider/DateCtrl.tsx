import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import enLocale from 'date-fns/locale/en-US';
import nbLocale from 'date-fns/locale/nb';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { get } from 'lodash';
import { isDate, isValid } from 'date-fns';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

import DateUtils from '../common/DateUtils';
import theme from '../theme';
import DFOPickerField from '../components/DFOPickerField/DFOPickerField';

interface IProps {
  name: string;
  label?: string;
  minDate?: string;
  maxDate?: string;
}

const DateCtrl = ({
  name,
  label,
  minDate,
  maxDate
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

  const min = !!minDate ? new Date(minDate) : minDate;
  const max = !!maxDate ? new Date(maxDate) : maxDate;

  const getDate = (e: Date | null): string | Date | null => {
    if (e) {
      if (isDate(e) && isValid(e)) {
        return DateUtils.formatDate(e);
      }
      return e;
    }
    return null;
  };

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
              clearText={t('Clear')}
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
