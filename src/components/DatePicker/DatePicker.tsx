import { KeyboardDatePicker } from '@material-ui/pickers';
import { get, has, toPath } from 'lodash';
import React, { ReactElement } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  errors: FieldErrors;
  label: string;
}

export default function DatePicker({
  control,
  name,
  errors,
  label
}: IProps): ReactElement {
  const { t } = useTranslation();

  const hasError = (str: string) => {
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
  };

  return (
    <Form.Group>
      <Form.Row className="is-invalid">
        <Form.Label column lg={2}>
          {t(label)}
        </Form.Label>

        <Col>
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <KeyboardDatePicker
                margin="none"
                /* margin="normal" */
                id="date-picker-dialog"
                /* variant="inline" */
                format="dd.MM.yyyy"
                inputVariant="standard"
                /* label={t('Select date')} */
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
        </Col>
      </Form.Row>
      {hasError(name) && (
        <Form.Control.Feedback type="invalid">
          {getError(name)}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}
