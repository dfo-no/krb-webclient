import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import FormButtons from '../../../../components/Form/FormButtons';
import Nexus from '../../../../Nexus/Nexus';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import { addAlert } from '../../../../store/reducers/alert-reducer';
import { FormItemBox } from '../../../../components/Form/FormItemBox';
import { IAlert } from '../../../../models/IAlert';
import { IBank } from '../../../../Nexus/entities/IBank';
import {
  IPublication,
  PostPublicationSchema
} from '../../../../Nexus/entities/IPublication';
import {
  useAddBankMutation,
  usePutProjectMutation
} from '../../../../store/api/bankApi';
import { useAppDispatch } from '../../../../store/hooks';
import { useFormStyles } from '../../../../components/Form/FormStyles';

interface IProps {
  project: IBank;
  handleClose: () => void;
}

export default function NewPublicationForm({
  project,
  handleClose
}: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const nexus = Nexus.getInstance();
  const [addBank] = useAddBankMutation();
  const [putProject] = usePutProjectMutation();
  const { t } = useTranslation();
  const formStyles = useFormStyles();

  const defaultValues = nexus.publicationService.defaultPublication(project.id);
  const methods = useForm<IPublication>({
    resolver: joiResolver(PostPublicationSchema),
    defaultValues
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
        // Update Publication with new data
        publication.id = result.id;
        publication.bankId = result.id;
        publication.version = result.version;
        publication.date = result.publishedDate ?? null;
        // add publication to selected Bank
        newPublications.push(publication);

        putProject({ ...project, publications: newPublications }).then(() => {
          const alert: IAlert = {
            id: uuidv4(),
            style: 'success',
            text: `successfully published version ${result.version}`
          };
          dispatch(addAlert({ alert }));
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
        </form>
      </FormProvider>
    </>
  );
}
