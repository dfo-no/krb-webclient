import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import DFODialog from '../../components/DFODialog/DFODialog';
import LoaderSpinner from '../../common/LoaderSpinner';
import NewSpecificationForm from '../SpecEditor/NewSpecificationForm';
import SpecificationStoreService from '../../Nexus/services/SpecificationStoreService';
import theme from '../../theme';
import { IBank } from '../../Nexus/entities/IBank';
import { ISpecification } from '../../Nexus/entities/ISpecification';
import {
  ModalBox,
  ModalButton,
  ModalButtonsBox
} from '../../Workbench/Components/ModalBox';
import { useAppDispatch } from '../../store/hooks';
import { useBankState } from '../../components/BankContext/BankContext';
import { setSpecification } from '../../store/reducers/spesification-reducer';
import { useGetBankQuery } from '../../store/api/bankApi';

interface IProps {
  selectedBank: IBank;
}

export default function ProjectSelectionModal({
  selectedBank
}: IProps): React.ReactElement {
  const { setSelectedBank } = useBankState();
  const [selectedSpecification, setSelectedSpecification] =
    useState<ISpecification | null>(null);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  let originBankId = '';
  if (selectedBank.projectId) {
    originBankId = selectedBank.projectId;
  } else {
    originBankId = selectedBank.id;
  }

  const { data: bank, isLoading } = useGetBankQuery(originBankId);
  if (!selectedBank) {
    return <></>;
  }

  if (isLoading || !bank) {
    return (
      <DFODialog
        isOpen={true}
        handleClose={() => setSelectedBank(null)}
        children={<LoaderSpinner />}
      />
    );
  }

  const isPublished = bank.publications.length > 0;
  const versionText = (): string => {
    if (isPublished) {
      return `${t('Version')} ${
        bank.publications[bank.publications.length - 1].version
      }`;
    }
    return t('Not published');
  };

  const goToSpecification = (): void => {
    const newSpecification =
      SpecificationStoreService.getSpecificationFromBank(selectedBank);
    dispatch(setSpecification(newSpecification));
    setSelectedSpecification(newSpecification);
  };

  const cancel = (): void => {
    setSelectedBank(null);
    setSelectedSpecification(null);
  };

  const projectModalBox = (): React.ReactElement => {
    return (
      <ModalBox>
        <Box>
          <Typography variant="lg" color={theme.palette.primary.main}>
            {selectedBank.title}
          </Typography>
          <Typography sx={{ marginLeft: 0.16 }}>
            {selectedBank.description}
          </Typography>
          <Typography sx={{ marginLeft: 0.16 }}>{versionText()}</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <ModalButton
            variant="primary"
            onClick={goToSpecification}
            disabled={!isPublished}
          >
            {t('Create specification')}
          </ModalButton>
          <ModalButton variant="primary" type="submit" disabled={true}>
            {t('Create prepared response')}
          </ModalButton>
          <ModalButtonsBox>
            <ModalButton variant="cancel" onClick={cancel}>
              {t('Cancel')}
            </ModalButton>
          </ModalButtonsBox>
        </Box>
      </ModalBox>
    );
  };

  if (!selectedSpecification) {
    return (
      <DFODialog
        isOpen={true}
        handleClose={cancel}
        children={projectModalBox()}
      />
    );
  }

  return (
    <DFODialog
      isOpen={true}
      handleClose={cancel}
      children={
        <NewSpecificationForm
          specification={selectedSpecification}
          handleClose={cancel}
        />
      }
    />
  );
}
