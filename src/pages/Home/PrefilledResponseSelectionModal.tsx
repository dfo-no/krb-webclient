import React, { Dispatch, SetStateAction } from 'react';
import { Box } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import DFODialog from '../../components/DFODialog/DFODialog';
import { IPrefilledResponse } from '../../Nexus/entities/IPrefilledResponse';
import {
  ModalBox,
  ModalButton,
  ModalButtonsBox,
} from '../../components/ModalBox/ModalBox';
import { PREFILLED_RESPONSE } from '../../common/PathConstants';
import Nexus from '../../Nexus/Nexus';

interface Props {
  selectedPrefilledResponse: IPrefilledResponse;
  setSelectedPrefilledResponse: Dispatch<
    SetStateAction<IPrefilledResponse | null>
  >;
}

export default function PrefilledResponseSelectionModal({
  selectedPrefilledResponse,
  setSelectedPrefilledResponse,
}: Props): React.ReactElement {
  const history = useHistory();
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();

  const editPrefilledResponse = (): void => {
    const prefilledResponseWithId = nexus.prefilledResponseService.withId(
      selectedPrefilledResponse
    );
    nexus.prefilledResponseService
      .setPrefilledResponse(prefilledResponseWithId)
      .then((prefilledResponse) => {
        history.push(`/${PREFILLED_RESPONSE}/${prefilledResponse.id}`);
      });
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
            {t('HomePage.Create response')}
          </ModalButton>
          <ModalButtonsBox>
            <ModalButton variant="cancel" onClick={cancel}>
              {t('common.Cancel')}
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
