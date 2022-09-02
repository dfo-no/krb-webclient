import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import Nexus from '../../../../Nexus/Nexus';
import theme from '../../../../theme';
import useProjectMutations from '../../../../store/api/ProjectMutations';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import { addAlert } from '../../../../store/reducers/alert-reducer';
import { IAlert } from '../../../../models/IAlert';
import { INeed } from '../../../../Nexus/entities/INeed';
import {
  ModalBox,
  ModalButton,
  ModalButtonsBox,
  ModalFieldsBox
} from '../../../../components/ModalBox/ModalBox';
import { ModelType } from '../../../../Nexus/enums';
import { Parentable } from '../../../../models/Parentable';
import { useAppDispatch } from '../../../../store/hooks';

interface IProps {
  handleClose: (need: Parentable<INeed> | null) => void;
  need: Parentable<INeed>;
}

function EditNeedForm({ need, handleClose }: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const nexus = Nexus.getInstance();
  const { t } = useTranslation();
  const { editNeed } = useProjectMutations();

  const methods = useForm<Parentable<INeed>>({
    defaultValues: need,
    resolver: nexus.resolverService.resolver(ModelType.need)
  });

  const onSubmit = async (put: Parentable<INeed>) => {
    await editNeed(put).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully edited need'
      };
      dispatch(addAlert({ alert }));
      handleClose(put);
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
            {t('Edit need')}
          </Typography>
          <ModalFieldsBox>
            <VerticalTextCtrl
              name="title"
              label={t('Title')}
              placeholder={''}
              autoFocus
            />
            <VerticalTextCtrl
              name="description"
              label={t('Description')}
              placeholder={''}
            />
          </ModalFieldsBox>
          <ModalButtonsBox>
            <ModalButton variant="cancel" onClick={() => handleClose(null)}>
              {t('Cancel')}
            </ModalButton>
            <ModalButton variant="save" type="submit">
              {t('Save')}
            </ModalButton>
          </ModalButtonsBox>
        </ModalBox>
      </form>
    </FormProvider>
  );
}

export default EditNeedForm;
