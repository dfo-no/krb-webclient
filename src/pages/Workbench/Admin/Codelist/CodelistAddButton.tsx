import { useTranslation } from 'react-i18next';
import { Box, Button, Typography } from '@mui/material/';

import { useButtonStyles } from './CodelistStyles';

interface Props {
  onClick: () => void;
}

export default function CodelistAddButton({
  onClick,
}: Props): React.ReactElement {
  const classes = useButtonStyles();
  const { t } = useTranslation();

  return (
    <Box className={classes.buttonContainer}>
      <Box className={classes.buttonTitle}>
        <Typography variant="smBold">{t('Codelist')}</Typography>
      </Box>
      <Box className={classes.button}>
        <Button variant="primary" onClick={onClick}>
          {t('Add new codelist')}
        </Button>
      </Box>
    </Box>
  );
}
