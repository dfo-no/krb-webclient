import React, { ReactNode } from 'react';
import { FormControl, FormLabel, Input } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { get } from 'lodash';
import classNames from 'classnames';
import InputAdornment from '@mui/material/InputAdornment';
import CloseIcon from '@mui/icons-material/Close';

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
  searchInput?: string;
  setSearchInput?: React.ChangeEventHandler<HTMLInputElement>;
  onClear?: () => void;
  isClearIcon?: boolean;
}
const OrganizationFieldCtrl = ({
  className,
  name,
  label = '',
  placeholder = '',
  type = 'text',
  autoFocus,
  required,
  children,
  searchInput,
  setSearchInput,
  onClear,
  isClearIcon,
}: IProps): React.ReactElement => {
  const {
    formState: { errors },
  } = useFormContext();
  return (
    <FormControl
      className={classNames([css.FormProvider, className])}
      error={!!get(errors, name)}
    >
      <span className={css.InputLabel} data-required={required}>
        {label}
      </span>
      <Controller
        name={name}
        render={({ field }) => (
          <div className={css.OrganizationFieldCtrl}>
            <Input
              value={searchInput ? searchInput : field.value}
              onChange={setSearchInput}
              autoFocus={autoFocus}
              placeholder={placeholder}
              type={type}
              onWheel={(e) => (e.target as HTMLElement).blur()}
              endAdornment={
                isClearIcon && (
                  <InputAdornment position="end">
                    <CloseIcon onClick={onClear} className={css.ClearIcon} />
                  </InputAdornment>
                )
              }
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

export default OrganizationFieldCtrl;
