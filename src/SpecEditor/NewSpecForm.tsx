import { joiResolver } from '@hookform/resolvers/joi';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import makeStyles from '@mui/styles/makeStyles';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import SelectCtrl from '../FormProvider/SelectCtrl';
import VerticalTextCtrl from '../FormProvider/VerticalTextCtrl';
import { PostProjectSchema } from '../models/Project';
import { IBank } from '../Nexus/entities/IBank';
import { BaseSpecificationSchema } from '../Nexus/entities/ISpecification';
import Nexus from '../Nexus/Nexus';
import { useGetBankQuery } from '../store/api/bankApi';
import { useAppSelector } from '../store/hooks';

interface IProps {
  handleClose: () => void;
}

const useStyles = makeStyles({
  newSpecForm: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    gap: 25,
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
    gap: 20
  },
  newSpecButton: {
    width: 200,
    height: 35,
    textDecoration: 'none'
  }
});

const NewSpecForm = ({ handleClose }: IProps) => {
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
  const defaultValues = nexus.projectService.generateDefaultProjectValues();
  const history = useHistory();
  const classes = useStyles();

  const selectedBank = useAppSelector((state) => state.selectedBank);
  const { data: bankSelected } = useGetBankQuery(String(selectedBank.id));

  const methods = useForm<IBank>({
    resolver: joiResolver(BaseSpecificationSchema),
    defaultValues
  });

  // Get from selectedBank later. Logic for this?
  const versions = ['Versjon 1', 'Versjon 2', 'Versjon 3', 'Versjon 4'];

  const onSubmit = async () => {
    /* await postProject(post).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully created project'
      };
      dispatch(addAlert({ alert }));
      methods.reset();
      handleClose();
    }); */
    history.push(`/specification/${selectedBank.id}`);
  };

  return (
    <div>
      {bankSelected && (
        <FormProvider {...methods}>
          <form
            className={classes.newSpecForm}
            onSubmit={methods.handleSubmit(onSubmit)}
            autoComplete="off"
            noValidate
          >
            <Box>
              <Typography variant="bigBlue">{bankSelected.title}</Typography>
              <Typography>{bankSelected.description}</Typography>
            </Box>

            <Typography>
              {t(
                'In addition to project, you need to pick which version of the project'
              )}
            </Typography>

            <Box className={classes.fields}>
              <SelectCtrl
                name="version"
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
                <Button
                  variant="warningTransparent"
                  onClick={() => handleClose()}
                >
                  {t('cancel')}
                </Button>
                <Button
                  className={classes.newSpecButton}
                  variant="save"
                  type="submit"
                  onClick={onSubmit}
                >
                  {t('create specification')}
                </Button>
              </Box>
            </Box>
          </form>
        </FormProvider>
      )}
    </div>
  );
};

export default NewSpecForm;
