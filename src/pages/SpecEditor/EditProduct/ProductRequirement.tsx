import classnames from 'classnames';
import EditIcon from '@mui/icons-material/Edit';
import React, { ReactElement, useEffect, useState } from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import ChosenConfiguration from './ChosenConfiguration/ChosenConfiguration';
import css from './ProductRequirement.module.scss';
import EditProductVariant from './EditProductVariant';
import GeneralErrorMessage from '../../../Form/GeneralErrorMessage';
import Nexus from '../../../Nexus/Nexus';
import ProductVariant from './ProductVariant';
import SpecificationService from '../../../Nexus/services/SpecificationService';
import { DFOCheckbox } from '../../../components/DFOCheckbox/DFOCheckbox';
import { DFOChip } from '../../../components/DFOChip/DFOChip';
import { FormIconButton } from '../../../components/Form/FormIconButton';
import { IRequirement } from '../../../Nexus/entities/IRequirement';
import { IRequirementAnswer } from '../../../Nexus/entities/IRequirementAnswer';
import { ModelType, VariantType, Weighting } from '../../../Nexus/enums';
import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';
import { useSpecificationState } from '../SpecificationContext';

interface IProps {
  requirement: IRequirement;
}

export default function ProductRequirement({
  requirement
}: IProps): React.ReactElement {
  const { t } = useTranslation();
  const {
    specification,
    addGeneralAnswer,
    deleteGeneralAnswer,
    addProductAnswer,
    deleteProductAnswer
  } = useSpecificationState();
  const nexus = Nexus.getInstance();
  const { productIndex } = useProductIndexState();
  const [original, setOriginal] = useState<null | IRequirementAnswer>(null);

  const defaultValues =
    SpecificationService.defaultRequirementAnswer(requirement);
  const methods = useForm<IRequirementAnswer>({
    resolver: nexus.resolverService.postResolver(ModelType.requirementAnswer),
    defaultValues
  });

  useEffect(() => {
    methods.reset();
  }, [methods, productIndex]);

  const useVariant = useWatch({ name: 'variantId', control: methods.control });
  const useWeight = useWatch({ name: 'weight', control: methods.control });
  const activeVariant = requirement.variants.find(
    (variant) => variant.id === useVariant
  );

  const onSubmit = (put: IRequirementAnswer) => {
    const reqAnsWithId = nexus.specificationService.withId(put);
    if (productIndex === -1) {
      addGeneralAnswer(reqAnsWithId);
    } else {
      addProductAnswer(reqAnsWithId, specification.products[productIndex].id);
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
    if (productIndex !== -1) {
      return specification.products[productIndex].requirements.some(
        (req) => req === requirement.id
      );
    }
    return specification.requirements.some((req) => req === requirement.id);
  };

  const isInfo = (): boolean => {
    const selected = (
      productIndex === -1 ? specification : specification.products[productIndex]
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
    if (productIndex === -1) {
      const answer = specification.requirementAnswers.find(
        (reqAnswer) => reqAnswer.requirement.id === requirement.id
      );
      if (answer) {
        deleteGeneralAnswer(answer);
      }
      return answer;
    } else {
      const product = specification.products[productIndex];
      const answer = product.requirementAnswers.find(
        (reqAnswer) => reqAnswer.requirement.id === requirement.id
      );
      if (answer) {
        deleteProductAnswer(answer, product.id);
      }
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
      methods.reset({ ...answer, id: '' });
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

            <Box className={css.formButtons}>
              <Button
                variant="cancel"
                onClick={onCancel}
                className={css.cancel}
              >
                {t('Cancel')}
              </Button>
              {activeVariant.questions.length > 0 && (
                <Button variant="save" type="submit" className={css.save}>
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
          <Box className={css.info}>
            <Box className={css.aboveDivider}>
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
            <Divider className={css.divider} />
            <ChosenConfiguration requirement={requirement} />
          </Box>
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
              <GeneralErrorMessage errors={methods.formState.errors} />
            </form>
          </FormProvider>
        </Box>
      )}
    </Box>
  );
}
