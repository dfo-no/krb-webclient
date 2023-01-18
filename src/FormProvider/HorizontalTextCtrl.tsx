import { FormControl, FormLabel, InputAdornment } from '@mui/material';
import { get } from 'lodash';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import classNames from 'classnames';

import DFOInput from '../components/DFOTextField/DFOTextField';
import css from './FormProvider.module.scss';

interface IProps {
  className?: string;
  name: string;
  label?: string;
  hintText?: string;
  placeholder: string;
  type?: string;
  size?: string;
  autoFocus?: boolean;
  adornment?: string;
  color?: string;
  defaultValue?: string | number;
  isDisabled?: boolean;
  id?: string;
}

const HorizontalTextCtrl = ({
  className,
  name,
  label,
  hintText,
  placeholder = '',
  type = 'text',
  size = '',
  autoFocus,
  adornment,
  color,
  defaultValue,
  isDisabled,
  id,
}: IProps): React.ReactElement => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl
      className={classNames([css.FormProvider, className])}
      error={!!get(errors, name)}
      sx={{ width: '100%' }}
    >
      <Controller
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <div className={css.HorizontalTextCtrl}>
            {label && <span aria-label={'label'}>{label}</span>}
            <DFOInput
              id={id}
              {...field}
              _color={color}
              placeholder={placeholder}
              type={type}
              endAdornment={
                <InputAdornment position="end">{adornment}</InputAdornment>
              }
              onWheel={(e) => (e.target as HTMLElement).blur()}
              error={!!get(errors, name)}
              disableUnderline
              sx={size === 'small' ? { height: 26 } : { height: 45 }}
              autoFocus={autoFocus}
              disabled={isDisabled}
            />
            {hintText && (
              <span className={css.HorizontalTextCtrl__hintText}>
                {hintText}
              </span>
            )}
          </div>
        )}
      />
      {!!get(errors, name) && (
        <FormLabel>{get(errors, name)?.message ?? ''}</FormLabel>
      )}
    </FormControl>
  );
};

export default HorizontalTextCtrl;
