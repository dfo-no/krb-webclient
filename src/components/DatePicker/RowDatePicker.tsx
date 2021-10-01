import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { format, isDate, isValid } from 'date-fns';
import enLocale from 'date-fns/locale/en-US';
import nbLocale from 'date-fns/locale/nb';
// import { get, has, toPath } from 'lodash';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {
  Controller,
  FieldError,
  FieldValues,
  UseControllerProps
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { DATETIME_ISO8601UTC } from '../../common/Constants';

interface Props<T> extends UseControllerProps<T> {
  error: FieldError | undefined;
  label: string;
}

const localeMap: { [key: string]: Locale } = {
  en: enLocale,
  nb: nbLocale
};

const maskMap: { [key: string]: string } = {
  en: '__/__/____',
  nb: '__.__.____'
};

export default function RowDatePicker<T extends FieldValues>({
  control,
  name,
  error,
  label
}: Props<T>): React.ReactElement {
  const { t, i18n } = useTranslation();

  /* const hasError = (str: string) => {
    let retVal = null;
    const path = toPath(str);
    if (has(errors, path)) {
      retVal = true;
    } else {
      retVal = false;
    }
    return retVal;
  };

  const getError = (str: string) => {
    const path = toPath(str);
    path.push('message');
    return get(errors, path);
  }; */

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      locale={localeMap[i18n.language]}
    >
      <Form.Group>
        <Row className="is-invalid">
          <Form.Label column lg={2}>
            {t(label)}
          </Form.Label>

          <Col>
            <Controller
              name={name}
              control={control}
              render={({ field, fieldState, formState }) => (
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
          </Col>
        </Row>
        {!!error && (
          <Form.Control.Feedback type="invalid">
            {error.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    </LocalizationProvider>
  );
}
