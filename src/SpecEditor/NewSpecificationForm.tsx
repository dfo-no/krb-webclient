import { joiResolver } from '@hookform/resolvers/joi';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import VerticalTextCtrl from '../FormProvider/VerticalTextCtrl';
import {
  BaseSpecificationSchema,
  ISpecification
} from '../Nexus/entities/ISpecification';
import theme from '../theme';
import {
  ModalBox,
  ModalFieldsBox,
  ModalButtonsBox,
  ModalButton
} from '../components/ModalBox/ModalBox';
import { setSpecification } from '../store/reducers/spesification-reducer';
import { useAppDispatch } from '../store/hooks';

interface IProps {
  specification: ISpecification;
  handleClose: () => void;
}

const NewSpecificationForm = ({ handleClose, specification }: IProps) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const methods = useForm<ISpecification>({
    resolver: joiResolver(BaseSpecificationSchema),
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
      </form>
    </FormProvider>
  );
};

export default NewSpecificationForm;
