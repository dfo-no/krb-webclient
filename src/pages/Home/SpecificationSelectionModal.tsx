import React from 'react';
import { Box, Typography } from '@mui/material';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import DFODialog from '../../components/DFODialog/DFODialog';
import Nexus from '../../Nexus/Nexus';
import theme from '../../theme';
import { ISpecification } from '../../Nexus/entities/ISpecification';
import {
  ModalBox,
  ModalButton,
  ModalButtonsBox
} from '../../components/ModalBox/ModalBox';
import { setEvaluationSpecification } from '../../store/reducers/evaluation-reducer';
import { setResponse } from '../../store/reducers/response-reducer';
import { setSpecification } from '../../store/reducers/spesification-reducer';
import { selectBank } from '../../store/reducers/selectedBank-reducer';
import { useAppDispatch } from '../../store/hooks';
import { useHomeState } from './HomeContext';

interface IProps {
  selectedSpecification: ISpecification;
}

export default function SpecificationSelectionModal({
  selectedSpecification
}: IProps): React.ReactElement {
  const { setSelectedSpecification } = useHomeState();
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const nexus = Nexus.getInstance();

  const editSpecification = (): void => {
    dispatch(selectBank(selectedSpecification.bank.id));
    dispatch(setSpecification(selectedSpecification));
    history.push(`/specification/${selectedSpecification.bank.id}`);
  };

  const createResponse = (): void => {
    dispatch(selectBank(selectedSpecification.bank.id));
    const response = nexus.responseService.createResponseFromSpecification(
      selectedSpecification
    );
    dispatch(setResponse(response));
    history.push(`/response/${selectedSpecification.bank.id}`);
  };

  const doEvaluation = (): void => {
    dispatch(setEvaluationSpecification(selectedSpecification));
    history.push(`/evaluation/${selectedSpecification.bank.id}`);
  };

  const cancel = (): void => {
    setSelectedSpecification(null);
  };

  const modalBox = (): React.ReactElement => {
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
          <ModalButton variant="cancel" type="submit" disabled={true}>
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

  return <DFODialog isOpen={true} handleClose={cancel} children={modalBox()} />;
}
