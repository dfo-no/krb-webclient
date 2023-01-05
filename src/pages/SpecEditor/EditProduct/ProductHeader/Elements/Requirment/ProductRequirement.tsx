import classnames from 'classnames';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { ReactElement, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Type, Variant } from '@dfo-no/components.button';

import css from './ProductRequirement.module.scss';
import { ISpecificationProduct } from '../../../../../../Nexus/entities/ISpecificationProduct';
import { IRequirement } from '../../../../../../Nexus/entities/IRequirement';
import { useSpecificationState } from '../../../../SpecificationContext';
import Nexus from '../../../../../../Nexus/Nexus';
import SpecificationService from '../../../../../../Nexus/services/SpecificationService';
import { IRequirementAnswer } from '../../../../../../Nexus/entities/IRequirementAnswer';
import { ModelType, VariantType } from '../../../../../../Nexus/enums';
import EditProductVariant from '../Variant/EditProductVariant';
import ChosenConfiguration from '../../../ChosenConfiguration/ChosenConfiguration';
import ProductVariant from '../Variant/ProductVariant';
import GeneralErrorMessage from '../../../../../../Form/GeneralErrorMessage';
import ToolbarItem from '../../../../../../components/UI/Toolbar/ToolbarItem';
import Toolbar from '../../../../../../components/UI/Toolbar/ToolBar';
import Badge, { BadgeType } from '../../../../../../components/UI/Badge/Badge';

interface IProps {
  requirement: IRequirement;
  product?: ISpecificationProduct;
}

export default function ProductRequirement({
  requirement,
  product,
}: IProps): React.ReactElement {
  const { t } = useTranslation();
  const {
    specification,
    addGeneralAnswer,
    deleteGeneralAnswer,
    addProductAnswer,
    deleteProductAnswer,
    setEditingRequirement,
  } = useSpecificationState();
  const nexus = Nexus.getInstance();
  const [original, setOriginal] = useState<null | IRequirementAnswer>(null);

  const defaultValues =
    SpecificationService.defaultRequirementAnswer(requirement);
  const methods = useForm<IRequirementAnswer>({
    resolver: nexus.resolverService.postResolver(ModelType.requirementAnswer),
    defaultValues,
  });

  useEffect(() => {
    methods.reset();
  }, [methods, product]);

  const useVariant = useWatch({ name: 'variantId', control: methods.control });
  const activeVariant = requirement.variants.find(
    (variant) => variant.id === useVariant
  );

  const onSubmit = (put: IRequirementAnswer) => {
    const reqAnsWithId = nexus.specificationService.withId(put);
    if (!product) {
      addGeneralAnswer(reqAnsWithId);
    } else {
      addProductAnswer(reqAnsWithId, product.id);
    }
    setEditingRequirement(false);
  };

  useEffect(() => {
    if (activeVariant) setEditingRequirement(true);
    else setEditingRequirement(false);
  }, [activeVariant, setEditingRequirement]);

  const onCancel = (): void => {
    if (original) {
      onSubmit(original);
      setOriginal(null);
    } else {
      methods.reset(defaultValues);
    }
  };

  const isSelected = (): boolean => {
    if (product) {
      return product.requirements.some((req) => req === requirement.id);
    }
    return specification.requirements.some((req) => req === requirement.id);
  };

  const selectedRequirement = (
    product ?? specification
  ).requirementAnswers.find(
    (reqAns) => reqAns.requirement.id === requirement.id
  );

  const selectedVariant = requirement.variants.find(
    (variant) => variant.id === selectedRequirement?.variantId
  );

  const isInfo = (): boolean => {
    return !!(selectedVariant && selectedVariant.type === VariantType.info);
  };

  const unsavedRequirement = (): IRequirementAnswer | undefined => {
    if (!product) {
      const answer = specification.requirementAnswers.find(
        (reqAnswer) => reqAnswer.requirement.id === requirement.id
      );
      if (answer) {
        deleteGeneralAnswer(answer);
        methods.reset({ ...defaultValues, id: '' });
      }
      return answer;
    } else {
      const answer = product.requirementAnswers.find(
        (reqAnswer) => reqAnswer.requirement.id === requirement.id
      );
      if (answer) {
        deleteProductAnswer(answer, product.id);
      }
      return answer;
    }
  };

  const editRequirement = (): void => {
    const answer = unsavedRequirement();
    if (answer) {
      methods.reset({ ...answer, id: '' });
      setOriginal(answer);
    }
  };

  const deleteRequirement = (): void => {
    unsavedRequirement();
    methods.reset({ ...defaultValues, id: '' });
    setOriginal(null);
  };

  const isVariant = () => requirement.variants.length > 1;

  const renderActiveVariant = (): ReactElement => {
    return (
      <Box className={css.variant}>
        {activeVariant && (
          <Box className={css.active}>
            {requirement && (
              <EditProductVariant
                requirement={requirement}
                variant={activeVariant}
              />
            )}
            <div className={css.formButtons}>
              {activeVariant.questions.length > 0 && (
                <Button type={Type.Submit}>{t('Save requirement')}</Button>
              )}
              <Button variant={Variant.Inverted} onClick={() => onCancel()}>
                {t('common.Cancel')}
              </Button>
            </div>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box
      key={requirement.id}
      className={css.ProductRequirement}
      data-cy={'product-requirement'}
    >
      {isSelected() ? (
        <Box className={classnames(css.card, css.selected)}>
          <div className={css.card__description}>
            <Toolbar>
              <ToolbarItem
                primaryText={requirement.title}
                icon={<CheckIcon className={css.check} />}
                fontSize={'small'}
                fontWeight={'bold'}
              />
            </Toolbar>
            <div>
              <Typography variant={'sm'}>
                {selectedVariant?.requirementText}
              </Typography>
            </div>
            <Toolbar>
              <ChosenConfiguration
                requirement={requirement}
                product={product}
              />
            </Toolbar>
          </div>
          <div className={css.choose}>
            <Toolbar>
              {isInfo() && (
                <Badge
                  type={BadgeType.Information}
                  displayText={t('Information')}
                />
              )}
              <ToolbarItem
                secondaryText={t('Edit requirement')}
                icon={<EditIcon />}
                handleClick={() => editRequirement()}
                fontWeight={'bold'}
                fontSize={'small'}
              />
              <ToolbarItem
                secondaryText={t('Delete requirement')}
                icon={<DeleteIcon />}
                handleClick={() => deleteRequirement()}
                fontWeight={'bold'}
                fontSize={'small'}
              />
            </Toolbar>
          </div>
        </Box>
      ) : (
        <Box className={css.card}>
          <Box className={css.card__title}>
            <Typography variant="smBold">{requirement.title}</Typography>
          </Box>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              autoComplete="off"
              noValidate
            >
              <Box className={css.variant}>
                {requirement.variants.map((variant) => {
                  const chosenVariantId = () => {
                    if (activeVariant) {
                      return requirement.variants.find(
                        (v) => v.id === variant?.id
                      );
                    }
                  };
                  return (
                    <Box
                      key={variant.id}
                      className={!chosenVariantId() ? css.card : css.hidden}
                    >
                      <ProductVariant
                        key={variant.id}
                        variant={variant}
                        isVariant={isVariant()}
                      />
                    </Box>
                  );
                })}
              </Box>
              {renderActiveVariant()}
              <GeneralErrorMessage errors={methods.formState.errors} />
            </form>
          </FormProvider>
        </Box>
      )}
    </Box>
  );
}
