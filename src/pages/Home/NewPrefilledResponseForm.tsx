import { Box, Typography } from '@mui/material/';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import produce from 'immer';

import GeneralErrorMessage from '../../Form/GeneralErrorMessage';
import Nexus from '../../Nexus/Nexus';
import theme from '../../theme';
import VerticalTextCtrl from '../../FormProvider/VerticalTextCtrl';
import {
  IPrefilledResponse,
  PREFILLED_RESPONSE_CUSTOMIZATION,
} from '../../Nexus/entities/IPrefilledResponse';
import {
  ModalBox,
  ModalButton,
  ModalButtonsBox,
  ModalFieldsBox,
} from '../../components/ModalBox/ModalBox';
import { ModelType } from '../../Nexus/enums';
import { setResponse } from '../../store/reducers/prefilled-response-reducer';
import { useAppDispatch } from '../../store/hooks';
import { PREFILLED_RESPONSE } from '../../common/PathConstants';
import { BANK_CUSTOMIZATION } from '../../Nexus/entities/IBank';

interface IProps {
  handleClose: () => void;
  prefilledResponse: IPrefilledResponse;
}

const NewPrefilledResponseForm = ({
  handleClose,
  prefilledResponse: rawPrefilledResponse,
}: IProps) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const nexus = Nexus.getInstance();

  // TODO Dette er midlertidig og skal erstattes ved å oppdatere updateObject fra KRB-842-branchen
  const prefilledResponse = produce(rawPrefilledResponse, (draft) => {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    if (!draft['customization'])
      draft.customization = PREFILLED_RESPONSE_CUSTOMIZATION;
    // eslint-disable-next-line @typescript-eslint/dot-notation
    if (!draft.bank['customization'])
      draft.bank.customization = BANK_CUSTOMIZATION;
  });

  const methods = useForm<IPrefilledResponse>({
    resolver: nexus.resolverService.resolver(ModelType.prefilledResponse),
    defaultValues: prefilledResponse,
  });

  const onSubmit = async (post: IPrefilledResponse) => {
    dispatch(setResponse(post));
    history.push(`/${PREFILLED_RESPONSE}/${post.bank.id}`);
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
