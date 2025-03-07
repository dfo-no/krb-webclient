import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import Nexus from '../../../../Nexus/Nexus';
import useProjectMutations from '../../../../store/api/ProjectMutations';
import Utils from '../../../../common/Utils';
import { DeleteFrame } from '../../../../components/DeleteFrame/DeleteFrame';
import { Alert } from '../../../../models/Alert';
import { ITag } from '../../../../Nexus/entities/ITag';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import { ModelType } from '../../../../Nexus/enums';
import { Parentable } from '../../../../models/Parentable';
import { useEditableState } from '../../../../components/EditableContext/EditableContext';
import { useGetProjectQuery } from '../../../../store/api/bankApi';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';

interface Props {
  children: React.ReactElement;
  tag: Parentable<ITag>;
  handleClose: () => void;
}

export default function DeleteTagForm({
  children,
  tag,
  handleClose,
}: Props): React.ReactElement {
  const { deleteTag } = useProjectMutations();
  const nexus = Nexus.getInstance();
  const { addAlert } = AlertsContainer.useContainer();
  const { t } = useTranslation();
  const { deleteCandidateId } = useEditableState();

  const methods = useForm<Parentable<ITag>>({
    defaultValues: tag,
    resolver: nexus.resolverService.resolver(ModelType.tag),
  });

  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project } = useGetProjectQuery(projectId);

  if (deleteCandidateId !== tag.id) {
    return children;
  }

  if (!project) {
    return <></>;
  }

  const hasChildren = Utils.checkIfHasChildren(tag, project.tags);

  const infoText = hasChildren
    ? `${t('Cant delete this tag')} ${t('Tag has children')}`
    : '';

  const onSubmit = (put: Parentable<ITag>): void => {
    deleteTag(put).then(() => {
      const alert: Alert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully deleted tag',
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
        <DeleteFrame
          children={children}
          canBeDeleted={!hasChildren}
          infoText={infoText}
          handleCancel={handleClose}
        />
      </form>
    </FormProvider>
  );
}
