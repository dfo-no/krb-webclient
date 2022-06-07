import React from 'react';
import { Button, Box, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';

const FormButtonBox = styled(Box)(() => ({
  display: 'flex',
  alignSelf: 'center',
  flexGrow: 1,
  flexDirection: 'row',
  marginLeft: 'auto'
}));

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
        {t('Save')}
      </Button>
      <Button
        variant="cancel"
        sx={{ marginLeft: 2 }}
        onClick={() => handleClose()}
        aria-label="close"
      >
        {t('Cancel')}
      </Button>
    </FormButtonBox>
  );
}
