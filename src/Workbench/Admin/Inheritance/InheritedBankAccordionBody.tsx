import { Box, makeStyles } from '@material-ui/core';
import { Button, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import theme from '../../../theme';
import { FormProvider, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import CheckboxCtrl from '../../../FormProvider/CheckboxCtrl';
import InheritanceTagList from './InheritedBankTagList';
import DFOSelect from '../../../components/DFOSelect/DFOSelect';

interface IFormValues {
  inherit: {
    version: string | null;
    part: string | null;
  };
}

const FormSchema = Joi.object().keys({
  inherit: Joi.object().keys({
    version: Joi.string().max(20).required(),
    part: Joi.number().required()
  })
});

const useStyles = makeStyles({
  bankBodyContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 30,
    backgroundColor: theme.palette.dfoWhite.main,
    paddingTop: 30,
    paddingBottom: 30
  },
  inheritVersionContainer: {
    display: 'flex',
    gap: 12,
    flexDirection: 'column',
    margin: 'auto',
    width: '50vw'
  },
  selectContainer: {
    width: '70%'
  },
  inheritPartsContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: '50vw'
  },
  partsCheckBoxSaveButtonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 12
  },
  tagList: {
    paddingBottom: 30
  }
});

export default function InheritancePage(): React.ReactElement {
  const { t } = useTranslation();
  const classes = useStyles();

  // This is dummy data. Replace with real data.
  const versions = [
    { name: 'Tronds versjon; 1. des. 2021' },
    { name: 'Oslo kommune; 1. des. 2021' }
  ];

  const defaultValues: IFormValues = {
    inherit: {
      version: null,
      part: null
    }
  };

  const methods = useForm<IFormValues>({
    resolver: joiResolver(FormSchema),
    defaultValues
  });

  const saveValues = (data: IFormValues) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(saveValues)}>
        <Box className={classes.bankBodyContainer}>
          <Box className={classes.inheritVersionContainer}>
            <Typography variant="smallBold">
              {t('Which version of the bank to inherit')}
            </Typography>
            <Box className={classes.selectContainer}>
              <DFOSelect options={versions} />
            </Box>
          </Box>
          <Box className={classes.inheritPartsContainer}>
            <Typography variant="smallBold">
              {t('Which parts of the bank to inherit')}
            </Typography>
            <Box className={classes.partsCheckBoxSaveButtonContainer}>
              <CheckboxCtrl
                variant="blue"
                name="name"
                label="Arv hele kravsettet"
              />
              <Button variant="save">{t('save changes')}</Button>
            </Box>
          </Box>
        </Box>
        <Box className={classes.tagList}>
          <InheritanceTagList />
        </Box>
      </form>
    </FormProvider>
  );
}
