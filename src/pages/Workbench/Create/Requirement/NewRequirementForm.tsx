import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import Nexus from '../../../../Nexus/Nexus';
import theme from '../../../../theme';
import useProjectMutations from '../../../../store/api/ProjectMutations';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import { addAlert } from '../../../../store/reducers/alert-reducer';
import { IAlert } from '../../../../models/IAlert';
import { INeed } from '../../../../Nexus/entities/INeed';
import { IRequirement } from '../../../../Nexus/entities/IRequirement';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
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
  need: Parentable<INeed>;
  handleClose: (id: string) => void;
}

function NewRequirementForm({ need, handleClose }: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
  const { projectId } = useParams<IRouteProjectParams>();
  const { addRequirement } = useProjectMutations();

  const defaultValues: IRequirement =
    nexus.requirementService.generateDefaultRequirementValues(
      projectId,
      need.id
    );

  const methods = useForm<IRequirement>({
    resolver: nexus.resolverService.postResolver(ModelType.requirement),
    defaultValues
  });

  const onSubmit = async (post: IRequirement) => {
    const newRequirement =
      nexus.requirementService.createRequirementWithId(post);
    await addRequirement(newRequirement, need).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: t('Successfully created new requirement')
      };
      dispatch(addAlert({ alert }));
      handleClose(newRequirement.id);
      methods.reset();
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
            {t('Create requirement')}
          </Typography>
          <ModalFieldsBox>
            <VerticalTextCtrl
              name="title"
              label={t('Title')}
              placeholder={t('Requirement title')}
            />
          </ModalFieldsBox>
          <ModalButtonsBox>
            <ModalButton variant="cancel" onClick={() => handleClose('')}>
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

export default NewRequirementForm;
