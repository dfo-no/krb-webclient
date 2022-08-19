import { Box, Typography } from '@mui/material/';
import { FormProvider, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import theme from '../../theme';
import GeneralErrorMessage from '../../Form/GeneralErrorMessage';
import VerticalTextCtrl from '../../FormProvider/VerticalTextCtrl';
import { BaseResponseSchema, IResponse } from '../../models/IResponse';
import {
  ModalBox,
  ModalFieldsBox,
  ModalButtonsBox,
  ModalButton
} from '../../components/ModalBox/ModalBox';
import { setResponse } from '../../store/reducers/response-reducer';
import { useAppDispatch } from '../../store/hooks';

interface IProps {
  handleClose: () => void;
  response: IResponse;
}

const NewResponseForm = ({ handleClose, response }: IProps) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const methods = useForm<IResponse>({
    resolver: joiResolver(BaseResponseSchema),
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
          <ModalFieldsBox>
            <VerticalTextCtrl
              name="supplier"
              label={t('RESP_SUPP_NAME')}
              placeholder={t('RESP_SUPP_NAME')}
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
