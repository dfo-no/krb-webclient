import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import FormButtons from '../../../../components/Form/FormButtons';
import GeneralErrorMessage from '../../../../Form/GeneralErrorMessage';
import Nexus from '../../../../Nexus/Nexus';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import { FormItemBox } from '../../../../components/Form/FormItemBox';
import { Alert } from '../../../../models/Alert';
import { IBank } from '../../../../Nexus/entities/IBank';
import { IPublication } from '../../../../Nexus/entities/IPublication';
import { ModelType } from '../../../../Nexus/enums';
import {
  useAddBankMutation,
  usePutProjectMutation,
} from '../../../../store/api/bankApi';
import { useFormStyles } from '../../../../components/Form/FormStyles';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';

interface Props {
  project: IBank;
  handleClose: () => void;
}

export default function NewPublicationForm({
  project,
  handleClose,
}: Props): React.ReactElement {
  const { addAlert } = AlertsContainer.useContainer();
  const nexus = Nexus.getInstance();
  const [addBank] = useAddBankMutation();
  const [putProject] = usePutProjectMutation();
  const { t } = useTranslation();
  const formStyles = useFormStyles();

  const defaultValues = nexus.publicationService.defaultPublication(project.id);
  const methods = useForm<IPublication>({
    resolver: nexus.resolverService.postResolver(ModelType.publication),
    defaultValues,
  });

  async function saveValues(post: IPublication) {
    const generatedBank: IBank =
      nexus.publicationService.generateBankFromProject(project);

    // save the new published Bank
    await addBank(generatedBank)
      .unwrap()
      .then((result: IBank) => {
        const publication = { ...post };
        const newPublications = [...project.publications];
        // Update Publications with new data
        publication.id = result.id;
        publication.bankId = result.id;
        publication.version = result.version;
        publication.date = result.publishedDate ?? null;
        publication.deletedDate = null;
        // add publication to selected Bank
        newPublications.push(publication);

        putProject({ ...project, publications: newPublications }).then(() => {
          const alert: Alert = {
            id: uuidv4(),
            style: 'success',
            text: `successfully published version ${result.version}`,
          };
          addAlert(alert);
          methods.reset();
          handleClose();
        });
      });
  }

  return (
    <>
      <FormProvider {...methods}>
        <form
          className={formStyles.flexGrowForm}
          onSubmit={methods.handleSubmit(saveValues)}
        >
          <FormItemBox>
            <VerticalTextCtrl
              name="comment"
              label={t('Comment')}
              placeholder={''}
            />
            <FormButtons handleClose={() => handleClose()} />
          </FormItemBox>
          <GeneralErrorMessage errors={methods.formState.errors} />
        </form>
      </FormProvider>
    </>
  );
}
