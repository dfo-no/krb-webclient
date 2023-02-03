import React from 'react';
import { Typography } from '@mui/material/';
import { useTranslation } from 'react-i18next';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

import css from '../../Stylesheets/EditorFullPage.module.scss';
import DownloadToolbarItem from '../Download/DownloadToolbarItem';
import { GENERAL } from '../../../common/PathConstants';
import ToolbarItem from '../../../components/UI/Toolbar/ToolbarItem';
import Toolbar from '../../../components/UI/Toolbar/ToolBar';
import { useResponseState } from '../ResponseContext';
import SupplierInfoToolbar from '../../SpecEditor/SpecificationOverview/element/SupplierInfoToolbar';
import { IRequirementAnswer } from '../../../Nexus/entities/IRequirementAnswer';
import { currencyService } from '../../../Nexus/services/CurrencyService';
import AnswerProduct from '../Answer/AnswerProduct';
import { AccordionProvider } from '../../../components/DFOAccordion/AccordionContext';
import ProductsAccordion from '../Answer/ProductsAccordion/ProductsAccordion';
import { QuestionVariant } from '../../../Nexus/enums';
import ValidationUtils from '../../../common/ValidationUtils';

function ResponseOverview(): React.ReactElement {
  const { t } = useTranslation();
  const { response } = useResponseState();
  const specification = response.specification;

  const isGeneralRequirements = () => {
    return specification.requirements.length > 0;
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
    } else return 0;
  };

  const isAbsoluteRequirementAnswered = (
    requirementAnswer: IRequirementAnswer | undefined
  ) => {
    if (requirementAnswer?.question.type) {
      switch (requirementAnswer?.question.type) {
        case QuestionVariant.Q_CHECKBOX:
          return ValidationUtils.checkboxQuestion(requirementAnswer);

        case QuestionVariant.Q_CODELIST:
          return ValidationUtils.codelistQuestion(requirementAnswer);

        case QuestionVariant.Q_CONFIRMATION:
          return ValidationUtils.confirmationQuestion(requirementAnswer);

        case QuestionVariant.Q_SLIDER:
          return ValidationUtils.sliderQuestion(requirementAnswer);

        case QuestionVariant.Q_TEXT:
          return ValidationUtils.textQuestion(requirementAnswer);

        case QuestionVariant.Q_PERIOD_DATE:
          return ValidationUtils.periodDateQuestion(requirementAnswer);

        case QuestionVariant.Q_TIME:
          return ValidationUtils.timeQuestion(requirementAnswer);

        default:
          return false;
      }
    }
  };

  const absoluteRequirementAnswered = (
    requirementAnswer: (IRequirementAnswer | undefined)[]
  ) => {
    if (requirementAnswer?.length > 0) {
      let absoluteReqAnswered = 0;
      requirementAnswer?.forEach((element) => {
        if (
          !isAwardedRequirement(element) &&
          isAbsoluteRequirementAnswered(element)
        )
          absoluteReqAnswered++;
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
    return currencyService(response.specification.currencyUnit, discount);
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

  const renderGeneralRequirement = (
    requirementAnswer: (IRequirementAnswer | undefined)[]
  ) => {
    const renderGeneralRequirementInfo = () => {
      return (
        <Toolbar>
          {isMandatoryRequirements(requirementAnswer) && (
            <span
              className={
                absoluteRequirements(requirementAnswer) !==
                absoluteRequirementAnswered(response.requirementAnswers)
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
            <AccordionProvider>
              <AnswerProduct productId={GENERAL} />
            </AccordionProvider>
          </div>
        </li>
      </ul>
    );
  };

  const generalRequirements = (): React.ReactElement => {
    const requirementAnswer = specification?.requirements?.map(
      (requirementId) => {
        return specification?.requirementAnswers?.find(
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
          orgName={specification.organization}
          currencyUnit={specification.currencyUnit}
          caseNumber={specification?.caseNumber}
        />
        {isGeneralRequirements() && generalRequirements()}
        <ul>
          {specification.products.length > 0 && (
            <ProductsAccordion
              specProducts={specification.products}
              absoluteRequirements={absoluteRequirements}
              absoluteRequirementAnswered={absoluteRequirementAnswered}
              totalEvaluatedDiscount={totalEvaluatedDiscount}
              isMandatoryRequirements={isMandatoryRequirements}
              isAwardedRequirements={isAwardedRequirements}
            />
          )}
        </ul>
      </div>
    </div>
  );
}

export default ResponseOverview;
