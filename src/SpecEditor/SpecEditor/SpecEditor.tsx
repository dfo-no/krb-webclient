import { Box, Button, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import byggernIllustration from '../../assets/images/byggern-illustration.svg';
import theme from '../../theme';
import { useSpecificationState } from '../SpecificationContext';

const useStyles = makeStyles({
  editor: {
    display: 'flex',
    width: '100%'
  },
  editorContent: {
    backgroundColor: theme.palette.gray200.main,
    width: '100%'
  },
  editorContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 34,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  specEditorText: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    gap: 6
  },
  specEditorDescription: {
    display: 'flex',
    gap: 3,
    flexDirection: 'column',
    textAlign: 'center'
  }
});

export default function SpecEditor(): React.ReactElement {
  const { t } = useTranslation();
  const { specification } = useSpecificationState();

  const classes = useStyles();

  return (
    <Box className={classes.editor}>
      <Box className={classes.editorContent}>
        {' '}
        <Box className={classes.editorContentContainer}>
          <img
            src={byggernIllustration}
            alt="main illustration"
            height="385"
            width="594"
          />
          <Box className={classes.specEditorText}>
            <Typography variant="xxlBold" color={theme.palette.primary.main}>
              {specification?.title}
            </Typography>
            <Box className={classes.specEditorDescription}>
              <Typography variant="md">
                {t('You are now building your spec')}
              </Typography>
              <Typography variant="md">
                {t(
                  'Start by creating the products you need for your procurement'
                )}
              </Typography>
              <Typography variant="md">
                {t(
                  'For every product you can find predefined banks that can fit your procurement'
                )}
              </Typography>
              <Typography variant="md">
                {t(
                  'Remember that you have to download the specification and save it locally on your computer'
                )}
              </Typography>
            </Box>
          </Box>
          <Button variant="primary">{t('Create your first product')}</Button>
        </Box>
      </Box>
    </Box>
  );
}
