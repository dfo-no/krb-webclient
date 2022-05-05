import { joiResolver } from '@hookform/resolvers/joi';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import VerticalTextCtrl from '../../../FormProvider/VerticalTextCtrl';
import { IAlert } from '../../../models/IAlert';
import { Parentable } from '../../../models/Parentable';
import { INeed, PostNeedSchema } from '../../../Nexus/entities/INeed';
import Nexus from '../../../Nexus/Nexus';
import { useAppDispatch } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import useProjectMutations from '../../../store/api/ProjectMutations';
import { useParams } from 'react-router-dom';
import { IRouteParams } from '../../Models/IRouteParams';
import {
  ModalBox,
  ModalButton,
  ModalButtonsBox,
  ModalFieldsBox
} from '../../Components/ModalBox';
import { Typography } from '@mui/material';
import theme from '../../../theme';

interface IProps {
  handleClose: (newNeed: Parentable<INeed> | null) => void;
}

function NewNeedForm({ handleClose }: IProps): React.ReactElement {
  const { projectId } = useParams<IRouteParams>();

  const nexus = Nexus.getInstance();
  const defaultValues: Parentable<INeed> =
    nexus.needService.generateDefaultNeedValues(projectId);
  const dispatch = useAppDispatch();
  const { addNeed } = useProjectMutations();

  const { t } = useTranslation();

  const methods = useForm<Parentable<INeed>>({
    resolver: joiResolver(PostNeedSchema),
    defaultValues
  });

  const onSubmit = async (post: Parentable<INeed>) => {
    const newNeed = nexus.needService.createNeedWithId(post);
    await addNeed(newNeed).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully added new need'
      };
      dispatch(addAlert({ alert }));
      methods.reset();
      handleClose(newNeed);
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <ModalBox>
          <Typography variant="lg" color={theme.palette.primary.main}>
            {t('create need')}
          </Typography>
          <ModalFieldsBox>
            <VerticalTextCtrl
              name="title"
              label={t('Title')}
              placeholder={''}
            />
            <VerticalTextCtrl
              name="description"
              label={t('Description')}
              placeholder={''}
            />
          </ModalFieldsBox>
          <ModalButtonsBox>
            <ModalButton variant="cancel" onClick={() => handleClose(null)}>
              {t('cancel')}
            </ModalButton>
            <ModalButton variant="save" type="submit">
              {t('save')}
            </ModalButton>
          </ModalButtonsBox>
        </ModalBox>
      </form>
    </FormProvider>
  );
}

export default NewNeedForm;
