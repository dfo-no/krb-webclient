import { Button, Box, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';

const FormButtonBox = styled(Box)(() => ({
  display: 'flex',
  alignSelf: 'center',
  flexGrow: 1,
  flexDirection: 'row',
  marginLeft: 'auto',
}));

interface Props {
  handleCancel: () => void;
}

export const FormButtons = ({ handleCancel }: Props) => {
  const { t } = useTranslation();

  return (
    <FormButtonBox>
      <Button
        variant="cancel"
        onClick={() => handleCancel()}
        aria-label="close"
      >
        {t('common.Cancel')}
      </Button>
      <Button
        variant="save"
        sx={{ marginLeft: 2 }}
        type="submit"
        aria-label="save" // TODO: check if this is good practive
      >
        {t('Save')}
      </Button>
    </FormButtonBox>
  );
};
