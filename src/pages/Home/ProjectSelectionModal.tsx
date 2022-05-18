import React, { useState } from 'react';
import DFODialog from '../../components/DFODialog/DFODialog';
import NewSpecForm from '../../SpecEditor/NewSpecForm';
import { useBankState } from '../../components/BankContext/BankContext';
import { setSpecification } from '../../store/reducers/spesification-reducer';
import { useAppDispatch } from '../../store/hooks';
import {
  ModalBox,
  ModalButton,
  ModalButtonsBox
} from '../../Workbench/Components/ModalBox';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import theme from '../../theme';
import { useTranslation } from 'react-i18next';
import { useGetBankQuery } from '../../store/api/bankApi';
import LoaderSpinner from '../../common/LoaderSpinner';
import { ISpecification } from '../../Nexus/entities/ISpecification';
import SpecificationStoreService from '../../Nexus/services/SpecificationStoreService';
import { IBank } from '../../Nexus/entities/IBank';

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
            {t('create specification')}
          </ModalButton>
          <ModalButton variant="primary" type="submit" disabled={true}>
            {t('create prepared response')}
          </ModalButton>
          <ModalButtonsBox>
            <ModalButton variant="cancel" onClick={cancel}>
              {t('cancel')}
            </ModalButton>
          </ModalButtonsBox>
        </Box>
      </ModalBox>
    );
  };

  return selectedSpecification ? (
    <DFODialog
      isOpen={true}
      handleClose={cancel}
      children={
        <NewSpecForm
          specification={selectedSpecification}
          handleClose={cancel}
        />
      }
    />
  ) : (
    <DFODialog
      isOpen={true}
      handleClose={cancel}
      children={projectModalBox()}
    />
  );
}
