import React, { ReactNode } from 'react';
import {
  FormControl,
  FormLabel,
  InputAdornment,
  Typography,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { get } from 'lodash';
import classNames from 'classnames';

import DFOInput from '../components/DFOTextField/DFOTextField';
import theme from '../theme';
import css from './FormProvider.module.scss';

interface IProps {
  className?: string;
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  autoFocus?: boolean;
  required?: boolean;
  children?: ReactNode;
  adornment?: string;
  color?: string;
  defaultValue?: string | number;
}

const VerticalTextCtrl = ({
  className,
  name,
  label = '',
  placeholder = '',
  type = 'text',
  autoFocus,
  required,
  children,
  adornment,
  color,
  defaultValue,
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
      <Typography
        variant={'mdBold'}
        color={theme.palette.primary.main}
        sx={{ marginBottom: 1 }}
        data-required={required}
      >
        {label}
      </Typography>
      <Controller
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <div className={css.VerticalTextCtrl} data-children={!!children}>
            <DFOInput
              {...field}
              autoFocus={autoFocus}
              placeholder={placeholder}
              endAdornment={
                <InputAdornment position="end">{adornment}</InputAdornment>
              }
              _color={color}
              type={type}
              onWheel={(e) => (e.target as HTMLElement).blur()}
              disableUnderline
            />
            {children}
          </div>
        )}
      />
      {!!get(errors, name) && (
        <FormLabel>{get(errors, name)?.message ?? ''}</FormLabel>
      )}
    </FormControl>
  );
};

export default VerticalTextCtrl;
