import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import FormButtons from '../../../../components/Form/FormButtons';
import Nexus from '../../../../Nexus/Nexus';
import useProjectMutations from '../../../../store/api/ProjectMutations';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import { FormItemBox } from '../../../../components/Form/FormItemBox';
import { Alert } from '../../../../models/Alert';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import { ITag } from '../../../../Nexus/entities/ITag';
import { ModelType } from '../../../../Nexus/enums';
import { Parentable } from '../../../../models/Parentable';
import { useFormStyles } from '../../../../components/Form/FormStyles';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';

interface Props {
  handleClose: () => void;
}

export default function NewTagForm({ handleClose }: Props): React.ReactElement {
  const { addAlert } = AlertsContainer.useContainer();
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
  const formStyles = useFormStyles();
  const { projectId } = useParams<IRouteProjectParams>();
  const { addTag } = useProjectMutations();

  const defaultValues: Parentable<ITag> =
    nexus.tagService.generateDefaultTaglistValues(projectId);

  const methods = useForm<Parentable<ITag>>({
    resolver: nexus.resolverService.postResolver(ModelType.tag),
    defaultValues,
  });

  async function onSubmit(post: Parentable<ITag>) {
    const newTag = nexus.tagService.generateTag(post);
    await addTag(newTag).then(() => {
      const alert: Alert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully created tag',
      };
      addAlert(alert);
      methods.reset();
      handleClose();
    });
  }

  return (
    <FormProvider {...methods}>
      <form
        className={formStyles.flexGrowForm}
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <FormItemBox>
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
          <FormButtons handleCancel={() => handleClose()} />
        </FormItemBox>
      </form>
    </FormProvider>
  );
}
