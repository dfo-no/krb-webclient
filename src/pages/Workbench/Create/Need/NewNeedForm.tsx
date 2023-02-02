import { FormProvider, useForm } from 'react-hook-form';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import Nexus from '../../../../Nexus/Nexus';
import theme from '../../../../theme';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import { Alert } from '../../../../models/Alert';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import {
  ModalBox,
  ModalButton,
  ModalButtonsBox,
  ModalFieldsBox,
} from '../../../../components/ModalBox/ModalBox';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';
import {
  createNeed,
  NeedForm,
  NeedSchema,
  setRefOnItem,
} from '../../../../api/nexus2';

interface Props {
  handleClose: (newNeed: NeedForm | null) => void;
}

function NewNeedForm({ handleClose }: Props): React.ReactElement {
  const { projectId } = useParams<IRouteProjectParams>();

  const nexus = Nexus.getInstance();
  // const defaultValues: NeedForm =
  //   nexus.needService.generateDefaultNeedValues(projectId);
  const { addAlert } = AlertsContainer.useContainer();

  const { t } = useTranslation();

  const methods = useForm<NeedForm>({
    resolver: zodResolver(NeedSchema),
    defaultValues: {
      ref: '',
      title: '',
      description: '',
    },
  });

  const onSubmit = async (post: NeedForm) => {
    const newNeed = setRefOnItem(post);
    await createNeed({ projectRef: projectId, ...newNeed }).then(() => {
      const alert: Alert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully added new need',
      };
      addAlert(alert);
      methods.reset();
      handleClose(newNeed);
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
            {t('Create need')}
          </Typography>
          <ModalFieldsBox>
            <VerticalTextCtrl
              name="title"
              label={t('Title')}
              placeholder={''}
              autoFocus
            />
            <VerticalTextCtrl
              name="description"
              label={t('Description')}
              placeholder={''}
            />
          </ModalFieldsBox>
          <ModalButtonsBox>
            <ModalButton variant="cancel" onClick={() => handleClose(null)}>
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

export default NewNeedForm;
