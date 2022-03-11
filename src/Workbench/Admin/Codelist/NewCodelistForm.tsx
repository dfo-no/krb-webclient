import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { v4 as uuidv4 } from 'uuid';
import TextCtrl from '../../../FormProvider/TextCtrl';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import Nexus from '../../../Nexus/Nexus';
import {
  ICodelist,
  PostCodelistSchema
} from '../../../Nexus/entities/ICodelist';
import { IAlert } from '../../../models/IAlert';
import { FormIconButton } from '../../Components/Form/FormIconButton';
import { FormItemBox } from '../../Components/Form/FormItemBox';
import { FormFlexBox } from '../../Components/Form/FormFlexBox';
import { useFormStyles } from '../../Components/Form/FormStyles';
import { useParams } from 'react-router-dom';
import { IRouteParams } from '../../Models/IRouteParams';
import useProjectMutations from '../../../store/api/ProjectMutations';

interface IProps {
  handleClose: (newCodelist: ICodelist | null) => void;
}

export default function NewCodelistForm({
  handleClose
}: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
  const classes = useFormStyles();
  const { projectId } = useParams<IRouteParams>();
  const { addCodelist } = useProjectMutations();

  const defaultValues: ICodelist =
    nexus.codelistService.generateDefaultCodelistValues(projectId);

  const methods = useForm<ICodelist>({
    resolver: joiResolver(PostCodelistSchema),
    defaultValues
  });

  async function onSubmit(post: ICodelist) {
    const newCodelist = nexus.codelistService.createCodelistWithId(post);
    await addCodelist(newCodelist).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully created codelist'
      };
      dispatch(addAlert({ alert }));
      methods.reset();
      handleClose(newCodelist);
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
          <FormFlexBox sx={{ paddingLeft: 1 }}>
            <TextCtrl name="title" placeholder={t('Title')} />
          </FormFlexBox>
          <FormFlexBox sx={{ paddingLeft: 1, paddingRight: 1 }}>
            <TextCtrl name="description" placeholder={t('Description')} />
          </FormFlexBox>
          <FormIconButton type="submit" aria-label="save">
            <CheckIcon />
          </FormIconButton>
          <FormIconButton onClick={() => handleClose(null)} aria-label="close">
            <CloseIcon />
          </FormIconButton>
        </FormItemBox>
      </form>
    </FormProvider>
  );
}
