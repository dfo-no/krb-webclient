import { Box, Typography } from '@mui/material/';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import theme from '../../theme';
import GeneralErrorMessage from '../../Form/GeneralErrorMessage';
import Nexus from '../../Nexus/Nexus';
import VerticalTextCtrl from '../../FormProvider/VerticalTextCtrl';
import { IResponse } from '../../Nexus/entities/IResponse';
import {
  ModalBox,
  ModalFieldsBox,
  ModalButtonsBox,
  ModalButton
} from '../../components/ModalBox/ModalBox';
import { ModelType } from '../../Nexus/enums';
import { setResponse } from '../../store/reducers/response-reducer';
import { useAppDispatch } from '../../store/hooks';
import { useFeatureFlags } from '../../hooks/useFeatureFlag';
import css from './HomePage.module.scss';
import FileUpload from '../../components/FileUpload/FileUpload';
import React from 'react';
import {
  setFiles,
  setResponses,
  setSpecFile
} from '../../store/reducers/evaluation-reducer';
import { IAlert } from '../../models/IAlert';
import { v4 as uuidv4 } from 'uuid';
import { addAlert } from '../../store/reducers/alert-reducer';
import { httpPost } from '../../api/http';
import { AxiosResponse } from 'axios';
import { useEvaluationState } from '../Evaluation/EvaluationContext';
import { useHomeState } from './HomeContext';

const MAX_UPLOAD_SIZE = 10000000; // 10M

interface IProps {
  handleClose: () => void;
  response: IResponse;
}

const NewResponseForm = ({ handleClose, response }: IProps) => {
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const {
    setSelectedSpecification,
    setSelectedPrefilledResponse,
    setSelectedResponse
  } = useHomeState();
  const { setEvaluations } = useEvaluationState();
  const featureFlags = useFeatureFlags();

  const methods = useForm<IResponse>({
    resolver: nexus.resolverService.resolver(ModelType.response),
    defaultValues: response
  });

  const onSubmit = async (post: IResponse) => {
    dispatch(setResponse(post));
    history.push(`/response/${post.specification.bank.id}`);
  };

  const onUpload = (files: FileList): void => {
    // se src/pages/Home/HomePage.tsx:155
    setEvaluations([]);
    dispatch(setFiles([]));
    dispatch(setResponses([]));
    dispatch(setSpecFile(null));

    const formData = new FormData();
    let disableUploadMessage = '';
    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];
      if (file.size > MAX_UPLOAD_SIZE) {
        disableUploadMessage = t('HOME_FILEUPL_TOO_LARGE');
        break;
      }
      if (file.type !== 'application/pdf') {
        disableUploadMessage = t('HOME_FILEUPL_WRONG_TYPE');
        break;
      }
      formData.append('file', file);
    }

    if (disableUploadMessage !== '') {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'error',
        text: disableUploadMessage
      };
      dispatch(addAlert({ alert }));
      return;
    }

    httpPost<FormData, AxiosResponse>('/java/uploadPdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'json'
    })
      .then((httpResponse) => {
        if (httpResponse.data.title) {
          dispatch(
            setSpecFile({
              name: files[0].name,
              lastModified: files[0].lastModified
            })
          );
          setSelectedSpecification(httpResponse.data);
        } else {
          if (!httpResponse.data.specification) {
            setSelectedPrefilledResponse(httpResponse.data);
          } else {
            setSelectedResponse(httpResponse.data);
          }
        }
      })
      .catch(() => {
        const alert: IAlert = {
          id: uuidv4(),
          style: 'error',
          text: t('HOME_FILEUPL_UPLOAD_ERROR')
        };
        dispatch(addAlert({ alert }));
      });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <ModalBox>
          <Box>
            <Typography variant="lg" color={theme.palette.primary.main}>
              {response.specification.title}
            </Typography>
            <Typography sx={{ marginLeft: 0.16 }}>
              {response.specification.organization}
            </Typography>
          </Box>
          {featureFlags.includes('test') && (
            <FileUpload
              accept={'application/pdf'}
              className={css.Card}
              description={t('HOME_FILEUPL_DESCRIPTION')}
              label={t('HOME_FILEUPL_LABEL')}
              onChange={onUpload}
              variant={'Tertiary'}
            />
          )}

          <ModalFieldsBox>
            <VerticalTextCtrl
              name="supplier"
              label={t('RESP_SUPP_NAME')}
              placeholder={t('RESP_SUPP_NAME')}
              autoFocus
            />
          </ModalFieldsBox>
          <ModalButtonsBox>
            <ModalButton variant="cancel" onClick={() => handleClose()}>
              {t('Cancel')}
            </ModalButton>
            <ModalButton variant="save" type="submit">
              {t('Create response')}
            </ModalButton>
          </ModalButtonsBox>
        </ModalBox>
        <GeneralErrorMessage errors={methods.formState.errors} />
      </form>
    </FormProvider>
  );
};

export default NewResponseForm;
