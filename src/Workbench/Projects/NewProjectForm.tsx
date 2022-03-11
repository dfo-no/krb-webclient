import { joiResolver } from '@hookform/resolvers/joi';
import Button from '@mui/material/Button';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import TextCtrl from '../../FormProvider/TextCtrl';
import { IAlert } from '../../models/IAlert';
import { PostProjectSchema } from '../../models/Project';
import { IBank } from '../../Nexus/entities/IBank';
import Nexus from '../../Nexus/Nexus';
import { usePostProjectMutation } from '../../store/api/bankApi';
import { useAppDispatch } from '../../store/hooks';
import { addAlert } from '../../store/reducers/alert-reducer';
import makeStyles from '@mui/styles/makeStyles';
import { Box } from '@mui/material';

interface IProps {
  handleClose: () => void;
}

const useStyles = makeStyles({
  fields: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    gap: 20,
    padding: 10,
    width: 450
  },
  buttons: {
    display: 'flex',
    gap: 10
  }
});

const NewProjectForm = ({ handleClose }: IProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
  const defaultValues = nexus.projectService.generateDefaultProjectValues();
  const [postProject] = usePostProjectMutation();
  const classes = useStyles();

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
        className={classes.fields}
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <TextCtrl name="title" placeholder={t('Title')} />
        <TextCtrl name="description" placeholder={t('Description')} />
        <Box className={classes.buttons}>
          <Button sx={{ width: '90%' }} variant="primary" type="submit">
            {t('save')}
          </Button>
          <Button
            variant="warning"
            sx={{ width: '90%' }}
            onClick={() => handleClose()}
          >
            {t('close')}
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
};

export default NewProjectForm;
