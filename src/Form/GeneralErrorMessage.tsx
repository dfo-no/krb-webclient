import { FieldErrors, FieldValues } from 'react-hook-form';
import React from 'react';
import Alert from '@mui/material/Alert';
import { Typography } from '@mui/material/';
import { useTranslation } from 'react-i18next';

type Props<T extends FieldValues> = {
  errors: FieldErrors<T>;
};
export default function GeneralErrorMessage<T extends FieldValues>({
  errors,
}: Props<T>): React.ReactElement {
  const { t } = useTranslation();
  if (Object.keys(errors).length > 0) {
    return (
      <Alert severity="error" sx={{ marginTop: 1 }}>
        <Typography variant={'smBold'}>
          {t('Invalid value in the form Please fix this before saving')}
        </Typography>
      </Alert>
    );
  } else {
    return <></>;
  }
}
