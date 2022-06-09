import EditIcon from '@mui/icons-material/Edit';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import EditProductVariant from './EditProductVariant';
import Nexus from '../../../Nexus/Nexus';
import ProductVariant from './ProductVariant';
import theme from '../../../theme';
import {
  addAnswer,
  addProductAnswer,
  addProductRequirement,
  addRequirement,
  deleteAnswer,
  deleteProductAnswer,
  removeProductRequirement,
  removeRequirement
} from '../../../store/reducers/spesification-reducer';
import { DFOCheckbox } from '../../../components/DFOCheckbox/DFOCheckbox';
import { FormIconButton } from '../../../components/Form/FormIconButton';
import { IRequirement } from '../../../Nexus/entities/IRequirement';
import {
  IRequirementAnswer,
  RequirementAnswerSchema
} from '../../../models/IRequirementAnswer';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useSpecificationState } from '../SpecificationContext';
import { Weighting } from '../../../enums';

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
    border: `0.2rem solid ${theme.palette.secondary.main}`,
    borderTop: `1.2rem solid ${theme.palette.secondary.main}`
  },
  selected: {
    border: `0.2rem solid ${theme.palette.primary.main}`
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

  useEffect(() => {
    methods.reset();
  }, [methods, specificationProductIndex]);

  const useVariant = useWatch({ name: 'variantId', control: methods.control });
  const useWeight = useWatch({ name: 'weight', control: methods.control });

  const onSubmit = async (put: IRequirementAnswer) => {
    if (specificationProductIndex === -1) {
      dispatch(
        addAnswer({
          answer: put
        })
      );
      dispatch(addRequirement(requirement.id));
    } else {
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
    }
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

  const unsaveRequirement = () => {
    if (specificationProductIndex === -1) {
      const answer = spec.requirementAnswers.find(
        (reqAnswer) => reqAnswer.requirement.id === requirement.id
      );
      if (answer) {
        dispatch(
          deleteAnswer({
            answer: answer.id
          })
        );
      }
      dispatch(removeRequirement(requirement.id));
      return answer;
    } else {
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
    }
  };

  const uncheckRequirement = () => {
    unsaveRequirement();
    methods.reset();
  };

  const editRequirement = () => {
    const answer = unsaveRequirement();
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
                {t('Cancel')}
              </Button>
              {activeVariant.questions.length > 0 && (
                <Button variant="save" type="submit" sx={{ marginLeft: 2 }}>
                  {t('Save and chose requirement')}
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
            <DFOCheckbox checked={true} onClick={uncheckRequirement} />
            <Typography
              variant={'lgBold'}
              sx={{ marginLeft: 1, alignSelf: 'center' }}
            >
              {requirement.title}
            </Typography>
            <Typography
              variant={'mdBold'}
              sx={{
                flex: '0 0 10%',
                marginLeft: 'auto',
                paddingLeft: 2,
                marginRight: 2,
                alignSelf: 'center'
              }}
            >
              {t('Weighting')}: {t(Weighting[useWeight])}
            </Typography>
            <FormIconButton onClick={editRequirement}>
              <EditIcon />
            </FormIconButton>
          </Box>
        </Box>
      )}
      {!isSelected() && (
        <Box className={`${classes.card} ${isActive() ? classes.active : ''}`}>
          <Box sx={{ marginLeft: 6, borderBottom: '0.1rem solid' }}>
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
            </form>
          </FormProvider>
        </Box>
      )}
    </Box>
  );
}
