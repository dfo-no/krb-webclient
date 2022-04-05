import { joiResolver } from '@hookform/resolvers/joi';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { IAlert } from '../../../models/IAlert';
import { Parentable } from '../../../models/Parentable';
import { ITag, PostTagSchema } from '../../../Nexus/entities/ITag';
import Nexus from '../../../Nexus/Nexus';
import useProjectMutations from '../../../store/api/ProjectMutations';
import { useAppDispatch } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import { FormItemBox } from '../../Components/Form/FormItemBox';
import { useFormStyles } from '../../Components/Form/FormStyles';
import { IRouteParams } from '../../Models/IRouteParams';
import FormButtons from '../../Components/Form/FormButtons';
import VerticalTextCtrl from '../../../FormProvider/VerticalTextCtrl';

interface IProps {
  handleClose: () => void;
}

export default function NewTagForm({
  handleClose
}: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
  const classes = useFormStyles();
  const { projectId } = useParams<IRouteParams>();
  const { addTag } = useProjectMutations();

  const defaultValues: Parentable<ITag> =
    nexus.tagService.generateDefaultTaglistValues(projectId);

  const methods = useForm<Parentable<ITag>>({
    resolver: joiResolver(PostTagSchema),
    defaultValues
  });

  async function onSubmit(post: Parentable<ITag>) {
    const newTag = nexus.tagService.generateTag(post);
    await addTag(newTag).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully created tag'
      };
      dispatch(addAlert({ alert }));
      methods.reset();
      handleClose();
    });
  }

  return (
    <FormProvider {...methods}>
      <form
        className={classes.form}
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <FormItemBox>
          <VerticalTextCtrl name="title" label={t('Title')} placeholder={''} />
          <VerticalTextCtrl
            name="description"
            label={t('Description')}
            placeholder={''}
          />
          <FormButtons handleClose={() => handleClose()} />
        </FormItemBox>
      </form>
    </FormProvider>
  );
}
