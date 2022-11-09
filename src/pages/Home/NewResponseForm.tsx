import { Box, Typography } from '@mui/material/';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React from 'react';

import theme from '../../theme';
import GeneralErrorMessage from '../../Form/GeneralErrorMessage';
import Nexus from '../../Nexus/Nexus';
import VerticalTextCtrl from '../../FormProvider/VerticalTextCtrl';
import { IResponse } from '../../Nexus/entities/IResponse';
import {
  ModalBox,
  ModalButton,
  ModalButtonsBox,
  ModalFieldsBox,
} from '../../components/ModalBox/ModalBox';
import { ModelType } from '../../Nexus/enums';
import { setResponse } from '../../store/reducers/response-reducer';
import { useAppDispatch } from '../../store/hooks';
import { RESPONSE } from '../../common/PathConstants';

interface IProps {
  handleClose: () => void;
  response: IResponse;
}

const NewResponseForm = ({ handleClose, response }: IProps) => {
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const methods = useForm<IResponse>({
    resolver: nexus.resolverService.resolver(ModelType.response),
    defaultValues: response,
  });

  const onSubmit = async (post: IResponse) => {
    dispatch(setResponse(post));
    history.push(`/${RESPONSE}/${post.specification.bank.id}`);
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
          <ModalFieldsBox>
            <VerticalTextCtrl
              name="supplier"
              label={t('HomePage.RESP_SUPP_NAME')}
              placeholder={t('HomePage.RESP_SUPP_NAME')}
              autoFocus
            />
          </ModalFieldsBox>
          <ModalButtonsBox>
            <ModalButton variant="cancel" onClick={() => handleClose()}>
              {t('common.Cancel')}
            </ModalButton>
            <ModalButton variant="save" type="submit">
              {t('HomePage.Create response')}
            </ModalButton>
          </ModalButtonsBox>
        </ModalBox>
        <GeneralErrorMessage errors={methods.formState.errors} />
      </form>
    </FormProvider>
  );
};

export default NewResponseForm;
