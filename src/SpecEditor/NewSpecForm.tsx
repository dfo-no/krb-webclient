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
} from '../Workbench/Components/ModalBox';
import { useSpecificationState } from './SpecificationContext';

interface IProps {
  specification: ISpecification;
  handleClose: () => void;
}

const NewSpecForm = ({ handleClose, specification }: IProps) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { setSpecification } = useSpecificationState();

  const methods = useForm<ISpecification>({
    resolver: joiResolver(BaseSpecificationSchema),
    defaultValues: specification
  });

  const onSubmit = async (post: ISpecification) => {
    setSpecification(post);
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
              placeholder={t('name of specification')}
            />
            <VerticalTextCtrl
              name="organization"
              label={t('name of your organization')}
              placeholder={t('name')}
            />
            <VerticalTextCtrl
              name="organizationNumber"
              label={t('Organization number')}
              placeholder={t('Organization number')}
            />
          </ModalFieldsBox>
          <ModalButtonsBox>
            <ModalButton variant="cancel" onClick={() => handleClose()}>
              {t('cancel')}
            </ModalButton>
            <ModalButton variant="save" type="submit">
              {t('create specification')}
            </ModalButton>
          </ModalButtonsBox>
        </ModalBox>
      </form>
    </FormProvider>
  );
};

export default NewSpecForm;

