import { joiResolver } from '@hookform/resolvers/joi';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import HorizontalTextCtrl from '../../../FormProvider/HorizontalTextCtrl';
import { IAlert } from '../../../models/IAlert';
import { Parentable } from '../../../models/Parentable';
import { ITag, PostTagSchema } from '../../../Nexus/entities/ITag';
import Nexus from '../../../Nexus/Nexus';
import useProjectMutations from '../../../store/api/ProjectMutations';
import { useAppDispatch } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import { FormFlexBox } from '../../Components/Form/FormFlexBox';
import { FormIconButton } from '../../Components/Form/FormIconButton';
import { FormItemBox } from '../../Components/Form/FormItemBox';
import { useFormStyles } from '../../Components/Form/FormStyles';
import { IRouteParams } from '../../Models/IRouteParams';

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
            <HorizontalTextCtrl
              name="description"
              placeholder={t('Description')}
            />
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
