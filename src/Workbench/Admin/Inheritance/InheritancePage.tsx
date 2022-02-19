import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DFOSearchBar from '../../../components/DFOSearchBar/DFOSearchBar';
import { useAppSelector } from '../../../store/hooks';
import {
  DFOAccordionElement,
  DFOAccordionProvider
} from '../../../components/DFOAccordion/DFOAccordion';
import { IInheritedBank } from '../../../models/IInheritedBank';
import InheritanceBankBody from './InheritedBankAccordionBody';
import InheritanceBankHeader from './InheritedBankAccordionHeader';

const useStyles = makeStyles({
  accordionElement: {
    marginBottom: 14
  },
  inheritanceContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 40,
    gap: 30,
    margin: 'auto',
    width: '55.5vw'
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 100
  },
  searchBarContainer: {
    width: '25vw'
  }
});

export default function InheritancePage(): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const { t } = useTranslation();
  const classes = useStyles();

  const inheritanceSearch = () => {};
  const searchFieldCallback = () => {};

  const renderInheritedBanks = (inheritedBanksList: IInheritedBank[]) => {
    return inheritedBanksList.map((bank: IInheritedBank) => {
      return (
        <Box className={classes.accordionElement} key={bank.id}>
          <DFOAccordionElement
            eventKey={bank.id}
            header={<InheritanceBankHeader bank={bank} />}
            body={<InheritanceBankBody />}
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
