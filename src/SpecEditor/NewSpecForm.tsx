import { joiResolver } from '@hookform/resolvers/joi';
import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import SelectCtrl from '../FormProvider/SelectCtrl';
import VerticalTextCtrl from '../FormProvider/VerticalTextCtrl';
import { IAlert } from '../models/IAlert';
import { PostProjectSchema } from '../models/Project';
import { IBank } from '../Nexus/entities/IBank';
import Nexus from '../Nexus/Nexus';
import { usePostProjectMutation } from '../store/api/bankApi';
import { useAppDispatch } from '../store/hooks';
import { addAlert } from '../store/reducers/alert-reducer';

interface IProps {
  project: IBank;
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
    gap: 10,
    justifyContent: 'flex-end',
    marginTop: 13
  }
});

const NewSpecForm = ({ handleClose, project }: IProps) => {
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

  console.log('PJ');
  console.log(project);

  return (
    <FormProvider {...methods}>
      <form
        className={classes.fields}
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      ></form>
    </FormProvider>
  );
};

export default NewSpecForm;
