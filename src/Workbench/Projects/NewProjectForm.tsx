import { joiResolver } from '@hookform/resolvers/joi';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import SelectCtrl from '../../FormProvider/SelectCtrl';
import VerticalTextCtrl from '../../FormProvider/VerticalTextCtrl';
import { IAlert } from '../../models/IAlert';
import { PostProjectSchema } from '../../models/Project';
import { IBank } from '../../Nexus/entities/IBank';
import { IOption } from '../../Nexus/entities/IOption';
import Nexus from '../../Nexus/Nexus';
import { usePostProjectMutation } from '../../store/api/bankApi';
import { useAppDispatch } from '../../store/hooks';
import { addAlert } from '../../store/reducers/alert-reducer';

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
    justifyContent: 'flex-end',
    marginTop: 13
  }
});

const NewProjectForm = ({ handleClose }: IProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();

  // TODO: Should contain a defaultValue from options to fully control the Select
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

  // TODO: set defaultValue from this in
  const options: IOption[] = [
    { label: 'Type 1', value: 'Type 1' },
    { label: 'Type 2', value: 'Type 2' },
    { label: 'Type 3', value: 'Type 3' },
    { label: 'Type 4', value: 'Type 4' }
  ];

  return (
    <FormProvider {...methods}>
      <form
        className={classes.fields}
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <Typography variant="bigBlue">{t('create new bank')}</Typography>
        <VerticalTextCtrl
          name="title"
          label={t('What is the name of the project?')}
          placeholder="Navn på prosjekt"
        />
        <VerticalTextCtrl
          name="description"
          label={t('describe the project')}
          placeholder="Kort beskrivelse"
        />
        <SelectCtrl
          label={t('What kind of project is this?')}
          name="name"
          options={options}
        />
        <Box className={classes.buttons}>
          <Button variant="warningTransparent" onClick={() => handleClose()}>
            {t('cancel')}
          </Button>
          <Button variant="save" type="submit" sx={{ width: 150, height: 32 }}>
            Opprett prosjekt
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
};

export default NewProjectForm;
