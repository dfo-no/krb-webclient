import React from 'react';
import { Typography } from '@mui/material/';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

import css from '../../Stylesheets/EditorFullPage.module.scss';
import DownloadToolbarItem from '../Download/DownloadToolbarItem';
import { ISpecificationProduct } from '../../../Nexus/entities/ISpecificationProduct';
import { PRODUCTS, RESPONSE } from '../../../common/PathConstants';
import ToolbarItem from '../../../components/UI/Toolbar/ToolbarItem';
import Toolbar from '../../../components/UI/Toolbar/ToolBar';
import { useResponseState } from '../ResponseContext';
import SupplierInfoToolbar from '../../SpecEditor/SpecificationOverview/element/SupplierInfoToolbar';
import { IRequirementAnswer } from '../../../Nexus/entities/IRequirementAnswer';

function ResponseOverview(): React.ReactElement {
  const { t } = useTranslation();
  const history = useHistory();
  const { response } = useResponseState();

  const genericPressed = () => {
    history.push(`/${RESPONSE}/${response.id}/${PRODUCTS}/general`);
  };

  const productPressed = (index: number) => {
    history.push(`/${RESPONSE}/${response.id}/${PRODUCTS}/${index}`);
  };

  const isGeneralRequirements = () => {
    return response.specification.requirements.length > 0;
  };

  const isAwardedRequirement = (
    requirement: IRequirementAnswer | undefined
  ) => {
    return (
      requirement !== undefined &&
      (('discount' in requirement.question.config &&
        requirement.question.config.discount > 0) ||
        ('discountSumMax' in requirement.question.config &&
          requirement.question.config.discountSumMax > 0) ||
        ('discountsValue' in requirement.question.config &&
          requirement.question.config.discountsValue.length > 0) ||
        ('discountValues' in requirement.question.config &&
          requirement.question.config.discountValues.length > 0) ||
        ('dateDiscounts' in requirement.question.config &&
          requirement.question.config.dateDiscounts.length > 0) ||
        ('timeDiscounts' in requirement.question.config &&
          requirement.question.config.timeDiscounts.length > 0))
    );
  };

  const absoluteRequirements = (
    requirementAnswer: (IRequirementAnswer | undefined)[]
  ) => {
    if (requirementAnswer?.length > 0) {
      let totalAbsoluteRequirements = 0;
      requirementAnswer?.forEach((element) => {
        if (
          !isAwardedRequirement(element) &&
          element?.requirement?.variants.find(
            (variant) => variant.id === element?.variantId
          )?.type !== 'info'
        )
          totalAbsoluteRequirements++;
      });
      return totalAbsoluteRequirements;
    }
  };

  const absoluteRequirementAnswered = (
    requirementAnswer: (IRequirementAnswer | undefined)[]
  ) => {
    if (requirementAnswer?.length > 0) {
      let absoluteReqAnswered = 0;
      requirementAnswer?.forEach((element) => {
        if (!isAwardedRequirement(element)) absoluteReqAnswered++;
      });
      return absoluteReqAnswered;
    } else {
      return 0;
    }
  };

  const totalEvaluatedDiscount = (requirementAnswer: IRequirementAnswer[]) => {
    let discount = 0;
    if (requirementAnswer.length > 0) {
      requirementAnswer.forEach((requirement) => {
        if (requirement.question.answer.discount) {
          discount += requirement.question.answer.discount;
        }
      });
    }
    return `${discount} ${t('NOK')}`;
  };

  const mandatoryRequirements = (index: number) => {
    return `${absoluteRequirementAnswered(
      response.products[index].requirementAnswers
    )}/${absoluteRequirements(
      response.products[index].originProduct.requirementAnswers
    )}`;
  };

  const isMandatoryRequirements = (
    requirementAnswer: (IRequirementAnswer | undefined)[]
  ) => {
    return absoluteRequirements(requirementAnswer) != 0;
  };

  const isAwardedRequirements = (
    requirementAnswer: (IRequirementAnswer | undefined)[]
  ) => {
    let isAwarded = false;
    if (requirementAnswer?.length > 0) {
      requirementAnswer?.forEach((requirement) => {
        if (isAwardedRequirement(requirement)) {
          isAwarded = true;
        }
      });
    }
    return isAwarded;
  };

  const isAllRequirementsAnswered = (index: number) => {
    return (
      absoluteRequirements(
        response.products[index].originProduct.requirementAnswers
      ) ===
      absoluteRequirementAnswered(response.products[index].requirementAnswers)
    );
  };

  const renderProducts = (product: ISpecificationProduct, index: number) => {
    const renderProductInfo = () => {
      return (
        <Toolbar>
          <ToolbarItem
            primaryText={t('Quantity')}
            secondaryText={`${product.amount} ${product.unit}`}
            fontSize={'small'}
          />
          <ToolbarItem
            primaryText={t('Type')}
            secondaryText={product.originProduct.title}
            fontSize={'small'}
          />
          {isMandatoryRequirements(
            response.products[index].originProduct.requirementAnswers
          ) && (
            <span
              className={
                !isAllRequirementsAnswered(index)
                  ? css.RequirementAnswered__no
                  : ''
              }
            >
              <ToolbarItem
                primaryText={t('Mandatory requirements')}
                secondaryText={mandatoryRequirements(index)}
                fontSize={'small'}
              />
            </span>
          )}
          {isAwardedRequirements(
            response.products[index].requirementAnswers
          ) && (
            <ToolbarItem
              primaryText={t('Total evaluated discount')}
              secondaryText={totalEvaluatedDiscount(
                response.products[index].requirementAnswers
              )}
              fontSize={'small'}
            />
          )}
        </Toolbar>
      );
    };

    return (
      <li key={product.id}>
        <div className={css.CardContent}>
          <div className={css.CardTitle}>
            <Typography variant="mdBold">{product.title}</Typography>
            {absoluteRequirementAnswered(
              response.products[index].requirementAnswers
            ) > 0 &&
              (isAllRequirementsAnswered(index) ? (
                <CheckBoxOutlinedIcon
                  className={css.RequirementAnswered__yes}
                />
              ) : (
                <WarningAmberOutlinedIcon
                  className={css.RequirementAnswered__no}
                />
              ))}
          </div>
          <div>{renderProductInfo()}</div>
          <div className={css.Description}>
            <Typography>{product.description}</Typography>
            <Toolbar>
              <ToolbarItem
                secondaryText={t('Edit the product')}
                icon={<EditIcon />}
                handleClick={() => productPressed(index)}
                fontSize={'small'}
              />
            </Toolbar>
          </div>
        </div>
      </li>
    );
  };

  const renderGeneralRequirement = (
    requirementAnswer: (IRequirementAnswer | undefined)[]
  ) => {
    const renderGeneralRequirementInfo = () => {
      return (
        <Toolbar>
          {isMandatoryRequirements(requirementAnswer) && (
            <span
              className={
                !(
                  absoluteRequirements(requirementAnswer) ===
                  absoluteRequirementAnswered(response.requirementAnswers)
                )
                  ? css.RequirementAnswered__no
                  : ''
              }
            >
              <ToolbarItem
                primaryText={t('Mandatory requirements')}
                secondaryText={`${absoluteRequirementAnswered(
                  response.requirementAnswers
                )}/${absoluteRequirements(requirementAnswer)}`}
                fontSize={'small'}
              />
            </span>
          )}
          {isAwardedRequirements(requirementAnswer) && (
            <ToolbarItem
              primaryText={t('Total evaluated discount')}
              secondaryText={totalEvaluatedDiscount(
                response.requirementAnswers
              )}
              fontSize={'small'}
            />
          )}
        </Toolbar>
      );
    };

    return (
      <ul>
        <li>
          <div className={css.CardContent}>
            <div className={css.CardTitle}>
              <Typography>{t('General requirements')}</Typography>
              {absoluteRequirementAnswered(response.requirementAnswers) > 0 &&
                (absoluteRequirements(requirementAnswer) ===
                absoluteRequirementAnswered(response.requirementAnswers) ? (
                  <CheckBoxOutlinedIcon
                    className={css.RequirementAnswered__yes}
                  />
                ) : (
                  <WarningAmberOutlinedIcon
                    className={css.RequirementAnswered__no}
                  />
                ))}
            </div>
            <div>{renderGeneralRequirementInfo()}</div>
            <div className={css.General}>
              <Toolbar>
                <ToolbarItem
                  secondaryText={t('Edit general requirements')}
                  icon={<EditIcon />}
                  handleClick={() => genericPressed()}
                  fontSize={'small'}
                />
              </Toolbar>
            </div>
          </div>
        </li>
      </ul>
    );
  };

  const generalRequirements = (): React.ReactElement => {
    const requirementAnswer = response.specification?.requirements?.map(
      (requirementId) => {
        return response.specification?.requirementAnswers?.find(
          (reqAns) => reqAns?.requirement?.id === requirementId
        );
      }
    );
    return renderGeneralRequirement(requirementAnswer);
  };

  return (
    <div className={css.overview}>
      <div className={css.overview__content}>
        <Typography variant={'lgBold'}>{response.supplier}</Typography>
        <Toolbar hasPadding={true}>
          <DownloadToolbarItem />
        </Toolbar>
        <SupplierInfoToolbar
          orgName={response.specification.organization}
          currencyUnit={response.specification.currencyUnit}
          caseNumber={response.specification?.caseNumber}
        />
        {isGeneralRequirements() && generalRequirements()}
        {response.specification.products.length > 0 && (
          <ul>
            {response.specification.products.map((element, index) => {
              if (
                response.products[index].originProduct.requirementAnswers
                  .length > 0
              )
                return renderProducts(element, index);
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ResponseOverview;
