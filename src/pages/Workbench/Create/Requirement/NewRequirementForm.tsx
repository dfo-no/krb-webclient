import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import Nexus from '../../../../Nexus/Nexus';
import RequirementService from '../../../../Nexus/services/RequirementService';
import theme from '../../../../theme';
import useProjectMutations from '../../../../store/api/ProjectMutations';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import { Alert } from '../../../../models/Alert';
import { IRequirement } from '../../../../Nexus/entities/IRequirement';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import {
  ModalBox,
  ModalButton,
  ModalButtonsBox,
  ModalFieldsBox,
} from '../../../../components/ModalBox/ModalBox';
import { ModelType } from '../../../../Nexus/enums';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';
import { Need } from '../../../../api/openapi-fetch';

interface Props {
  need: Need;
  handleClose: (id: string) => void;
}

function NewRequirementForm({ need, handleClose }: Props): React.ReactElement {
  const { addAlert } = AlertsContainer.useContainer();
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
  const { projectId } = useParams<IRouteProjectParams>();
  const { addRequirement } = useProjectMutations();

  const defaultValues: IRequirement = RequirementService.defaultRequirement(
    projectId,
    need.ref
  );

  const methods = useForm<IRequirement>({
    resolver: nexus.resolverService.postResolver(ModelType.requirement),
    defaultValues,
  });

  const onSubmit = async (post: IRequirement) => {
    const newRequirement =
      nexus.requirementService.createRequirementWithId(post);
    // TODO: Uncomment
    // await addRequirement(newRequirement, need).then(() => {
    //   const alert: Alert = {
    //     id: uuidv4(),
    //     style: 'success',
    //     text: t('Successfully created new requirement'),
    //   };
    //   addAlert(alert);
    //   handleClose(newRequirement.id);
    //   methods.reset();
    // });
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

export default NewRequirementForm;
