import { joiResolver } from '@hookform/resolvers/joi';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import LoaderSpinner from '../../../../common/LoaderSpinner';
import { IAlert } from '../../../../models/IAlert';
import { Parentable } from '../../../../models/Parentable';
import {
  IRequirement,
  PutRequirementSchema
} from '../../../../Nexus/entities/IRequirement';
import { useGetProjectQuery } from '../../../../store/api/bankApi';
import { useAppDispatch } from '../../../../store/hooks';
import { addAlert } from '../../../../store/reducers/alert-reducer';
import useProjectMutations from '../../../../store/api/ProjectMutations';
import { INeed } from '../../../../Nexus/entities/INeed';
import {
  ModalBox,
  ModalButton,
  ModalButtonsBox,
  ModalFieldsBox
} from '../../../../components/ModalBox/ModalBox';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import { Typography } from '@mui/material';
import theme from '../../../../theme';

interface IProps {
  requirement: IRequirement;
  need: Parentable<INeed>;
  handleClose: () => void;
}

interface IRouteParams {
  projectId: string;
}

function EditRequirementForm({
  requirement,
  need,
  handleClose
}: IProps): React.ReactElement {
  const { projectId } = useParams<IRouteParams>();
  const { data: project } = useGetProjectQuery(projectId);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { editRequirement } = useProjectMutations();

  const methods = useForm<Parentable<IRequirement>>({
    defaultValues: requirement,
    resolver: joiResolver(PutRequirementSchema)
  });

  if (!project) {
    return <LoaderSpinner />;
  }

  const onSubmit = async (put: Parentable<IRequirement>) => {
    await editRequirement(put, need).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully edited requirement'
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
        <ModalBox>
          <Typography variant="lg" color={theme.palette.primary.main}>
            {t('Edit requirement')}
          </Typography>
          <ModalFieldsBox>
            <VerticalTextCtrl
              name="title"
              label={t('Title')}
              placeholder={''}
            />
          </ModalFieldsBox>
          <ModalButtonsBox>
            <ModalButton variant="cancel" onClick={() => handleClose()}>
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

export default EditRequirementForm;
