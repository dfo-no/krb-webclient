import { Box, Button, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ErrorIcon from '@mui/icons-material/Error';
import { useHistory } from 'react-router';
import theme from '../../theme';

const useStyles = makeStyles({
  projectNotFoundContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    width: '100vw',
    alignItems: 'center',
    paddingTop: 200
  },
  projectNotFoundTitle: {
    fontSize: 20
  },
  projectNotFoundPhoto: {
    height: 300,
    width: 300,
    color: theme.palette.dfoErrorRed.main
  },
  projectNotFoundTitleButton: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  }
});

export default function ProjectNotFound(): React.ReactElement {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <Box className={classes.projectNotFoundContainer}>
      <ErrorIcon className={classes.projectNotFoundPhoto} />
      <Box className={classes.projectNotFoundTitleButton}>
        <Typography className={classes.projectNotFoundTitle}>
          {t('Project not found')}
        </Typography>
        <Button variant="primary" onClick={() => history.push('/workbench')}>
          {t('Tilbake til prosjekter')}
        </Button>
      </Box>
    </Box>
  );
}
