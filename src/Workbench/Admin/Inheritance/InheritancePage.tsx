import { Box, Grid, makeStyles } from '@material-ui/core';
import { Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DFOSearchBar from '../../../components/DFOSearchBar/DFOSearchBar';
import { useAppSelector } from '../../../store/hooks';
import theme from '../../../theme';
import {
  DFOAccordionElement,
  DFOAccordionProvider
} from '../../../components/DFOAccordion/DFOAccordion';
import { FormProvider, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import CheckboxCtrl from '../../../FormProvider/CheckboxCtrl';
import InheritanceTagList from './InheritanceTagList';
import DFOSelect from '../../../components/DFOSelect/DFOSelect';
import { IInheritedBank } from '../../../models/IInheritedBank';

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
  bankItem: {
    width: '100%',
    height: 70
  },
  titleOptions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    borderBottom: `1px solid ${theme.palette.black.main}`,
    paddingBottom: 6,
    marginRight: 30
  },
  titleVersion: {
    display: 'flex',
    gap: 5
  },
  endContainer: {
    display: 'flex'
  },
  closeIcon: {
    color: theme.palette.gray700.main,
    fontSize: '28px !important'
  },
  description: { paddingTop: 5 },
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
    paddingLeft: 12,

    [theme.breakpoints.down('mdd')]: {
      flexDirection: 'column',
      gap: 10
    }
  },
  accordionElement: {
    marginBottom: 14
  },
  inheritanceContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 40,
    gap: 30,
    margin: 'auto',
    width: '55.5vw',
    paddingBottom: 30
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 100
  },
  searchBarContainer: {
    flex: 1,
    minWidth: 300,
    alignSelf: 'center'
  },
  fill: {
    flex: 1,
    alignSelf: 'center'
  },
  partsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

export default function InheritancePage(): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const { t } = useTranslation();
  const classes = useStyles();

  // This is dummy data. Replace with real data.
  const versions = [
    { name: 'Tronds versjon; 1. des. 2021' },
    { name: 'Oslo kommune; 1. des. 2021' }
  ];

  const parts = [
    { name: 'arvHele', label: 'Arv hele kravsettet' },
    { name: 'arvDelEn', label: 'Arv del en' },
    { name: 'arvDelTo', label: 'Arv del to' },
    { name: 'arvDelTre', label: 'Arv del tre' },
    { name: 'arvDelFire', label: 'Arv del fire' },
    { name: 'arvDelFem', label: 'Arv del fem' }
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

  const inheritanceSearch = () => {};
  const searchFieldCallback = () => {};

  const renderBankHeader = (bank: IInheritedBank) => {
    return (
      <Box className={classes.bankItem}>
        <Box className={classes.titleOptions}>
          <Box className={classes.titleVersion}>
            <Typography variant="mediumBold">{bank.title}; </Typography>
            <Typography variant="medium">{t('versjon')}</Typography>
          </Box>
          <Box className={classes.endContainer}>
            <CloseIcon className={classes.closeIcon} />
          </Box>
        </Box>
        <Box className={classes.description}>
          <Typography variant="small">{bank.description}</Typography>
        </Box>
      </Box>
    );
  };

  const renderBankBody = () => {
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
                <Box className={classes.partsContainer}>
                  {parts.map((part) => {
                    return (
                      <CheckboxCtrl
                        variant="blue"
                        name={part.name}
                        label={part.label}
                      />
                    );
                  })}
                </Box>
                <Button variant="save">{t('save changes')}</Button>
              </Box>
            </Box>
            <Box>
              <InheritanceTagList />
            </Box>
          </Box>
        </form>
      </FormProvider>
    );
  };

  const renderInheritedBanks = (inheritedBanksList: IInheritedBank[]) => {
    return inheritedBanksList.map((element: IInheritedBank) => {
      return (
        <Box className={classes.accordionElement} key={element.id}>
          <DFOAccordionElement
            eventKey={element.id}
            header={renderBankHeader(element)}
            body={renderBankBody()}
          />
        </Box>
      );
    });
  };

  return (
    <>
      <Box className={classes.inheritanceContainer}>
        <Box className={classes.topContainer}>
          <Box className={classes.searchBarContainer}>
            {' '}
            <DFOSearchBar
              list={project.inheritedBanks}
              label={t('Find banks to inherit from')}
              callback={searchFieldCallback}
              searchFunction={inheritanceSearch}
            />
          </Box>
          <Box className={classes.fill}></Box>
        </Box>

        <Box>
          <DFOAccordionProvider
            body={<>{renderInheritedBanks(project.inheritedBanks)}</>}
          />
        </Box>
      </Box>
    </>
  );
}
