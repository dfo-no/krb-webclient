import classnames from 'classnames';
import EditIcon from '@mui/icons-material/Edit';
import React, { ReactElement, useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { joiResolver } from '@hookform/resolvers/joi';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import css from './ProductRequirement.module.scss';
import EditProductVariant from './EditProductVariant';
import Nexus from '../../../Nexus/Nexus';
import ProductVariant from './ProductVariant';
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
import VariantType from '../../../Nexus/entities/VariantType';
import { DFOChip } from '../../../components/DFOChip/DFOChip';

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

  const activeVariant = requirement.variants.find(
    (variant) => variant.id === useVariant
  );

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

  const onCancel = (): void => {
    if (original) {
      onSubmit(original);
      setOriginal(null);
    } else {
      methods.reset(defaultValues);
    }
  };

  const isSelected = (): boolean => {
    if (specificationProductIndex !== -1) {
      return spec.products[specificationProductIndex].requirements.some(
        (req) => req === requirement.id
      );
    }
    return spec.requirements.some((req) => req === requirement.id);
  };

  const isInfo = (): boolean => {
    const selected = (
      specificationProductIndex === -1
        ? spec
        : spec.products[specificationProductIndex]
    ).requirementAnswers.find(
      (reqAns) => reqAns.requirement.id === requirement.id
    );
    if (selected) {
      const selectedVariant = requirement.variants.find(
        (variant) => variant.id === selected.variantId
      );
      if (selectedVariant && selectedVariant.type === VariantType.info) {
        return true;
      }
    }
    return false;
  };

  const isActive = (): boolean => {
    return useVariant !== '';
  };

  const unsaveRequirement = (): IRequirementAnswer | undefined => {
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

  const uncheckRequirement = (): void => {
    unsaveRequirement();
    methods.reset();
  };

  const editRequirement = (): void => {
    const answer = unsaveRequirement();
    if (answer) {
      methods.reset(answer);
      setOriginal(answer);
    }
  };

  const renderActiveVariant = (): ReactElement => {
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
                marginTop: 'var(--small-gap)'
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
                <Button
                  variant="save"
                  type="submit"
                  sx={{ marginLeft: 'var(--small-gap)' }}
                >
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
    <Box key={requirement.id} className={css.ProductRequirement}>
      {isSelected() ? (
        <Box className={classnames(css.card, css.selected)}>
          <DFOCheckbox checked={true} onClick={uncheckRequirement} />
          <Typography variant={'lgBold'} className={css.title}>
            {requirement.title}
          </Typography>
          <Box className={css.weighting}>
            {isInfo() ? (
              <DFOChip label={t('Info')} className={css.weightingText} />
            ) : (
              <Typography variant={'mdBold'} className={css.weightingText}>
                {t('Weighting')}: {t(Weighting[useWeight])}
              </Typography>
            )}
          </Box>
          <FormIconButton onClick={editRequirement}>
            <EditIcon />
          </FormIconButton>
        </Box>
      ) : (
        <Box
          className={classnames(css.card, isActive() ? css.active : undefined)}
        >
          <Box className={css.title}>
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
