import React from 'react';
import { Button, Box, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';

const FormButtonBox = styled(Box)(() => ({
  display: 'flex',
  alignSelf: 'center',
  flexGrow: 1,
  flexDirection: 'row',
  marginLeft: 'auto',
}));

interface IProps {
  handleCancel: () => void;
}

export default function FormButtons({
  handleCancel,
}: IProps): React.ReactElement {
  const { t } = useTranslation();

  return (
    <FormButtonBox>
      <Button variant="save" type="submit" aria-label="save">
        {t('Save')}
      </Button>
      <Button
        variant="cancel"
        sx={{ marginLeft: 2 }}
        onClick={() => handleCancel()}
        aria-label="close"
      >
        {t('common.Cancel')}
      </Button>
    </FormButtonBox>
  );
}
