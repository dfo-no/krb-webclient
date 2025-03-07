import React, { Dispatch, SetStateAction } from 'react';
import { Box } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import DFODialog from '../../components/DFODialog/DFODialog';
import { IResponse } from '../../Nexus/entities/IResponse';
import {
  ModalBox,
  ModalButton,
  ModalButtonsBox,
} from '../../components/ModalBox/ModalBox';
import Nexus from '../../Nexus/Nexus';
import { RESPONSE } from '../../common/PathConstants';

interface IProps {
  selectedResponse: IResponse;
  setSelectedResponse: Dispatch<SetStateAction<IResponse | null>>;
}

export default function ResponseSelectionModal({
  selectedResponse,
  setSelectedResponse,
}: IProps): React.ReactElement {
  const history = useHistory();
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();

  const editResponse = (): void => {
    const responseWithId = nexus.responseService.withId(selectedResponse);
    nexus.responseService
      .setResponse(responseWithId)
      .then(() => history.push(`/${RESPONSE}/${responseWithId.id}`));
  };

  const cancel = (): void => {
    setSelectedResponse(null);
  };

  const defaultActionsChoiceDialog = (): React.ReactElement => {
    return (
      <ModalBox>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <ModalButton variant="primary" onClick={editResponse}>
            {t('common.Edit response')}
          </ModalButton>
          <ModalButton variant="cancel" type="submit" disabled={true}>
            {t('HomePage.Create prepared response')}
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
