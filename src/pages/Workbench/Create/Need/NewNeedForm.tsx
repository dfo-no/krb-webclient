import { FormProvider, useForm } from 'react-hook-form';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';

import Nexus from '../../../../Nexus/Nexus';
import theme from '../../../../theme';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import useProjectMutations from '../../../../store/api/ProjectMutations';
import { Alert } from '../../../../models/Alert';
import { INeed } from '../../../../Nexus/entities/INeed';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import {
  ModalBox,
  ModalButton,
  ModalButtonsBox,
  ModalFieldsBox,
} from '../../../../components/ModalBox/ModalBox';
import { ModelType } from '../../../../Nexus/enums';
import { Parentable } from '../../../../models/Parentable';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';

interface Props {
  handleClose: (newNeed: Parentable<INeed>) => void;
  handleCancel: () => void;
}

function NewNeedForm({ handleClose, handleCancel }: Props): React.ReactElement {
  const { projectId } = useParams<IRouteProjectParams>();

  const nexus = Nexus.getInstance();
  const defaultValues: Parentable<INeed> =
    nexus.needService.generateDefaultNeedValues(projectId);
  const { addAlert } = AlertsContainer.useContainer();
  const { addNeed } = useProjectMutations();

  const { t } = useTranslation();

  const methods = useForm<Parentable<INeed>>({
    resolver: nexus.resolverService.postResolver(ModelType.need),
    defaultValues,
  });

  const onSubmit = async (post: Parentable<INeed>) => {
    const newNeed = nexus.needService.createNeedWithId(post);
    await addNeed(newNeed).then(() => {
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
            <ModalButton variant="cancel" onClick={handleCancel}>
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
