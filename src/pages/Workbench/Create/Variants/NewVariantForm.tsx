import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { zodResolver } from '@hookform/resolvers/zod';

import GeneralErrorMessage from '../../../../Form/GeneralErrorMessage';
import Nexus from '../../../../Nexus/Nexus';
import { VariantFormContent } from './VariantFormContent';
import { Alert } from '../../../../models/Alert';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';
import {
  createRequirementVariant,
  RequirementVariantForm,
  RequirementVariantFormSchema,
} from '../../../../api/nexus2';

interface Props {
  projectRef: string;
  requirementRef: string;
  handleClose: () => void;
}

export function NewVariantForm({
  projectRef,
  requirementRef,
  handleClose,
}: Props): React.ReactElement {
  const { addAlert } = AlertsContainer.useContainer();
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();

  const methods = useForm<RequirementVariantForm>({
    resolver: zodResolver(RequirementVariantFormSchema),
    defaultValues: {
      ref: uuidv4(),
    },
  });

  const closeAndReset = () => {
    handleClose();
    methods.reset();
  };

  const onSubmit = async (newVariant: RequirementVariantForm) => {
    await createRequirementVariant({
      projectRef,
      requirementRef,
      ...newVariant,
    }).then(() => {
      const alert: Alert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully created new variant',
      };
      addAlert(alert);
      closeAndReset();
    });
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          autoComplete="off"
          noValidate
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', padding: 4 }}>
            <Typography>{t('Add variant')}</Typography>
            <VariantFormContent
              projectRef={projectRef}
              control={methods.control}
            />
            <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 2 }}>
              <Button
                variant="cancel"
                onClick={() => closeAndReset()}
                sx={{ marginLeft: 'auto', marginRight: 2 }}
              >
                {t('common.Cancel')}
              </Button>
              <Button variant="save" type="submit">
                {t('Save')}
              </Button>
            </Box>
            <GeneralErrorMessage errors={methods.formState.errors} />
          </Box>
        </form>
      </FormProvider>
    </>
  );
}
