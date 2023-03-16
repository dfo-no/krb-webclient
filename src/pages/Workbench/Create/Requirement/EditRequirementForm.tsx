import { FormProvider, useForm } from 'react-hook-form';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { zodResolver } from '@hookform/resolvers/zod';

import LoaderSpinner from '../../../../common/LoaderSpinner';
import Nexus from '../../../../Nexus/Nexus';
import theme from '../../../../theme';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import { Alert } from '../../../../models/Alert';
import {
  ModalBox,
  ModalButton,
  ModalButtonsBox,
  ModalFieldsBox,
} from '../../../../components/ModalBox/ModalBox';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';
import {
  RequirementForm,
  RequirementSchema,
  updateRequirement,
} from '../../../../api/nexus2';
import ErrorSummary from '../../../../Form/ErrorSummary';

interface Props {
  projectRef: string;
  needRef: string;
  requirement: RequirementForm;
  handleClose: () => void;
}

function EditRequirementForm({
  projectRef,
  needRef,
  requirement,
  handleClose,
}: Props): React.ReactElement {
  const { addAlert } = AlertsContainer.useContainer();
  const { t } = useTranslation();

  const methods = useForm<RequirementForm>({
    defaultValues: requirement,
    resolver: zodResolver(RequirementSchema),
  });

  console.log('reqRef', requirement.ref);
  const onSubmit = async (updatedRequirement: RequirementForm) => {
    await updateRequirement({
      projectRef,
      needRef,
      requirementRef: updatedRequirement.ref,
      ...updatedRequirement,
    }).then(() => {
      const alert: Alert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully edited requirement',
      };
      addAlert(alert);
      handleClose();
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
          <Typography variant="lg" color={theme.palette.primary.main}>
            {t('Edit requirement')}
          </Typography>
          <ModalFieldsBox>
            <VerticalTextCtrl
              name="title"
              label={t('Title')}
              placeholder={''}
              autoFocus
            />
          </ModalFieldsBox>
          <ModalButtonsBox>
            <ModalButton variant="cancel" onClick={() => handleClose()}>
              {t('common.Cancel')}
            </ModalButton>
            <ModalButton variant="save" type="submit">
              {t('Save')}
            </ModalButton>
          </ModalButtonsBox>
        </ModalBox>
      </form>
      <ErrorSummary errors={methods.formState.errors} />
    </FormProvider>
  );
}

export default EditRequirementForm;
