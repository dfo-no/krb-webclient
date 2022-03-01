import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
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
import { StandardContainer } from '../../Components/StandardContainer';
import {
  SearchContainer,
  SearchFieldContainer
} from '../../Components/SearchContainer';

const useStyles = makeStyles({
  accordionElement: {
    marginBottom: 14
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
      <StandardContainer>
        <SearchContainer>
          <SearchFieldContainer>
            {' '}
            <DFOSearchBar
              list={project.inheritedBanks}
              label={t('Find banks to inherit from')}
              callback={searchFieldCallback}
              searchFunction={inheritanceSearch}
            />
          </SearchFieldContainer>
        </SearchContainer>

        <Box>
          <DFOAccordionProvider
            body={<>{renderInheritedBanks(project.inheritedBanks)}</>}
          />
        </Box>
      </StandardContainer>
    </>
  );
}
