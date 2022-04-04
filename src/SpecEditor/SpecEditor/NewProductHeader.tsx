import { Box } from '@mui/material';
import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { useTranslation } from 'react-i18next';
import HorizontalTextCtrl from '../../FormProvider/HorizontalTextCtrl';
import theme from '../../theme';

const useStyles = makeStyles({
  newProductHeaderContent: {
    backgroundColor: theme.palette.gray200.main,
    width: '100%'
  },
  newProductHeaderContainer: {
    display: 'flex',
    backgroundColor: theme.palette.primary.main,
    padding: 20
  },
  newProductHeaderFields: {
    display: 'flex',
    flexBasis: '80%',
    paddingLeft: 100,
    flexDirection: 'column',
    gap: 9
  }
});

export default function NewProductForm(): React.ReactElement {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Box className={classes.newProductHeaderContent}>
      <Box className={classes.newProductHeaderContainer}>
        <Box className={classes.newProductHeaderFields}>
          <HorizontalTextCtrl name="name" placeholder={t('name of product')} />
          <HorizontalTextCtrl
            name="description"
            placeholder={t('description of the product')}
          />
        </Box>
      </Box>
    </Box>
  );
}
