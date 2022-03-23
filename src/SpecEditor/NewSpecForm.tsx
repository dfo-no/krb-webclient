import { joiResolver } from '@hookform/resolvers/joi';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import VerticalTextCtrl from '../FormProvider/VerticalTextCtrl';
import {
  BaseSpecificationSchema,
  ISpecification
} from '../Nexus/entities/ISpecification';
import { useSpecificationState } from './SpecificationContext';

interface IProps {
  specification: ISpecification;
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

const NewSpecForm = ({ handleClose, specification }: IProps) => {
  const { t } = useTranslation();
  const history = useHistory();
  const classes = useStyles();
  const { setSpecification } = useSpecificationState();

  const methods = useForm<ISpecification>({
    resolver: joiResolver(BaseSpecificationSchema),
    defaultValues: specification
  });

  // Get from selectedBank later. Logic for this?
  const versions = [
    { label: 'Versjon 1', name: 'Versjon 1' },
    { label: 'Versjon 2', name: 'Versjon 2' },
    { label: 'Versjon 3', name: 'Versjon 3' },
    { label: 'Versjon 4', name: 'Versjon 4' }
  ];

  const onSubmit = async (post: ISpecification) => {
    setSpecification(post);
    history.push(`/specification/${post.bank.id}`);
  };

  return (
    <FormProvider {...methods}>
      <form
        className={classes.newSpecForm}
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <Box>
          <Typography variant="bigBlue">{specification.bank.title}</Typography>
          <Typography>{specification.bank.description}</Typography>
        </Box>

        <Typography>
          {t(
            'In addition to project, you need to pick which version of the project'
          )}
        </Typography>
        <code>{}</code>

        <Box className={classes.fields}>
          <Select
            name="version"
            value={versions[0].label}
            disabled
            label={t(
              'Pick which version of the project you want to use in this specification'
            )}
            onChange={(e) => console.log(e.target.value)}
          >
            {versions.map((v) => (
              <MenuItem key={v.name} value={v.name}>
                {v.label}
              </MenuItem>
            ))}
          </Select>
          <VerticalTextCtrl
            name="title"
            label={t('What will be the name of the procurement?')}
            placeholder={t('name of specification')}
          />
          <VerticalTextCtrl
            name="organization"
            label={t('name of your organization')}
            placeholder={t('name')}
          />
          <VerticalTextCtrl
            name="organizationNumber"
            label="Organisasjonsnummer:"
            placeholder="Organisasjonsnummer"
          />
          <Box className={classes.buttons}>
            <Button variant="warningTransparent" onClick={() => handleClose()}>
              {t('cancel')}
            </Button>
            <Button
              className={classes.newSpecButton}
              variant="save"
              type="submit"
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
