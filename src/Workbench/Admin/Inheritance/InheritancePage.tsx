import { Box, makeStyles } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DFOSearchBar from '../../../components/DFOSearchBar/DFOSearchBar';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import theme from '../../../theme';
import {
  DFOAccordionElement,
  DFOAccordionProvider
} from '../../../components/DFOAccordion/DFOAccordion';
import Typography from '@mui/material/Typography';
import { DFOSwitch } from '../../../components/DFOSwitch/DFOSwitch';
import { FormProvider, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import RequirementType from '../../../models/RequirementType';
import CheckboxCtrl from '../../../FormProvider/CheckboxCtrl';
import InheritanceTagList from './InheritanceTagList';
import DFOSelect from '../../../components/DFOSelect/DFOSelect';
import Button from '@mui/material/Button';

interface IFormValues {
  person: {
    firstName: string | null;
    lastName: string | null;
  };
}

const FormSchema = Joi.object().keys({
  person: Joi.object().keys({
    firstName: Joi.string().max(20).required(),
    lastName: Joi.string().max(20).required(),
    birthDay: Joi.date().iso().raw().required(),
    weddingDay: Joi.alternatives([
      Joi.date().iso().max('12/13/2021').raw(),
      Joi.string().valid(null)
    ]).required(),
    point: Joi.number().required(),
    isDeveloper: Joi.boolean().valid(true).required(),
    range: Joi.number().min(20).max(100).required(),
    isSexy: Joi.boolean().valid(true).required(),
    fileEndings: Joi.array().items(Joi.string()).min(1).required(),
    codelist: Joi.any().required(),
    gender: Joi.string().valid(RequirementType.info).required()
  })
});

const useStyles = makeStyles({
  SearchResultHeader: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  searchWrapper: {
    width: '50%',
    marginLeft: '2%'
  },
  productsContainer: {
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
    gap: 5
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
  titleOptions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    borderBottom: `1px solid ${theme.palette.gray300.main}`,
    marginRight: 30,
    height: 54
  },
  bankItem: {
    width: '100%'
  },
  endContainer: {
    display: 'flex'
  },
  dfoSwitch: { marginTop: 10 },
  deleteIcon: { marginTop: 15 },
  element: {
    marginBottom: 18
  },
  accordionElement: {
    marginBottom: 17
  },
  description: {
    marginTop: 12
  },
  bankBodyContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 30,
    backgroundColor: theme.palette.gray100.main,
    paddingTop: 30
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    paddingLeft: 20
  },
  selectContainer: {
    width: '70%'
  },
  checkboxButtonContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});

export default function InheritancePage(): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const versions = [
    { name: 'Tronds versjon; 1. des. 2021' },
    { name: 'Oslo kommune; 1. des. 2021' }
  ];

  const defaultValues: IFormValues = {
    person: {
      firstName: null,
      lastName: null
    }
  };

  const methods = useForm<IFormValues>({
    resolver: joiResolver(FormSchema),
    defaultValues
  });

  const saveValues = (data: IFormValues) => {
    console.log(data.person);
  };

  const inheritanceSearch = () => {};
  const searchFieldCallback = () => {};

  const bankHeader = (title: any) => {
    return (
      <Box className={classes.bankItem}>
        <Box className={classes.titleOptions}>
          <Box>
            <Typography variant="mediumBlue">{title}</Typography>
          </Box>
          <Box className={classes.endContainer}>
            <Box className={classes.dfoSwitch}>
              <DFOSwitch />
            </Box>
            <Box className={classes.deleteIcon}>
              <DeleteIcon />
            </Box>
          </Box>
        </Box>
        <Box className={classes.description}>
          <Typography variant="smallGray">
            En kort beskrivelse av kravsettet som det arves fra
          </Typography>
        </Box>
      </Box>
    );
  };

  const bankBody = () => {
    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(saveValues)}>
          <Box className={classes.bankBodyContainer}>
            <Box className={classes.subContainer}>
              <Typography variant="smallBold">
                Hvilken versjon av kravsettet arves?
              </Typography>
              <Box className={classes.selectContainer}>
                <DFOSelect options={versions} />
              </Box>
            </Box>
            <Box className={classes.subContainer}>
              <Typography variant="smallBold">
                Hvilke deler av kravsettet arves?
              </Typography>
              <Box className={classes.checkboxButtonContainer}>
                <CheckboxCtrl name="test" label="Arv hele kravsett" />
                <Button variant="save">Lagre endringer</Button>
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

  const renderInheritedBanks = (inheritedBanksList: any) => {
    return inheritedBanksList.map((element: any) => {
      return (
        <Box className={classes.accordionElement}>
          <DFOAccordionElement
            key={element.id}
            eventKey={element.id}
            header={bankHeader(element.title)}
            body={bankBody()}
          />
        </Box>
      );
    });
  };

  return (
    <>
      <Box className={classes.productsContainer}>
        <Box className={classes.topContainer}>
          <Box className={classes.searchBarContainer}>
            {' '}
            <DFOSearchBar
              list={project.products}
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
