import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { zodResolver } from '@hookform/resolvers/zod';

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
import { Need } from '../../../../api/openapi-fetch';
import {
  createRequirement,
  RequirementForm,
  RequirementSchema,
} from '../../../../api/nexus2';

interface Props {
  projectRef: string;
  need: Need;
  handleClose: (id: string) => void;
}

export function NewRequirementForm({
  projectRef,
  need,
  handleClose,
}: Props): React.ReactElement {
  const { addAlert } = AlertsContainer.useContainer();
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();

  const methods = useForm<RequirementForm>({
    resolver: zodResolver(RequirementSchema),
    defaultValues: {
      title: '',
      description: '',
      ref: uuidv4(),
      needRef: need.ref,
    },
  });

  const onSubmit = async (newRequirement: RequirementForm) => {
    await createRequirement({ projectRef, ...newRequirement }).then(() => {
      const alert: Alert = {
        id: uuidv4(),
        style: 'success',
        text: t('Successfully created new requirement'),
      };
      addAlert(alert);
      handleClose(newRequirement.ref);
      methods.reset();
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
            {t('Create requirement')}
          </Typography>
          <ModalFieldsBox>
            <VerticalTextCtrl
              name="title"
              label={t('Title')}
              placeholder={t('Requirement title')}
              autoFocus
            />
          </ModalFieldsBox>
          <ModalButtonsBox>
            <ModalButton variant="cancel" onClick={() => handleClose('')}>
              {t('common.Cancel')}
            </ModalButton>
            <ModalButton variant="save" type="submit">
              {t('Save')}
            </ModalButton>
          </ModalButtonsBox>
        </ModalBox>
      </form>
    </FormProvider>
  );
}
