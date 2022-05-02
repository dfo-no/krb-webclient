import { joiResolver } from '@hookform/resolvers/joi';
import Typography from '@mui/material/Typography';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import VerticalTextCtrl from '../../FormProvider/VerticalTextCtrl';
import { IAlert } from '../../models/IAlert';
import { PostProjectSchema } from '../../models/Project';
import { IBank } from '../../Nexus/entities/IBank';
import Nexus from '../../Nexus/Nexus';
import { usePostProjectMutation } from '../../store/api/bankApi';
import { useAppDispatch } from '../../store/hooks';
import { addAlert } from '../../store/reducers/alert-reducer';
import theme from '../../theme';
import {
  ModalBox,
  ModalButton,
  ModalButtonsBox,
  ModalFieldsBox
} from '../Components/ModalBox';

interface IProps {
  handleClose: () => void;
}

const NewProjectForm = ({ handleClose }: IProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();

  // TODO: Should contain a defaultValue from options to fully control the Select
  const defaultValues = nexus.projectService.generateDefaultProjectValues();
  const [postProject] = usePostProjectMutation();
  const methods = useForm<IBank>({
    resolver: joiResolver(PostProjectSchema),
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
            {t('create new bank')}
          </Typography>
          <ModalFieldsBox>
            <VerticalTextCtrl
              name="title"
              label={t('What is the name of the project?')}
              placeholder={t('name of project')}
            />
            <VerticalTextCtrl
              name="description"
              label={t('describe the project')}
              placeholder={t('short description')}
            />
          </ModalFieldsBox>
          <ModalButtonsBox>
            <ModalButton variant="cancel" onClick={() => handleClose()}>
              {t('cancel')}
            </ModalButton>
            <ModalButton variant="save" type="submit">
              {t('create project')}
            </ModalButton>
          </ModalButtonsBox>
        </ModalBox>
      </form>
    </FormProvider>
  );
};

export default NewProjectForm;
