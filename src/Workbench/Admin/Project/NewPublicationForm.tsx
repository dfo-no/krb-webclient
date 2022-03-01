import React, { useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import Nexus from '../../../Nexus/Nexus';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { IAlert } from '../../../models/IAlert';
import { v4 as uuidv4 } from 'uuid';
import { addAlert } from '../../../store/reducers/alert-reducer';
import TextCtrl from '../../../FormProvider/TextCtrl';
import { IBank } from '../../../Nexus/entities/IBank';
import {
  IPublication,
  PostPublicationSchema
} from '../../../Nexus/entities/IPublication';
import { bankApi } from '../../../store/api/bankApi';
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
  const [addBank] = bankApi.useAddBankMutation();
  const [putProject] = bankApi.usePutProjectMutation();
  const { t } = useTranslation();
  const classes = useFormStyles();
  const [isSubmitting, setSubmitting] = useState(false);

  const methods = useForm<IPublication>({
    resolver: joiResolver(PostPublicationSchema),
    defaultValues: nexus.publicationService.defaultPublication(project.id)
  });

  const saveValues = (post: IPublication) => {
    setSubmitting(true);
    const publication = { ...post };
    const newPublications = [...project.publications];

    const generatedBank: IBank =
      nexus.publicationService.generateBankFromProject(project);

    // save the new published Bank
    addBank(generatedBank)
      .unwrap()
      .then((result: IBank) => {
        // Update Publication with new data
        publication.id = result.id;
        publication.bankId = result.id;
        publication.version = result.version;
        publication.date = result.publishedDate ?? null;
        // add publication to selected Bank
        newPublications.push(publication);

        // save selected project to db
        const alert: IAlert = {
          id: uuidv4(),
          style: 'success',
          text: `successfully published version ${result.version}`
        };
        putProject({ ...project, publications: newPublications }).then(() => {
          dispatch(addAlert({ alert }));
          handleClose();
        });
      });
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          className={classes.form}
          onSubmit={methods.handleSubmit(saveValues)}
        >
          <FormItemBox>
            <FormFlexBox sx={{ paddingLeft: 1, paddingRight: 1 }}>
              <TextCtrl name="comment" label={t('Comment')} />
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
