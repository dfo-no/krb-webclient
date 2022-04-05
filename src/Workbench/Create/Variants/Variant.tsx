import { joiResolver } from '@hookform/resolvers/joi';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import AccordionDetails from '@mui/material/AccordionDetails';
import Divider from '@mui/material/Divider';
import VerticalTextCtrl from '../../../FormProvider/VerticalTextCtrl';
import RadioCtrl from '../../../FormProvider/RadioCtrl';
import VariantType from '../../../Nexus/entities/VariantType';
import CheckboxCtrl from '../../../FormProvider/CheckboxCtrl';
import { Controller, useForm, FormProvider } from 'react-hook-form';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import QuestionsList from './QuestionsList';
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
import Button from '@mui/material/Button';
import { AccordionActions } from '@mui/material';
import ErrorSummary from '../../../Form/ErrorSummary';
import { useVariantState } from '../Requirement/VariantContext';
import { useTranslation } from 'react-i18next';
import { useSelectState } from '../SelectContext';
import theme from '../../../theme';
import { FormIconButton } from '../../Components/Form/FormIconButton';

interface IProps {
  variant: IVariant;
  requirementIndex: number;
}

const Variant = ({ variant, requirementIndex }: IProps) => {
  const { t } = useTranslation();
  const { projectId } = useParams<IRouteParams>();
  const { data: project } = useGetProjectQuery(projectId);

  const { editVariant } = useProjectMutations();
  const { setOpenVariants } = useVariantState();
  const { needIndex, setDeleteMode } = useSelectState();
  const dispatch = useAppDispatch();

  const methods = useForm<IVariant>({
    resolver: joiResolver(VariantSchema),
    defaultValues: variant
  });

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
        <Accordion key={variant.id} onChange={accordionChange()}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{variant.requirementText}</Typography>
            <FormIconButton
              hoverColor={theme.palette.errorRed.main}
              onClick={() => setDeleteMode(variant.id)}
              sx={{ marginLeft: 'auto' }}
            >
              <DeleteIcon />
            </FormIconButton>
          </AccordionSummary>
          <AccordionDetails>
            <Divider />
            <VerticalTextCtrl
              name={`requirementText`}
              label={t('requirementText')}
              placeholder=""
            />
            <VerticalTextCtrl
              name={`instruction`}
              label={t('instruction')}
              placeholder=""
            />
            <VerticalTextCtrl
              name={`description`}
              label={t('description')}
              placeholder=""
            />
            <RadioCtrl
              name="type"
              label="Type"
              options={[
                { value: VariantType.requirement, label: 'Krav' },
                { value: VariantType.info, label: 'Info' }
              ]}
            />
            <div style={{ width: '100%' }}>
              <CheckboxCtrl
                name={`useProduct` as const}
                label={`${t('product')}`}
              />
              <CheckboxCtrl
                name={`useSpesification` as const}
                label={`${t('general requirement')}`}
              />

              <Controller
                render={({ field: field2 }) => (
                  <Select {...field2} multiple>
                    {project.products.map((p) => (
                      <MenuItem key={p.id} value={p.id}>
                        {p.title}
                      </MenuItem>
                    ))}
                  </Select>
                )}
                name={`products`}
              />
            </div>
            <QuestionsList />
          </AccordionDetails>
          <AccordionActions>
            <Button variant="save" type="submit">
              {t('save')}
            </Button>
          </AccordionActions>
        </Accordion>
        <ErrorSummary errors={methods.formState.errors} />
      </form>
    </FormProvider>
  );
};

export default Variant;
