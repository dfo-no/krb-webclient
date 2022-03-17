import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import SpecSideBar from '../SideBar/SpecSideBar';
import makeStyles from '@mui/styles/makeStyles';
import theme from '../../theme';
import byggernIllustration from '../../assets/images/byggern-illustration.svg';
import { useGetBankQuery } from '../../store/api/bankApi';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  editor: {
    display: 'flex',
    paddingTop: 30,
    height: '100%',
    backgroundColor: theme.palette.gray100.main
  },
  editorContent: {
    backgroundColor: '#efefef',
    width: '65%'
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
  const selectedBank = useAppSelector((state) => state.selectedBank);
  const { data: bankSelected } = useGetBankQuery(String(selectedBank.id));
  const { t } = useTranslation();

  const classes = useStyles();

  return (
    <Box className={classes.editor}>
      <SpecSideBar />
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
            <Typography variant="bigBoldBlue">{bankSelected?.title}</Typography>
            <Box className={classes.specEditorDescription}>
              <Typography variant="smedium">
                {t('Du er nå i gang med å bygge din kravspesifikasjon.')}
              </Typography>
              <Typography variant="smedium">
                {t(
                  'Start by creating the products you need for your procurement'
                )}
              </Typography>
              <Typography variant="smedium">
                {t(
                  'For hvert produkt finner du forhåndsdefinerte krav som kan passe til din anskaffelse.'
                )}
              </Typography>
              <Typography variant="smedium">
                {t(
                  'Husk at du må laste ned kravspesifikasjonen og lagre den lokalt på din PC.'
                )}
              </Typography>
            </Box>
          </Box>
          <Button variant="primary">Lag ditt første produkt</Button>
        </Box>
      </Box>
    </Box>
  );
}
