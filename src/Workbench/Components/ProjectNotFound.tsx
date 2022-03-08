import { Box, Button, Link, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  projectNotFoundContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 40,
    gap: 20,
    width: '100vw',
    alignItems: 'center'
  },
  projectNotFoundPhoto: {
    height: 300,
    width: 300,
    backgroundColor: 'green'
  },
  projectNotFoundTitleButton: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  }
});

export default function Header(): React.ReactElement {
  const classes = useStyles();
  const { t } = useTranslation();

  console.log('YY');

  return (
    <Box className={classes.projectNotFoundContainer}>
      <Box className={classes.projectNotFoundPhoto}></Box>
      <Box className={classes.projectNotFoundTitleButton}>
        <Typography variant="medium">{t('Project not found')}</Typography>
        <Button href="/workbench" variant="primary">
          {t('Tilbake til prosjektliste')}
        </Button>
      </Box>
    </Box>
  );
}
