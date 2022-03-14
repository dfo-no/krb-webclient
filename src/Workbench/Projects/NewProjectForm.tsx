import { joiResolver } from '@hookform/resolvers/joi';
import Button from '@mui/material/Button';
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
import makeStyles from '@mui/styles/makeStyles';
import { Box } from '@mui/material';
import DFOSelect from '../../components/DFOSelect/DFOSelect';
import SelectCtrl from '../../FormProvider/SelectCtrl';

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
    gap: 10,
    justifyContent: 'flex-end'
  }
});

const NewProjectForm = ({ handleClose }: IProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
  const defaultValues = nexus.projectService.generateDefaultProjectValues();
  const [postProject] = usePostProjectMutation();
  const classes = useStyles();

  const options = ['Bil', 'Buss'];

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
        <VerticalTextCtrl
          name="title"
          label="Hva er navnet på prosjektet?"
          placeholder="Navn på prosjekt"
        />
        <VerticalTextCtrl
          name="description"
          label="Beskriv prosjektet"
          placeholder="Kort beskrivelse"
        />
        <SelectCtrl options={options} name="name" />
        <Box className={classes.buttons}>
          <Button variant="warning" onClick={() => handleClose()}>
            {t('close')}
          </Button>
          <Button variant="primary" type="submit">
            {t('save')}
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
};

export default NewProjectForm;
