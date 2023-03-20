import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import React, { SyntheticEvent } from 'react';
import {
  Box,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { useForm, FormProvider /* useWatch */ } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { zodResolver } from '@hookform/resolvers/zod';

import GeneralErrorMessage from '../../../../Form/GeneralErrorMessage';
import LoaderSpinner from '../../../../common/LoaderSpinner';
import { VariantFormContent } from './VariantFormContent';
import { Alert } from '../../../../models/Alert';
import { useSelectState } from '../SelectContext';
import { useVariantState } from '../../VariantContext';
import ErrorSummary from '../../../../Form/ErrorSummary';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';
import {
  RequirementVariantForm,
  RequirementVariantFormSchema,
  updateRequirementVariant,
} from '../../../../api/nexus2';

interface Props {
  projectRef: string;
  needRef: string;
  requirementRef: string;
  variant: RequirementVariantForm;
}

const Variant = ({ projectRef, needRef, requirementRef, variant }: Props) => {
  const { t } = useTranslation();
  const { addAlert } = AlertsContainer.useContainer();

  const { openVariants, setOpenVariants } = useVariantState();
  const { needIndex, setDeleteCandidateId } = useSelectState();

  const methods = useForm<RequirementVariantForm>({
    resolver: zodResolver(RequirementVariantFormSchema),
    defaultValues: variant,
  });
  // const useTypeWatch = useWatch({ name: 'type', control: methods.control }); TODO: Uncomment and fix

  if (needIndex === null) {
    return <LoaderSpinner />;
  }

  const onSubmit = async (updatedVariant: RequirementVariantForm) => {
    await updateRequirementVariant({
      projectRef,
      needRef,
      requirementRef,
      requirementVariantRef: updatedVariant.ref,
      ...updatedVariant,
    }).then(() => {
      const alert: Alert = {
        id: uuidv4(),
        style: 'success',
        text: 'successfully updated variant',
      };
      addAlert(alert);
      methods.reset({ ...updatedVariant });
      setOpenVariants((ov) => {
        const tmp = [...ov];
        tmp.splice(tmp.indexOf(variant.ref), 1);
        return tmp;
      });
    });
  };

  const accordionChange =
    () =>
    (event: SyntheticEvent<Element, Event>, isExpanded: boolean): void => {
      if (isExpanded) {
        setOpenVariants((ov) => [...ov, variant.ref]);
      } else {
        setOpenVariants((ov) => {
          const tmp = [...ov];
          tmp.splice(tmp.indexOf(variant.ref), 1);
          return tmp;
        });
      }
    };

  // const confirmDelete = (id: string, event: MouseEvent): void => { TODO: Uncomment and fix
  //   event.stopPropagation();
  //   setDeleteCandidateId(id);
  // };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <Accordion
          key={variant.ref}
          onChange={accordionChange()}
          expanded={openVariants.some((id) => id === variant.ref)}
          elevation={0}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{variant.description}</Typography>
            {/* <Box sx={{ display: 'flex', marginLeft: 'auto' }}> TODO: Uncomment and fix
              {useTypeWatch === VariantType.info && (
                <DFOChip label={t('Info')} />
              )}
              <FormIconButton
                hoverColor={theme.palette.errorRed.main}
                onClick={(event) =>
                  confirmDelete(variant.ref, event as unknown as MouseEvent)
                }
              >
                <DeleteIcon />
              </FormIconButton>
            </Box> */}
          </AccordionSummary>
          <AccordionDetails sx={{ display: 'flex', flexDirection: 'column' }}>
            <VariantFormContent
              projectRef={projectRef}
              control={methods.control}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 'var(--small-gap)',
                marginBottom: 'var(--normal-gap)',
              }}
            >
              <Button
                variant="cancel"
                onClick={() => methods.reset()}
                sx={{ marginLeft: 'auto', marginRight: 'var(--small-gap)' }}
              >
                {t('Reset')}
              </Button>
              <Button variant="save" type="submit">
                {t('Save')}
              </Button>
            </Box>
            <Divider />
            <GeneralErrorMessage errors={methods.formState.errors} />
            <ErrorSummary errors={methods.formState.errors} />
          </AccordionDetails>
        </Accordion>
      </form>
    </FormProvider>
  );
};

export default Variant;
