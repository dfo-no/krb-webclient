import { joiResolver } from '@hookform/resolvers/joi';
import Button from '@mui/material/Button';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import Utils from '../../common/Utils';
import TextCtrl from '../../FormProvider/TextCtrl';
import { IAlert } from '../../models/IAlert';
import { Nestable } from '../../models/Nestable';
import { Parentable } from '../../models/Parentable';
import { INeed, PutNeedSchema } from '../../Nexus/entities/INeed';
import { useAppDispatch } from '../../store/hooks';
import { addAlert } from '../../store/reducers/alert-reducer';
import {
  editNeed,
  putSelectedProjectThunk
} from '../../store/reducers/project-reducer';

interface IProps {
  element: INeed;
  handleClose: () => void;
}

function EditNeedForm({ element, handleClose }: IProps): React.ReactElement {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const methods = useForm<Parentable<INeed>>({
    defaultValues: element,
    resolver: joiResolver(PutNeedSchema)
  });

  const onSubmit = (post: Nestable<INeed>) => {
    const postNeed = Utils.nestable2Parentable(post);
    dispatch(editNeed(postNeed));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully edited need'
      };
      dispatch(addAlert({ alert }));
      handleClose();
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <TextCtrl name="title" label={t('Title')} />
        <TextCtrl name="description" label={t('Description')} />

        <Button variant="primary" type="submit">
          {t('save')}
        </Button>
        <Button variant="warning" onClick={handleClose}>
          {t('cancel')}
        </Button>
      </form>
    </FormProvider>
  );
}

export default EditNeedForm;
