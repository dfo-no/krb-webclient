import { Box, Button, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ErrorIcon from '@mui/icons-material/Error';

const useStyles = makeStyles({
  projectNotFoundContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    width: '100vw',
    height: '100vh',
    alignItems: 'center',
    paddingTop: 200
  },
  projectNotFoundPhoto: {
    height: 300,
    width: 300,
    color: 'red'
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

  return (
    <Box className={classes.projectNotFoundContainer}>
      <ErrorIcon className={classes.projectNotFoundPhoto} />
      <Box className={classes.projectNotFoundTitleButton}>
        <Typography variant="medium">{t('Project not found')}</Typography>
        <Button href="/workbench" variant="primary">
          {t('Tilbake til prosjekter')}
        </Button>
      </Box>
    </Box>
  );
}
