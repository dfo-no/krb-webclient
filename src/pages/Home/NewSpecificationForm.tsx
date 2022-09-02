import { Box, Typography } from '@mui/material/';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import theme from '../../theme';
import GeneralErrorMessage from '../../Form/GeneralErrorMessage';
import Nexus from '../../Nexus/Nexus';
import VerticalTextCtrl from '../../FormProvider/VerticalTextCtrl';
import { ISpecification } from '../../Nexus/entities/ISpecification';
import {
  ModalBox,
  ModalFieldsBox,
  ModalButtonsBox,
  ModalButton
} from '../../components/ModalBox/ModalBox';
import { ModelType } from '../../Nexus/enums';
import { setSpecification } from '../../store/reducers/specification-reducer';
import { useAppDispatch } from '../../store/hooks';

interface IProps {
  handleClose: () => void;
  specification: ISpecification;
}

const NewSpecificationForm = ({ handleClose, specification }: IProps) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const nexus = Nexus.getInstance();

  const methods = useForm<ISpecification>({
    resolver: nexus.resolverService.resolver(ModelType.specification),
    defaultValues: specification
  });

  const onSubmit = async (post: ISpecification) => {
    dispatch(setSpecification(post));
    history.push(`/specification/${post.bank.id}`);
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
              {specification.bank.title}
            </Typography>
            <Typography sx={{ marginLeft: 0.16 }}>
              {specification.bank.description}
            </Typography>
          </Box>
          <ModalFieldsBox>
            <VerticalTextCtrl
              name="title"
              label={t('What will be the name of the procurement?')}
              placeholder={t('Name of specification')}
              autoFocus
            />
            <VerticalTextCtrl
              name="organization"
              label={t('Name of your organization')}
              placeholder={t('Name')}
            />
            <VerticalTextCtrl
              name="organizationNumber"
              label={t('Organization number')}
              placeholder={t('Organization number')}
            />
          </ModalFieldsBox>
          <ModalButtonsBox>
            <ModalButton variant="cancel" onClick={() => handleClose()}>
              {t('Cancel')}
            </ModalButton>
            <ModalButton variant="save" type="submit">
              {t('Create specification')}
            </ModalButton>
          </ModalButtonsBox>
        </ModalBox>
        <GeneralErrorMessage errors={methods.formState.errors} />
      </form>
    </FormProvider>
  );
};

export default NewSpecificationForm;
