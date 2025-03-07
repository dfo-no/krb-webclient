import { Box, Typography } from '@mui/material/';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import GeneralErrorMessage from '../../Form/GeneralErrorMessage';
import Nexus from '../../Nexus/Nexus';
import theme from '../../theme';
import VerticalTextCtrl from '../../FormProvider/VerticalTextCtrl';
import { IPrefilledResponse } from '../../Nexus/entities/IPrefilledResponse';
import {
  ModalBox,
  ModalButton,
  ModalButtonsBox,
  ModalFieldsBox,
} from '../../components/ModalBox/ModalBox';
import { ModelType } from '../../Nexus/enums';
import { PREFILLED_RESPONSE } from '../../common/PathConstants';
import { updateObject } from './UpdateFormatsTools';

interface Props {
  handleClose: () => void;
  prefilledResponse: IPrefilledResponse;
}

const NewPrefilledResponseForm = ({
  handleClose,
  prefilledResponse: rawPrefilledResponse,
}: Props) => {
  const { t } = useTranslation();
  const history = useHistory();

  const nexus = Nexus.getInstance();
  const prefilledResponse = updateObject({ ...rawPrefilledResponse });
  const prefilledResponseWithId =
    nexus.prefilledResponseService.withId(prefilledResponse);

  const methods = useForm<IPrefilledResponse>({
    resolver: nexus.resolverService.resolver(ModelType.prefilledResponse),
    defaultValues: prefilledResponseWithId,
  });

  const onSubmit = async (post: IPrefilledResponse) => {
    nexus.prefilledResponseService
      .setPrefilledResponse(post)
      .then((storedPrefilledResponse) => {
        history.push(`/${PREFILLED_RESPONSE}/${storedPrefilledResponse.id}`);
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
              {prefilledResponse.bank.title}
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
              {t('HomePage.Create prepared response')}
            </ModalButton>
          </ModalButtonsBox>
        </ModalBox>
        <GeneralErrorMessage errors={methods.formState.errors} />
      </form>
    </FormProvider>
  );
};

export default NewPrefilledResponseForm;
