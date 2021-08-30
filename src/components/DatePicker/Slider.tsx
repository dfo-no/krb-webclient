import Slider from '@material-ui/core/Slider';
import { get, has, toPath } from 'lodash';
import React, { ReactElement } from 'react';
import Form from 'react-bootstrap/Form';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  errors: FieldErrors;
  label: string;
  min: number;
  max: number;
  step: number;
}

export default function SliderSelect({
  control,
  name,
  errors,
  label,
  min,
  max,
  step
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
        <Form.Label column lg={4}>
          {t(label)}
        </Form.Label>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Slider
              name={field.name}
              value={field.value}
              onBlur={field.onBlur}
              ref={field.ref}
              onChange={(_, value) => {
                field.onChange(value);
              }}
              min={min}
              max={max}
              step={step}
            />
          )}
        />
      </Form.Row>
      {hasError(name) && (
        <Form.Control.Feedback type="invalid">
          {getError(name)}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}
