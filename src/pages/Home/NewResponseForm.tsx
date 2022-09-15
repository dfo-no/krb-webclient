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
// import { useFeatureFlags } from '../../hooks/useFeatureFlag';
// import FileUpload from '../../components/FileUpload/FileUpload';
import React from 'react';

interface IProps {
  handleClose: () => void;
  response: IResponse;
}

const NewResponseForm = ({ handleClose, response }: IProps) => {
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
  const history = useHistory();
  const dispatch = useAppDispatch();
  // const featureFlags = useFeatureFlags();

  const methods = useForm<IResponse>({
    resolver: nexus.resolverService.resolver(ModelType.response),
    defaultValues: response
  });

  const onSubmit = async (post: IResponse) => {
    dispatch(setResponse(post));
    history.push(`/response/${post.specification.bank.id}`);
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
          {/*
          {featureFlags.includes('test') && (
            <FileUpload
              accept={'application/pdf'}
              className={css.Card}
              description={t('HOME_FILEUPL_DESCRIPTION')}
              label={t('HOME_FILEUPL_LABEL')}
              variant={'Tertiary'}
            />
          )}
*/}

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
