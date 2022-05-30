import Box from '@mui/material/Box';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  DFOAccordionElement,
  DFOAccordionProvider
} from '../../../../components/DFOAccordion/DFOAccordion';
import DFOSearchBar from '../../../../components/DFOSearchBar/DFOSearchBar';
import { IInheritedBank } from '../../../../models/IInheritedBank';
import { IBaseModel } from '../../../../Nexus/entities/IBaseModel';
import { useAppSelector } from '../../../../store/hooks';
import {
  SearchContainer,
  SearchFieldContainer
} from '../../../../components/SearchContainer/SearchContainer';
import { StandardContainer } from '../../../../components/StandardContainer/StandardContainer';
import InheritanceBankBody from './InheritedBankAccordionBody';
import InheritanceBankHeader from './InheritedBankAccordionHeader';

const useStyles = makeStyles({
  accordionElement: {
    marginBottom: 14
  }
});

export default function InheritancePage(): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);

  const { t } = useTranslation();
  const classes = useStyles();

  const inheritanceSearch = (searchString: string, list: IBaseModel[]) => {
    return list;
  };
  const searchFieldCallback = (list: IBaseModel[]) => {
    return list;
  };

  const renderInheritedBanks = (inheritedBanksList: IInheritedBank[]) => {
    return inheritedBanksList.map((bank: IInheritedBank) => {
      return (
        <Box className={classes.accordionElement} key={bank.id}>
          <DFOAccordionElement
            eventKey={bank.id}
            header={<InheritanceBankHeader bank={bank} />}
            body={<InheritanceBankBody bank={bank} />}
          />
        </Box>
      );
    });
  };

  return (
    <StandardContainer>
      <SearchContainer>
        <SearchFieldContainer>
          {' '}
          <DFOSearchBar
            list={project.inheritedBanks}
            placeholder={t('Find banks to inherit from')}
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
  );
}
