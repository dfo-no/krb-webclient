import { joiResolver } from '@hookform/resolvers/joi';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import Joi from 'joi';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import CheckboxCtrl from '../../../FormProvider/CheckboxCtrl';
import { IInheritedBank } from '../../../models/IInheritedBank';
import theme from '../../../theme';
import InheritanceTagList from './InheritedBankTagList';

export interface IProps {
  bank: IInheritedBank;
}

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
    backgroundColor: theme.palette.white.main,
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

export default function InheritedBankAccordionBody({
  bank
}: IProps): React.ReactElement {
  const { t } = useTranslation();
  const classes = useStyles();

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
            <Typography variant="smBold">
              {t('Which version of the bank to inherit')}
            </Typography>
            <Box className={classes.selectContainer}>
              {/*      <DFOSelect options={versions} /> */}
            </Box>
          </Box>
          <Box className={classes.inheritPartsContainer}>
            <Typography variant="smBold">
              {t('Which parts of the bank to inherit')}
            </Typography>
            <Box className={classes.partsCheckBoxSaveButtonContainer}>
              <CheckboxCtrl
                variant="blueborder"
                name="name"
                label={
                  <Typography variant="sm" color={theme.palette.gray700.main}>
                    Arv hele kravsettet
                  </Typography>
                }
              />
              <Button variant="save">{t('Save changes')}</Button>
            </Box>
          </Box>
        </Box>
        <Box className={classes.tagList}>
          <InheritanceTagList bank={bank} />
        </Box>
      </form>
    </FormProvider>
  );
}
