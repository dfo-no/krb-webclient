import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IAlert } from '../../../models/IAlert';
import { useAppDispatch } from '../../../store/hooks';
import HorizontalTextCtrl from '../../../FormProvider/HorizontalTextCtrl';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Nexus from '../../../Nexus/Nexus';
import { addAlert } from '../../../store/reducers/alert-reducer';
import { FormItemBox } from '../../Components/Form/FormItemBox';
import { FormIconButton } from '../../Components/Form/FormIconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Parentable } from '../../../models/Parentable';
import { useFormStyles } from '../../Components/Form/FormStyles';
import { FormFlexBox } from '../../Components/Form/FormFlexBox';
import { ITag, PostTagSchema } from '../../../Nexus/entities/ITag';
import { useParams } from 'react-router-dom';
import { IRouteParams } from '../../Models/IRouteParams';
import useProjectMutations from '../../../store/api/ProjectMutations';

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
          <FormFlexBox sx={{ paddingLeft: 1, paddingRight: 1 }}>
            <HorizontalTextCtrl name="title" placeholder={t('Title')} />
          </FormFlexBox>
          <FormIconButton type="submit" aria-label="save">
            <CheckIcon />
          </FormIconButton>
          <FormIconButton onClick={() => handleClose()} aria-label="close">
            <CloseIcon />
          </FormIconButton>
        </FormItemBox>
      </form>
    </FormProvider>
  );
}
