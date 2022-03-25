import { joiResolver } from '@hookform/resolvers/joi';
import Button from '@mui/material/Button';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { IAlert } from '../../../models/IAlert';
import { Parentable } from '../../../models/Parentable';
import { INeed } from '../../../Nexus/entities/INeed';
import {
  IRequirement,
  PostRequirementSchema
} from '../../../Nexus/entities/IRequirement';
import { useAppDispatch } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import Nexus from '../../../Nexus/Nexus';
import { useParams } from 'react-router-dom';
import { IRouteParams } from '../../Models/IRouteParams';
import useProjectMutations from '../../../store/api/ProjectMutations';
import { ModalBox, ModalButtonsBox } from '../../Components/ModalBox';
import VerticalTextCtrl from '../../../FormProvider/VerticalTextCtrl';

interface IProps {
  need: Parentable<INeed>;
  handleClose: (newRequirement: IRequirement | null) => void;
}

function NewRequirementForm({ need, handleClose }: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
  const { projectId } = useParams<IRouteParams>();
  const { addRequirement } = useProjectMutations();

  const defaultValues: IRequirement =
    nexus.requirementService.generateDefaultRequirementValues(
      projectId,
      need.id
    );

  const methods = useForm<IRequirement>({
    resolver: joiResolver(PostRequirementSchema),
    defaultValues
  });

  const onSubmit = async (post: IRequirement) => {
    const newRequirement =
      nexus.requirementService.createRequirementWithId(post);
    await addRequirement(newRequirement, need).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully created new requirement'
      };
      dispatch(addAlert({ alert }));
      handleClose(newRequirement);
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
          <VerticalTextCtrl name="title" label={t('Title')} placeholder="" />
          <ModalButtonsBox>
            <Button variant="primary" type="submit">
              {t('save')}
            </Button>
            <Button variant="warning" onClick={() => handleClose(null)}>
              {t('cancel')}
            </Button>
          </ModalButtonsBox>
        </ModalBox>
      </form>
    </FormProvider>
  );
}

export default NewRequirementForm;
