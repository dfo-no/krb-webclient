import React from 'react';
import { Box } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import DFODialog from '../../components/DFODialog/DFODialog';
import { IPrefilledResponse } from '../../Nexus/entities/IPrefilledResponse';
import {
  ModalBox,
  ModalButton,
  ModalButtonsBox
} from '../../components/ModalBox/ModalBox';
import { selectBank } from '../../store/reducers/selectedBank-reducer';
import { setResponse } from '../../store/reducers/prefilled-response-reducer';
import { useAppDispatch } from '../../store/hooks';
import { useHomeState } from './HomeContext';

interface IProps {
  selectedPrefilledResponse: IPrefilledResponse;
}

export default function PrefilledResponseSelectionModal({
  selectedPrefilledResponse
}: IProps): React.ReactElement {
  const { setSelectedPrefilledResponse } = useHomeState();
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const editPrefilledResponse = (): void => {
    dispatch(selectBank(selectedPrefilledResponse.bank.id));
    dispatch(setResponse(selectedPrefilledResponse));
    history.push(`/prefilledresponse/${selectedPrefilledResponse.bank.id}`);
  };

  const cancel = (): void => {
    setSelectedPrefilledResponse(null);
  };

  const defaultActionsChoiceDialog = (): React.ReactElement => {
    return (
      <ModalBox>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <ModalButton variant="primary" onClick={editPrefilledResponse}>
            {t('Edit prepared response')}
          </ModalButton>
          <ModalButton variant="cancel" type="submit" disabled={true}>
            {t('Create response')}
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
      children={defaultActionsChoiceDialog()}
    />
  );
}
