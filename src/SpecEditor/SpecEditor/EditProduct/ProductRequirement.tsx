import makeStyles from '@mui/styles/makeStyles';
import theme from '../../../theme';
import { IRequirement } from '../../../Nexus/entities/IRequirement';
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useSpecificationState } from '../../SpecificationContext';
import { DFOCheckbox } from '../../../components/DFOCheckbox/DFOCheckbox';
import ProductVariant from './ProductVariant';
import EditProductVariant from './EditProductVariant';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import {
  IRequirementAnswer,
  RequirementAnswerSchema
} from '../../../models/IRequirementAnswer';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  addProductAnswer,
  addProductRequirement,
  deleteProductAnswer,
  removeProductRequirement
} from '../../../store/reducers/spesification-reducer';
import { FormIconButton } from '../../../Workbench/Components/Form/FormIconButton';
import EditIcon from '@mui/icons-material/Edit';
import Nexus from '../../../Nexus/Nexus';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import ErrorSummary from '../../../Form/ErrorSummary';

const useStyles = makeStyles({
  card: {
    backgroundColor: theme.palette.white.main,
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.black.main,
    padding: 16,
    paddingLeft: 32,
    paddingRight: 32,
    margin: 32
  },
  active: {
    border: `2px solid ${theme.palette.secondary.main}`,
    borderTop: `12px solid ${theme.palette.secondary.main}`
  },
  selected: {
    border: `2px solid ${theme.palette.primary.main}`
  }
});

interface IProps {
  requirement: IRequirement;
}

export default function ProductRequirement({
  requirement
}: IProps): React.ReactElement {
  const { t } = useTranslation();
  const { spec } = useAppSelector((state) => state.specification);
  const dispatch = useAppDispatch();
  const nexus = Nexus.getInstance();
  const { specificationProductIndex } = useSpecificationState();
  const [original, setOriginal] = useState<null | IRequirementAnswer>(null);
  const classes = useStyles();

  const defaultValues =
    nexus.specificationService.generateDefaultRequirementAnswer(requirement);
  const methods = useForm<IRequirementAnswer>({
    resolver: joiResolver(RequirementAnswerSchema),
    defaultValues
  });

  const useVariant = useWatch({ name: 'variantId', control: methods.control });

  const onSubmit = async (put: IRequirementAnswer) => {
    dispatch(
      addProductAnswer({
        answer: put,
        productId: spec.products[specificationProductIndex].id
      })
    );
    dispatch(
      addProductRequirement({
        requirement: requirement.id,
        productId: spec.products[specificationProductIndex].id
      })
    );
  };

  const onCancel = () => {
    if (original) {
      onSubmit(original);
      setOriginal(null);
    } else {
      methods.reset(defaultValues);
    }
  };

  const activeVariant = requirement.variants.find(
    (variant) => variant.id === useVariant
  );

  const isSelected = () => {
    if (specificationProductIndex !== -1) {
      return spec.products[specificationProductIndex].requirements.some(
        (req) => req === requirement.id
      );
    }
    return spec.requirements.some((req) => req === requirement.id);
  };

  const isActive = () => {
    return useVariant !== '';
  };

  const uncheckRequirement = () => {
    const product = spec.products[specificationProductIndex];
    const answer = product.requirementAnswers.find(
      (reqAnswer) => reqAnswer.requirement.id === requirement.id
    );
    if (answer) {
      dispatch(
        deleteProductAnswer({
          answer: answer.id,
          productId: product.id
        })
      );
    }
    dispatch(
      removeProductRequirement({
        requirement: requirement.id,
        productId: product.id
      })
    );
    return answer;
  };

  const editRequirement = () => {
    const answer = uncheckRequirement();
    if (answer) {
      methods.reset(answer);
      setOriginal(answer);
    }
  };

  const renderActiveVariant = () => {
    return (
      <Box>
        {activeVariant && (
          <Box>
            <EditProductVariant
              requirement={requirement}
              variant={activeVariant}
            />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 2
              }}
            >
              <Button
                variant="cancel"
                onClick={onCancel}
                sx={{ marginLeft: 'auto' }}
              >
                {t('cancel')}
              </Button>
              {activeVariant.questions.length > 0 && (
                <Button variant="save" type="submit" sx={{ marginLeft: 2 }}>
                  {t('save and chose requirement')}
                </Button>
              )}
            </Box>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box key={requirement.id}>
      {isSelected() && (
        <Box className={`${classes.card} ${classes.selected}`}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <DFOCheckbox value={true} onClick={uncheckRequirement} />
            <Typography variant="lgBold" sx={{ marginLeft: 1 }}>
              {requirement.title}
            </Typography>
            <FormIconButton
              sx={{ marginLeft: 'auto' }}
              onClick={editRequirement}
            >
              <EditIcon />
            </FormIconButton>
          </Box>
        </Box>
      )}
      {!isSelected() && (
        <Box className={`${classes.card} ${isActive() ? classes.active : ''}`}>
          <Box sx={{ marginLeft: 6, borderBottom: '1px solid' }}>
            <Typography variant="lgBold">{requirement.title}</Typography>
          </Box>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              autoComplete="off"
              noValidate
            >
              <Box>
                {requirement.variants
                  .filter((variant) => variant.id !== useVariant)
                  .map((variant) => {
                    return (
                      <ProductVariant key={variant.id} variant={variant} />
                    );
                  })}
                {renderActiveVariant()}
              </Box>
              <ErrorSummary errors={methods.formState.errors} />
            </form>
          </FormProvider>
        </Box>
      )}
    </Box>
  );
}
