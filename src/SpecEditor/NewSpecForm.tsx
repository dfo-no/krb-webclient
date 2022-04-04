import { joiResolver } from '@hookform/resolvers/joi';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import SelectCtrl from '../FormProvider/SelectCtrl';
import VerticalTextCtrl from '../FormProvider/VerticalTextCtrl';
import { IOption } from '../Nexus/entities/IOption';
import {
  BaseSpecificationSchema,
  ISpecification
} from '../Nexus/entities/ISpecification';
import theme from '../theme';
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

  const versions: IOption[] = specification.bank.publications.map((p) => {
    const option: IOption = { label: p.comment, value: p.id };
    return option;
  });

  const methods = useForm<ISpecification>({
    resolver: joiResolver(BaseSpecificationSchema),
    defaultValues: specification
  });

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
          <Typography variant="lg" sx={{ color: theme.palette.primary.main }}>
            {specification.bank.title}
          </Typography>
          <Typography>{specification.bank.description}</Typography>
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
            name="organization"
            label={t('name of your organization')}
            placeholder={t('name')}
          />
          <VerticalTextCtrl
            name="organizationNumber"
            label={t('Organization number')}
            placeholder={t('Organization number')}
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
