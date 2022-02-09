import React from 'react';
import { Box, Button } from '@mui/material/';
import { makeStyles } from '@material-ui/core';
import TextCtrl from '../../../FormProvider/TextCtrl';
import { useTranslation } from 'react-i18next';

interface IProps {
  handleClose: () => void;
}

const useStyles = makeStyles({
  productFormContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  },
  productFormTextFields: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'column',
    gap: 10,
    width: '30vw',
    minWidth: '350px'
  },
  productFormButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: 10
  }
});

export default function NewCodeListForm({
  handleClose
}: IProps): React.ReactElement {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <Box className={classes.productFormContainer}>
        <Box className={classes.productFormTextFields}>
          <TextCtrl name="title" label={t('Title')} />
          <TextCtrl name="description" label={t('Description')} />
        </Box>

        <Box className={classes.productFormButtons}>
          <Button variant="primary" type="submit">
            {t('save')}
          </Button>
          <Button variant="primary" onClick={handleClose}>
            {t('cancel')}
          </Button>
        </Box>
      </Box>
    </>
  );
}
