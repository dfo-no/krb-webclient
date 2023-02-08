import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import FormButtons from '../../../../components/Form/FormButtons';
import Nexus from '../../../../Nexus/Nexus';
import useProjectMutations from '../../../../store/api/ProjectMutations';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import { FormItemBox } from '../../../../components/Form/FormItemBox';
import { Alert } from '../../../../models/Alert';
import { ICode } from '../../../../Nexus/entities/ICode';
import { ICodelist } from '../../../../Nexus/entities/ICodelist';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import { ModelType } from '../../../../Nexus/enums';
import { Parentable } from '../../../../models/Parentable';
import { useFormStyles } from '../../../../components/Form/FormStyles';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';

interface Props {
  codelist: ICodelist;
  handleClose: (newCode: Parentable<ICode>) => void;
  handleCancel: () => void;
}

export default function NewCodeForm({
  codelist,
  handleClose,
  handleCancel,
}: Props): React.ReactElement {
  const { addAlert } = AlertsContainer.useContainer();
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
  const formStyles = useFormStyles();
  const { projectId } = useParams<IRouteProjectParams>();
  const { addCode } = useProjectMutations();

  const defaultValues: Parentable<ICode> =
    nexus.codelistService.generateDefaultCodeValues(projectId);

  const methods = useForm<Parentable<ICode>>({
    resolver: nexus.resolverService.postResolver(ModelType.code),
    defaultValues,
  });

  async function onSubmit(post: Parentable<ICode>) {
    const newCode = nexus.codelistService.createCodeWithId(post);
    await addCode(newCode, codelist).then(() => {
      const alert: Alert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully created code',
      };
      addAlert(alert);
      methods.reset();
      handleClose(newCode);
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
          <FormButtons handleCancel={handleCancel} />
        </FormItemBox>
      </form>
    </FormProvider>
  );
}
