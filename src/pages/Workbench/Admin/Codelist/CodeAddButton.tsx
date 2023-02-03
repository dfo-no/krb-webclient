import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Typography } from '@mui/material/';

import { useButtonStyles } from './CodelistStyles';

interface Props {
  onClick: () => void;
}

export default function CodeAddButton({ onClick }: Props): React.ReactElement {
  const classes = useButtonStyles();
  const { t } = useTranslation();

  return (
    <Box className={classes.buttonContainer}>
      <Box className={classes.buttonTitle}>
        <Typography variant="smBold">{t('Code')}</Typography>
      </Box>
      <Box className={classes.button}>
        <Button variant="primary" onClick={onClick}>
          {t('Add new code')}
        </Button>
      </Box>
    </Box>
  );
}
