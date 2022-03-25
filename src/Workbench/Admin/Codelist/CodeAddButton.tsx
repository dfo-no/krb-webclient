import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Typography } from '@mui/material/';
import { useButtonStyles } from './CodelistStyles';

interface IProps {
  onClick: () => void;
}

export default function CodeAddButton({ onClick }: IProps): React.ReactElement {
  const classes = useButtonStyles();
  const { t } = useTranslation();

  return (
    <Box className={classes.buttonContainer}>
      <Box className={classes.buttonTitle}>
        <Typography>{t('Code')}</Typography>
      </Box>
      <Box className={classes.button}>
        <Button variant="primary" onClick={onClick}>
          {t('add new code')}
        </Button>
      </Box>
    </Box>
  );
}
