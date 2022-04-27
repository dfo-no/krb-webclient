import { joiResolver } from '@hookform/resolvers/joi';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
import theme from '../theme';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSpecification } from '../store/reducers/response-reducer';

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
  const history = useHistory();
  const classes = useStyles();
  const { spec } = useAppSelector((state) => state.specification);
  const dispatch = useAppDispatch();

  const methods = useForm<ISpecification>({
    resolver: joiResolver(BaseSpecificationSchema),
    defaultValues: spec
  });

  const onSubmit = async (post: ISpecification) => {
    dispatch(setSpecification(post));
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
          <Typography variant="lg" color={theme.palette.primary.main}>
            {spec.bank.title}
          </Typography>
          <Typography>{spec.bank.description}</Typography>
        </Box>

        <Typography>
          {t(
            'In addition to project, you need to pick which version of the project'
          )}
        </Typography>
        <Box className={classes.fields}>
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
