import { Typography } from '@mui/material/';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import Nexus from '../../../Nexus/Nexus';
import ProjectService from '../../../Nexus/services/ProjectService';
import theme from '../../../theme';
import VerticalTextCtrl from '../../../FormProvider/VerticalTextCtrl';
import { addAlert } from '../../../store/reducers/alert-reducer';
import { IAlert } from '../../../models/IAlert';
import { IBank } from '../../../Nexus/entities/IBank';
import {
  ModalBox,
  ModalButton,
  ModalButtonsBox,
  ModalFieldsBox
} from '../../../components/ModalBox/ModalBox';
import { ModelType } from '../../../Nexus/enums';
import { usePostProjectMutation } from '../../../store/api/bankApi';
import { useAppDispatch } from '../../../store/hooks';

interface IProps {
  handleClose: () => void;
}

const NewProjectForm = ({ handleClose }: IProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();

  // TODO: Should contain a defaultValue from options to fully control the Select
  const defaultValues = ProjectService.defaultProject();
  const [postProject] = usePostProjectMutation();
  const methods = useForm<IBank>({
    resolver: nexus.resolverService.postResolver(ModelType.bank),
    defaultValues
  });

  const onSubmit = async (post: IBank) => {
    await postProject(post).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully created project'
      };
      dispatch(addAlert({ alert }));
      methods.reset();
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
            {t('Create new project')}
          </Typography>
          <ModalFieldsBox>
            <VerticalTextCtrl
              name="title"
              label={t('What is the name of the project?')}
              placeholder={t('Name of project')}
              autoFocus
            />
            <VerticalTextCtrl
              name="description"
              label={t('Describe the project')}
              placeholder={t('short description')}
            />
          </ModalFieldsBox>
          <ModalButtonsBox>
            <ModalButton variant="cancel" onClick={() => handleClose()}>
              {t('Cancel')}
            </ModalButton>
            <ModalButton variant="save" type="submit">
              {t('Create project')}
            </ModalButton>
          </ModalButtonsBox>
        </ModalBox>
      </form>
    </FormProvider>
  );
};

export default NewProjectForm;
