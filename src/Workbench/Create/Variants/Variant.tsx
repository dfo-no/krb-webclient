import { joiResolver } from '@hookform/resolvers/joi';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Chip,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { useAppDispatch } from '../../../store/hooks';
import { IAlert } from '../../../models/IAlert';
import { v4 as uuidv4 } from 'uuid';
import { addAlert } from '../../../store/reducers/alert-reducer';
import { IVariant, VariantSchema } from '../../../Nexus/entities/IVariant';
import useProjectMutations from '../../../store/api/ProjectMutations';
import { useParams } from 'react-router-dom';
import { useGetProjectQuery } from '../../../store/api/bankApi';
import LoaderSpinner from '../../../common/LoaderSpinner';
import React, { SyntheticEvent } from 'react';
import { IRouteParams } from '../../Models/IRouteParams';
import { useVariantState } from '../../Components/VariantContext';
import { useTranslation } from 'react-i18next';
import { useSelectState } from '../SelectContext';
import theme from '../../../theme';
import { FormIconButton } from '../../Components/Form/FormIconButton';
import VariantFormContent from './VariantFormContent';
import GeneralErrorMessage from '../../../Form/GeneralErrorMessage';
import VariantType from '../../../Nexus/entities/VariantType';

interface IProps {
  variant: IVariant;
  requirementIndex: number;
}

const Variant = ({ variant, requirementIndex }: IProps) => {
  const { t } = useTranslation();
  const { projectId } = useParams<IRouteParams>();
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
    () => (event: SyntheticEvent<Element, Event>, isExpanded: boolean) => {
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
            {useTypeWatch === VariantType.info && (
              <Chip
                color={'primary'}
                label={t('info')}
                sx={{
                  marginLeft: 'auto',
                  marginRight: 2,
                  alignSelf: 'center'
                }}
              />
            )}
            <FormIconButton
              hoverColor={theme.palette.errorRed.main}
              onClick={() => setDeleteMode(variant.id)}
              sx={
                useTypeWatch === VariantType.info ? {} : { marginLeft: 'auto' }
              }
            >
              <DeleteIcon />
            </FormIconButton>
          </AccordionSummary>
          <AccordionDetails sx={{ display: 'flex', flexDirection: 'column' }}>
            <VariantFormContent control={methods.control} />
            <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 2 }}>
              <Button
                variant="cancel"
                onClick={() => methods.reset()}
                sx={{ marginLeft: 'auto', marginRight: 2 }}
              >
                {t('Reset')}
              </Button>
              <Button variant="save" type="submit">
                {t('save')}
              </Button>
            </Box>
            <GeneralErrorMessage errors={methods.formState.errors} />
          </AccordionDetails>
        </Accordion>
      </form>
    </FormProvider>
  );
};

export default Variant;
