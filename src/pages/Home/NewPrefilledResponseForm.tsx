import { Box, Typography } from '@mui/material/';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import GeneralErrorMessage from '../../Form/GeneralErrorMessage';
import Nexus from '../../Nexus/Nexus';
import theme from '../../theme';
import VerticalTextCtrl from '../../FormProvider/VerticalTextCtrl';
import { IPrefilledResponse } from '../../Nexus/entities/IPrefilledResponse';
import {
  ModalBox,
  ModalFieldsBox,
  ModalButtonsBox,
  ModalButton
} from '../../components/ModalBox/ModalBox';
import { ModelType } from '../../Nexus/enums';
import { setResponse } from '../../store/reducers/PrefilledResponseReducer';
import { useAppDispatch } from '../../store/hooks';

interface IProps {
  handleClose: () => void;
  prefilledResponse: IPrefilledResponse;
}

const NewPrefilledResponseForm = ({
  handleClose,
  prefilledResponse
}: IProps) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const nexus = Nexus.getInstance();

  const methods = useForm<IPrefilledResponse>({
    resolver: nexus.resolverService.resolver(ModelType.prefilledResponse),
    defaultValues: prefilledResponse
  });

  const onSubmit = async (post: IPrefilledResponse) => {
    dispatch(setResponse(post));
    history.push(`/prefilledresponse/${post.bank.id}`);
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
              {prefilledResponse.bank.title}
            </Typography>
          </Box>
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
              {t('Create prepared response')}
            </ModalButton>
          </ModalButtonsBox>
        </ModalBox>
        <GeneralErrorMessage errors={methods.formState.errors} />
      </form>
    </FormProvider>
  );
};

export default NewPrefilledResponseForm;
