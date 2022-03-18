import { joiResolver } from '@hookform/resolvers/joi';
import { Box, Typography } from '@mui/material';
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
  newSpecForm: {
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
  },
  fields: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    marginTop: 20
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

  const versions = ['Versjon 1', 'Versjon 2', 'Versjon 3', 'Versjon 4'];

  return (
    <FormProvider {...methods}>
      <form
        className={classes.newSpecForm}
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <Box>
          <Typography variant="bigBlue">{project.title}</Typography>
          <Typography>{project.description}</Typography>
        </Box>

        <Typography>
          {t(
            'In addition to project, you need to pick which version of the project'
          )}
        </Typography>

        <Box className={classes.fields}>
          <SelectCtrl
            name="person.cars"
            label={t(
              'Pick which version of the project you want to use in this specification'
            )}
            options={versions}
          />
          <VerticalTextCtrl
            name="title"
            label={t('What will be the name of the procurement?')}
            placeholder={t('name of specification')}
          />
          <VerticalTextCtrl
            name="title"
            label={t('name of your organization')}
            placeholder={t('name')}
          />
          <VerticalTextCtrl
            name="title"
            label="Organisasjonsnummer:"
            placeholder="Organsisasjonsnummer"
          />
          <Box className={classes.buttons}>
            <Button variant="warningTransparent" onClick={() => handleClose()}>
              {t('cancel')}
            </Button>
            <Button
              variant="save"
              type="submit"
              sx={{ width: 200, height: 32 }}
            >
              {t('create specification')}
            </Button>
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
};

export default NewSpecForm;
