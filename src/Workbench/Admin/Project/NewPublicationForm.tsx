import React, { useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import Nexus from '../../../Nexus/Nexus';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { IAlert } from '../../../models/IAlert';
import { v4 as uuidv4 } from 'uuid';
import { addAlert } from '../../../store/reducers/alert-reducer';
import HorizontalTextCtrl from '../../../FormProvider/HorizontalTextCtrl';
import { IBank } from '../../../Nexus/entities/IBank';
import {
  IPublication,
  PostPublicationSchema
} from '../../../Nexus/entities/IPublication';
import {
  useAddBankMutation,
  usePutProjectMutation
} from '../../../store/api/bankApi';
import { FormFlexBox } from '../../Components/Form/FormFlexBox';
import { FormIconButton } from '../../Components/Form/FormIconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { FormItemBox } from '../../Components/Form/FormItemBox';
import { useFormStyles } from '../../Components/Form/FormStyles';

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
  const classes = useFormStyles();
  const [isSubmitting, setSubmitting] = useState(false);

  const defaultValues = nexus.publicationService.defaultPublication(project.id);
  const methods = useForm<IPublication>({
    resolver: joiResolver(PostPublicationSchema),
    defaultValues
  });

  async function saveValues(post: IPublication) {
    setSubmitting(true);

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
          className={classes.form}
          onSubmit={methods.handleSubmit(saveValues)}
        >
          <FormItemBox>
            <FormFlexBox sx={{ paddingLeft: 1, paddingRight: 1 }}>
              <HorizontalTextCtrl name="comment" placeholder={t('Comment')} />
            </FormFlexBox>
            <FormIconButton
              disabled={isSubmitting}
              type="submit"
              aria-label="save"
            >
              <CheckIcon />
            </FormIconButton>
            <FormIconButton
              disabled={isSubmitting}
              onClick={() => handleClose()}
              aria-label="close"
            >
              <CloseIcon />
            </FormIconButton>
          </FormItemBox>
        </form>
      </FormProvider>
    </>
  );
}
