import React from 'react';
import Button from '@mui/material/Button';
import { FormButtonBox } from './FormButtonBox';
import { useTranslation } from 'react-i18next';

interface IProps {
  handleClose: () => void;
}

export default function FormButtons({
  handleClose
}: IProps): React.ReactElement {
  const { t } = useTranslation();

  return (
    <FormButtonBox>
      <Button variant="save" type="submit" aria-label="save">
        {t('save')}
      </Button>
      <Button
        variant="cancel"
        sx={{ marginLeft: 2 }}
        onClick={() => handleClose()}
        aria-label="close"
      >
        {t('cancel')}
      </Button>
    </FormButtonBox>
  );
}
