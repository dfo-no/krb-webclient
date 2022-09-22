import React, { ReactElement, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import DFODialog from '../../components/DFODialog/DFODialog';
import NewPrefilledResponseForm from './NewPrefilledResponseForm';
import NewResponseForm from './NewResponseForm';
import Nexus from '../../Nexus/Nexus';
import theme from '../../theme';
import { IPrefilledResponse } from '../../Nexus/entities/IPrefilledResponse';
import { IResponse } from '../../Nexus/entities/IResponse';
import { ISpecification } from '../../Nexus/entities/ISpecification';
import {
  ModalBox,
  ModalButton,
  ModalButtonsBox
} from '../../components/ModalBox/ModalBox';
import { setEvaluationSpecification } from '../../store/reducers/evaluation-reducer';
import { selectBank } from '../../store/reducers/selectedBank-reducer';
import { SPECIFICATION } from '../../common/PathConstants';
import { useAppDispatch } from '../../store/hooks';
import { useHomeState } from './HomeContext';

interface IProps {
  selectedSpecification: ISpecification;
}

export default function SpecificationSelectionModal({
  selectedSpecification
}: IProps): React.ReactElement {
  const { setSelectedSpecification } = useHomeState();
  const [newResponse, setNewResponse] = useState<IResponse | null>(null);
  const [newPrefilledResponse, setNewPrefilledResponse] =
    useState<IPrefilledResponse | null>(null);
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const nexus = Nexus.getInstance();

  const editSpecification = (): void => {
    dispatch(selectBank(selectedSpecification.bank.id));
    nexus.specificationService.setSpecification(selectedSpecification);
    history.push(`/${SPECIFICATION}/${selectedSpecification.id}`);
  };

  const createResponse = (): void => {
    dispatch(selectBank(selectedSpecification.bank.id));
    const response = nexus.responseService.createResponseFromSpecification(
      selectedSpecification
    );
    setNewResponse(response);
  };

  const createPrefilledResponse = (): void => {
    const prefilledResponse =
      nexus.prefilledResponseService.createPrefilledResponseFromBank(
        selectedSpecification.bank
      );
    setNewPrefilledResponse(prefilledResponse);
  };

  const doEvaluation = (): void => {
    dispatch(setEvaluationSpecification(selectedSpecification));
    history.push(`/evaluation/${selectedSpecification.bank.id}`);
  };

  const cancel = (): void => {
    setSelectedSpecification(null);
    setNewResponse(null);
  };

  const defaultActionsChoiceDialog = (): React.ReactElement => {
    return (
      <ModalBox>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="lg" color={theme.palette.primary.main}>
            {selectedSpecification.title}
          </Typography>
          <ModalButton variant="primary" onClick={editSpecification}>
            {t('Edit specification')}
          </ModalButton>
          <ModalButton variant="primary" onClick={createResponse}>
            {t('Create response')}
          </ModalButton>
          <ModalButton variant="primary" onClick={createPrefilledResponse}>
            {t('Create prepared response')}
          </ModalButton>
          <ModalButton variant="primary" onClick={doEvaluation}>
            {t('Do evaluation')}
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
    if (newResponse) {
      return <NewResponseForm handleClose={cancel} response={newResponse} />;
    } else if (newPrefilledResponse) {
      return (
        <NewPrefilledResponseForm
          handleClose={cancel}
          prefilledResponse={newPrefilledResponse}
        />
      );
    } else {
      return defaultActionsChoiceDialog();
    }
  };

  return (
    <DFODialog isOpen={true} handleClose={cancel} children={getDialog()} />
  );
}
