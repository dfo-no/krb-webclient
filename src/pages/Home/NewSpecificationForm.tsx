import { Box, Typography } from '@mui/material/';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
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
  ModalButton,
} from '../../components/ModalBox/ModalBox';
import { ModelType } from '../../Nexus/enums';
import { SPECIFICATION } from '../../common/PathConstants';
import OrganizationField from '../../components/OrgnizationField/OrganizationField';
import { updateObject } from './UpdateFormatsTools';

interface IProps {
  handleClose: () => void;
  specification: ISpecification;
}

const NewSpecificationForm = ({
  handleClose,
  specification: rawSpecification,
}: IProps) => {
  const { t } = useTranslation();
  const history = useHistory();
  const nexus = Nexus.getInstance();

  const specification = updateObject({ ...rawSpecification });
  const methods = useForm<ISpecification>({
    resolver: nexus.resolverService.resolver(ModelType.specification),
    defaultValues: specification,
  });

  const onSubmit = async (post: ISpecification) => {
    const specificationWithId = nexus.specificationService.withId(post);
    nexus.specificationService
      .setSpecification(specificationWithId)
      .then(() => history.push(`/${SPECIFICATION}/${specificationWithId.id}`));
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
            <Typography sx={{ marginLeft: 0.16 }}>
              {t('common.Version')} {specification.bank.version}
            </Typography>
          </Box>
          <ModalFieldsBox>
            <VerticalTextCtrl
              name="title"
              label={t('common.What will be the name of the procurement?')}
              placeholder={t('Name of specification')}
              autoFocus
              required={true}
            />
            <VerticalTextCtrl
              name="caseNumber"
              label={t('Procurement case number')}
              placeholder={t('Case number')}
            />
            <OrganizationField />
          </ModalFieldsBox>
          <ModalButtonsBox>
            <ModalButton variant="cancel" onClick={() => handleClose()}>
              {t('common.Cancel')}
            </ModalButton>
            <ModalButton variant="save" type="submit">
              {t('Create specification')}
            </ModalButton>
          </ModalButtonsBox>
        </ModalBox>
        {console.log(methods.formState.errors)}
        <GeneralErrorMessage errors={methods.formState.errors} />
      </form>
    </FormProvider>
  );
};

export default NewSpecificationForm;
