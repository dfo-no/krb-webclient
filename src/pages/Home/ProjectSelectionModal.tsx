import React, { ReactElement, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import DFODialog from '../../components/DFODialog/DFODialog';
import LoaderSpinner from '../../common/LoaderSpinner';
import NewSpecificationForm from './NewSpecificationForm';
import NewPrefilledResponseForm from './NewPrefilledResponseForm';
import Nexus from '../../Nexus/Nexus';
import SpecificationStoreService from '../../Nexus/services/SpecificationStoreService';
import theme from '../../theme';
import { IBank } from '../../Nexus/entities/IBank';
import { IPrefilledResponse } from '../../Nexus/entities/IPrefilledResponse';
import { ISpecification } from '../../Nexus/entities/ISpecification';
import {
  ModalBox,
  ModalButton,
  ModalButtonsBox
} from '../../components/ModalBox/ModalBox';
import { useGetBankQuery } from '../../store/api/bankApi';

interface IProps {
  selectedBank: IBank;
  setSelectedBank: (bank: IBank | null) => void;
}

export default function ProjectSelectionModal({
  selectedBank,
  setSelectedBank
}: IProps): React.ReactElement {
  const [newSpecification, setNewSpecification] =
    useState<ISpecification | null>(null);
  const [newPrefilledResponse, setNewPrefilledResponse] =
    useState<IPrefilledResponse | null>(null);
  const nexus = Nexus.getInstance();
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

  const isPublished = bank.publications.some((p) => !p.deletedDate);
  const versionText = (): string => {
    if (isPublished) {
      const publishedBanks = bank.publications.filter((p) => !p.deletedDate);
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

  const goToPrefilledResponse = (): void => {
    const prefilledResponse =
      nexus.prefilledResponseService.createPrefilledResponseFromBank(
        selectedBank
      );
    setNewPrefilledResponse(prefilledResponse);
  };

  const cancel = (): void => {
    setSelectedBank(null);
    setNewSpecification(null);
    setNewPrefilledResponse(null);
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
          <ModalButton
            variant="primary"
            onClick={goToPrefilledResponse}
            disabled={!isPublished}
          >
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

  const getDialog = (): ReactElement => {
    if (newSpecification) {
      return (
        <NewSpecificationForm
          specification={newSpecification}
          handleClose={cancel}
        />
      );
    }
    if (newPrefilledResponse) {
      return (
        <NewPrefilledResponseForm
          handleClose={cancel}
          prefilledResponse={newPrefilledResponse}
        />
      );
    }
    return modalBox();
  };

  return (
    <DFODialog isOpen={true} handleClose={cancel} children={getDialog()} />
  );
}
