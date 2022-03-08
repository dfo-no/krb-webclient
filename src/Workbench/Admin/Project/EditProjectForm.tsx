import { joiResolver } from '@hookform/resolvers/joi';
import { Box, Typography } from '@mui/material/';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import ErrorSummary from '../../../Form/ErrorSummary';
import { IAlert } from '../../../models/IAlert';
import { PutProjectSchema } from '../../../models/Project';
import { IBank } from '../../../Nexus/entities/IBank';
import { useAppDispatch } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import { usePutProjectMutation } from '../../../store/api/bankApi';
import TextCtrl from '../../../FormProvider/TextCtrl';
import theme from '../../../theme';
import { FormTextButton } from '../../Components/Form/FormTextButton';

interface IProps {
  project: IBank;
  handleClose: () => void;
}

const EditProjectForm = ({ project, handleClose }: IProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [putProject] = usePutProjectMutation();

  const methods = useForm<IBank>({
    resolver: joiResolver(PutProjectSchema),
    defaultValues: project
  });

  const onSubmit = async (put: IBank) => {
    await putProject(put).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully updated project'
      };
      dispatch(addAlert({ alert }));
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
        <Box sx={{ display: 'flex', padding: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: '90%'
            }}
          >
            <TextCtrl name="title" label={t('Title')} />
            <TextCtrl name="description" label={t('Description')} />
          </Box>
          <FormTextButton
            sx={{ marginLeft: 'auto', color: theme.palette.saveGreen.main }}
            type="submit"
            aria-label="save"
          >
            <Typography variant={'smallUnderline'}>Lagre</Typography>
          </FormTextButton>
          <FormTextButton onClick={() => handleClose()} aria-label="close">
            <Typography variant={'smallUnderline'}>Avbryt</Typography>
          </FormTextButton>
        </Box>

        <ErrorSummary errors={methods.formState.errors} />
      </form>
    </FormProvider>
  );
};

export default EditProjectForm;
