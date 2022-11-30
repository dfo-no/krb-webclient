import React, { Dispatch, ReactElement, SetStateAction, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import produce from 'immer';

import DFODialog from '../../components/DFODialog/DFODialog';
import NewPrefilledResponseForm from './NewPrefilledResponseForm';
import NewResponseForm from './NewResponseForm';
import Nexus from '../../Nexus/Nexus';
import theme from '../../theme';
import { IPrefilledResponse } from '../../Nexus/entities/IPrefilledResponse';
import { IResponse } from '../../Nexus/entities/IResponse';
import {
  ModalBox,
  ModalButton,
  ModalButtonsBox,
} from '../../components/ModalBox/ModalBox';
import { EVALUATION, SPECIFICATION } from '../../common/PathConstants';
import { EvaluationSpecificationStoreService } from '../../Nexus/services/EvaluationSpecificationStoreService';
import { SpecificationFile } from '../../Nexus/entities/SpecificationFile';

interface IProps {
  selectedSpecification: SpecificationFile;
  setSelectedSpecification: Dispatch<SetStateAction<SpecificationFile | null>>;
}

export default function SpecificationSelectionModal({
  selectedSpecification,
  setSelectedSpecification,
}: IProps): React.ReactElement {
  const [newResponse, setNewResponse] = useState<IResponse | null>(null);
  const [newPrefilledResponse, setNewPrefilledResponse] =
    useState<IPrefilledResponse | null>(null);
  const history = useHistory();
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
  const evaluationSpecificationStoreService =
    new EvaluationSpecificationStoreService();

  const rewriteSpecification = (specificationFile: SpecificationFile) => {
    return produce(specificationFile, (draft) => {
      type Input = Record<string, unknown>;

      function isRecord(value: unknown): value is Record<string, unknown> {
        return typeof value === 'object' && value !== null;
      }

      const translate = (input: Input) => {
        for (const key of Object.keys(input)) {
          if (key.toLowerCase().includes('weight')) {
            console.log('deleting key: ', key, input[key]);
            // eslint-disable-next-line no-param-reassign
            delete input[key];
          }

          if (key.includes('points')) {
            const keyParts = key.split('points');
            const translatedKey = keyParts[0] + 'discount' + keyParts[1];
            // eslint-disable-next-line no-param-reassign
            input[translatedKey] = input[key];
            // eslint-disable-next-line no-param-reassign
            delete input[key];
          } else if (key.includes('point')) {
            const keyParts = key.split('point');
            const translatedKey = keyParts[0] + 'discount' + keyParts[1];
            // eslint-disable-next-line no-param-reassign
            input[translatedKey] = input[key];
            // eslint-disable-next-line no-param-reassign
            delete input[key];
          }
          if (key.includes('Points')) {
            const keyParts = key.split('Points');
            const translatedKey = keyParts[0] + 'Discount' + keyParts[1];
            // eslint-disable-next-line no-param-reassign
            input[translatedKey] = input[key];
            // eslint-disable-next-line no-param-reassign
            delete input[key];
          } else if (key.includes('Point')) {
            const keyParts = key.split('Point');
            const translatedKey = keyParts[0] + 'Discount' + keyParts[1];
            // eslint-disable-next-line no-param-reassign
            input[translatedKey] = input[key];
            // eslint-disable-next-line no-param-reassign
            delete input[key];
          }

          // if (typeof input[key] === 'object') {
          // }
          const toCheck = input[key];

          if (isRecord(toCheck)) {
            translate(toCheck);
          }
        }
      };
      translate(draft);
    });
  };

  const specificationRewrittenToDiscounts = rewriteSpecification(
    selectedSpecification
  );

  const editSpecification = (): void => {
    nexus.specificationService
      .setSpecification(specificationRewrittenToDiscounts.specification)
      .then((specification) => {
        history.push(`/${SPECIFICATION}/${specification.id}`);
      });
  };

  const createResponse = (): void => {
    const response = nexus.responseService.createResponseFromSpecification(
      specificationRewrittenToDiscounts.specification
    );
    setNewResponse(response);
  };

  const createPrefilledResponse = (): void => {
    const prefilledResponse =
      nexus.prefilledResponseService.createPrefilledResponseFromBank(
        specificationRewrittenToDiscounts.specification.bank
      );
    setNewPrefilledResponse(prefilledResponse);
  };

  const doEvaluation = async () => {
    await evaluationSpecificationStoreService.storeEvaluationSpecification(
      specificationRewrittenToDiscounts
    );
    history.push(`/${EVALUATION}/${specificationRewrittenToDiscounts.id}`);
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
            {specificationRewrittenToDiscounts.specification.title}
          </Typography>
          <ModalButton variant="primary" onClick={editSpecification}>
            {t('Edit specification')}
          </ModalButton>
          <ModalButton variant="primary" onClick={createResponse}>
            {t('HomePage.Create response')}
          </ModalButton>
          <ModalButton variant="primary" onClick={createPrefilledResponse}>
            {t('HomePage.Create prepared response')}
          </ModalButton>
          <ModalButton variant="primary" onClick={doEvaluation}>
            {t('Do evaluation')}
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
