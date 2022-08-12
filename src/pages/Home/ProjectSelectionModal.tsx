import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import DFODialog from '../../components/DFODialog/DFODialog';
import LoaderSpinner from '../../common/LoaderSpinner';
import NewSpecificationForm from './NewSpecificationForm';
import SpecificationStoreService from '../../Nexus/services/SpecificationStoreService';
import theme from '../../theme';
import { IBank } from '../../Nexus/entities/IBank';
import { ISpecification } from '../../Nexus/entities/ISpecification';
import {
  ModalBox,
  ModalButton,
  ModalButtonsBox
} from '../../components/ModalBox/ModalBox';
import { useHomeState } from './HomeContext';
import { useGetBankQuery } from '../../store/api/bankApi';

interface IProps {
  selectedBank: IBank;
}

export default function ProjectSelectionModal({
  selectedBank
}: IProps): React.ReactElement {
  const { setSelectedBank } = useHomeState();
  const [newSpecification, setNewSpecification] =
    useState<ISpecification | null>(null);
  const { t } = useTranslation();

  const originBankId = selectedBank.projectId ?? selectedBank.id;
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

  const isPublished = bank.publications.some(
    (p) => p.deletedDate === undefined
  );
  const versionText = (): string => {
    if (isPublished) {
      const publishedBanks = bank.publications.filter(
        (p) => p.deletedDate === undefined
      );
      return `${t('Version')} ${
        publishedBanks[publishedBanks.length - 1].version
      }`;
    }
    return t('Not published');
  };

  const goToSpecification = (): void => {
    const specification =
      SpecificationStoreService.getSpecificationFromBank(selectedBank);
    setNewSpecification(specification);
  };

  const cancel = (): void => {
    setSelectedBank(null);
    setNewSpecification(null);
  };

  const modalBox = (): React.ReactElement => {
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
          <ModalButton variant="cancel" type="submit" disabled={true}>
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

  return (
    <DFODialog
      isOpen={true}
      handleClose={cancel}
      children={
        newSpecification ? (
          <NewSpecificationForm
            specification={newSpecification}
            handleClose={cancel}
          />
        ) : (
          modalBox()
        )
      }
    />
  );
}
