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
  AccordionDetails
} from '@mui/material';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import GeneralErrorMessage from '../../../../Form/GeneralErrorMessage';
import LoaderSpinner from '../../../../common/LoaderSpinner';
import theme from '../../../../theme';
import useProjectMutations from '../../../../store/api/ProjectMutations';
import VariantFormContent from './VariantFormContent';
import VariantType from '../../../../Nexus/entities/VariantType';
import { addAlert } from '../../../../store/reducers/alert-reducer';
import { FormIconButton } from '../../../../components/Form/FormIconButton';
import { IAlert } from '../../../../models/IAlert';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import { IVariant, VariantSchema } from '../../../../Nexus/entities/IVariant';
import { useAppDispatch } from '../../../../store/hooks';
import { useGetProjectQuery } from '../../../../store/api/bankApi';
import { useSelectState } from '../SelectContext';
import { useVariantState } from '../../VariantContext';
import { DFOChip } from '../../../../components/DFOChip/DFOChip';

interface IProps {
  variant: IVariant;
  requirementIndex: number;
}

const Variant = ({ variant, requirementIndex }: IProps) => {
  const { t } = useTranslation();
  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project } = useGetProjectQuery(projectId);

  const { editVariant } = useProjectMutations();
  const { openVariants, setOpenVariants } = useVariantState();
  const { needIndex, setDeleteMode } = useSelectState();
  const dispatch = useAppDispatch();

  const methods = useForm<IVariant>({
    resolver: joiResolver(VariantSchema),
    defaultValues: variant
  });
  const useTypeWatch = useWatch({ name: 'type', control: methods.control });

  if (!project || needIndex === null) {
    return <LoaderSpinner />;
  }

  const onSubmit = async (put: IVariant) => {
    await editVariant(
      put,
      project.needs[needIndex].requirements[requirementIndex],
      project.needs[needIndex]
    ).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'successfully updated variant'
      };
      dispatch(addAlert({ alert }));
      methods.reset({ ...put });
      setOpenVariants((ov) => {
        const tmp = [...ov];
        tmp.splice(tmp.indexOf(variant.id), 1);
        return tmp;
      });
    });
  };

  const accordionChange =
    () =>
    (event: SyntheticEvent<Element, Event>, isExpanded: boolean): void => {
      if (isExpanded) {
        setOpenVariants((ov) => [...ov, variant.id]);
      } else {
        setOpenVariants((ov) => {
          const tmp = [...ov];
          tmp.splice(tmp.indexOf(variant.id), 1);
          return tmp;
        });
      }
    };

  const confirmDelete = (id: string, event: MouseEvent): void => {
    event.stopPropagation();
    setDeleteMode(id);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <Accordion
          key={variant.id}
          onChange={accordionChange()}
          expanded={openVariants.some((id) => id === variant.id)}
          elevation={0}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{variant.description}</Typography>
            <Box sx={{ display: 'flex', marginLeft: 'auto' }}>
              {useTypeWatch === VariantType.info && (
                  <DFOChip label={t('Info')} />
              )}
              <FormIconButton
                disableRipple={true}
                hoverColor={theme.palette.errorRed.main}
                onClick={(event) =>
                  confirmDelete(variant.id, event as unknown as MouseEvent)
                }
              >
                <DeleteIcon />
              </FormIconButton>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ display: 'flex', flexDirection: 'column' }}>
            <VariantFormContent control={methods.control} />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 2,
                marginBottom: 'var(--normal-gap)'
              }}
            >
              <Button
                disableRipple={true}
                variant="cancel"
                onClick={() => methods.reset()}
                sx={{ marginLeft: 'auto', marginRight: 2 }}
              >
                {t('Reset')}
              </Button>
              <Button disableRipple={true} variant="save" type="submit">
                {t('Save')}
              </Button>
            </Box>
            <Divider />
            <GeneralErrorMessage errors={methods.formState.errors} />
          </AccordionDetails>
        </Accordion>
      </form>
    </FormProvider>
  );
};

export default Variant;
