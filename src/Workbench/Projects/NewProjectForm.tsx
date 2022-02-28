import { joiResolver } from '@hookform/resolvers/joi';
import Button from '@mui/material/Button';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import ErrorSummary from '../../Form/ErrorSummary';
import TextCtrl from '../../FormProvider/TextCtrl';
import { IAlert } from '../../models/IAlert';
import { PostProjectSchema } from '../../models/Project';
import { IBank } from '../../Nexus/entities/IBank';
import Nexus from '../../Nexus/Nexus';
import { usePostProjectMutation } from '../../store/api/bankApi';
import { useAppDispatch } from '../../store/hooks';
import { addAlert } from '../../store/reducers/alert-reducer';

interface IProps {
  handleClose: () => void;
}

const NewProjectForm = ({ handleClose }: IProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
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
        text: 'Successfully  created project'
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
        <TextCtrl name="title" label={t('Title')} />
        <TextCtrl name="description" label={t('Description')} />
        <Button variant="contained" type="submit">
          {t('save')}
        </Button>

        <ErrorSummary errors={methods.formState.errors} />
      </form>
    </FormProvider>
  );
};

export default NewProjectForm;
