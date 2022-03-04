import { joiResolver } from '@hookform/resolvers/joi';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { IAlert } from '../../../models/IAlert';
import { Parentable } from '../../../models/Parentable';
import { useAppDispatch } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import { FormItemBox } from '../../Components/Form/FormItemBox';
import TextCtrl from '../../../FormProvider/TextCtrl';
import { FormIconButton } from '../../Components/Form/FormIconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useFormStyles } from '../../Components/Form/FormStyles';
import { FormFlexBox } from '../../Components/Form/FormFlexBox';
import { BaseTagSchema, ITag } from '../../../Nexus/entities/ITag';
import useProjectMutations from '../../../store/api/ProjectMutations';

interface IProps {
  tag: Parentable<ITag>;
  handleClose: () => void;
}

export default function EditTagForm({
  tag,
  handleClose
}: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const classes = useFormStyles();
  const { editTag } = useProjectMutations();

  const methods = useForm<Parentable<ITag>>({
    defaultValues: tag,
    resolver: joiResolver(BaseTagSchema)
  });

  async function onSubmit(put: Parentable<ITag>) {
    await editTag(put).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully edited tag'
      };
      dispatch(addAlert({ alert }));
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
            <TextCtrl name="title" label={t('Title')} />
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
