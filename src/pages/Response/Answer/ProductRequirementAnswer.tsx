import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import css from './ProductRequirementAnswer.module.scss';
import ProductQuestionAnswer from './ProductQuestionAnswer';
import { IRequirementAnswer } from '../../../Nexus/entities/IRequirementAnswer';
import { QuestionVariant, VariantType } from '../../../Nexus/enums';
import { useResponseState } from '../ResponseContext';
import Badge, { BadgeType } from '../../../components/UI/Badge/Badge';
import ToolbarItem from '../../../components/UI/Toolbar/ToolbarItem';
import { currencyService } from '../../../Nexus/services/CurrencyService';

interface IProps {
  requirementAnswer: IRequirementAnswer;
  productIndex: number;
}

export default function ProductRequirementAnswer({
  requirementAnswer,
  productIndex,
}: IProps): ReactElement {
  const { response } = useResponseState();
  const { t } = useTranslation();

  const isAwardCriteria = (id: string) => {
    if (requirementAnswer.id === id) {
      switch (requirementAnswer.question.type) {
        case QuestionVariant.Q_CHECKBOX:
          return requirementAnswer.question.config.discount > 0;
        case QuestionVariant.Q_CONFIRMATION:
          return requirementAnswer.question.config.discount > 0;
        case QuestionVariant.Q_CODELIST:
          return requirementAnswer.question.config.codes?.length > 0;
        case QuestionVariant.Q_SLIDER:
          return requirementAnswer.question.config.discountsValue?.length > 0;
        case QuestionVariant.Q_PERIOD_DATE:
          return (
            requirementAnswer.question.config.dateDiscounts?.length > 0 ||
            requirementAnswer.question.config.numberDayDiscounts?.length > 0
          );
        case QuestionVariant.Q_TIME:
          return (
            requirementAnswer.question.config.timeDiscounts?.length > 0 ||
            requirementAnswer.question.config.timePeriodDiscount?.length > 0
          );
        case QuestionVariant.Q_TEXT:
          return requirementAnswer.question.config.discountValues?.length > 0;
      }
    }
  };

  const [existingAnswer, setExistingAnswer] = useState<
    IRequirementAnswer | undefined
  >(undefined);
  const requirementVariant = requirementAnswer.requirement.variants.find(
    (variant) => variant.id === requirementAnswer.variantId
  );
  const isInfo =
    requirementVariant && requirementVariant.type === VariantType.info;

  const renderBadge = (id: string) => {
    if (isInfo) {
      return (
        <Badge type={BadgeType.Information} displayText={t('Information')} />
      );
    } else if (isAwardCriteria(id)) {
      return <Badge type={BadgeType.Award} displayText={t('Award criteria')} />;
    } else if (!isInfo) {
      return (
        <Badge
          type={BadgeType.Requirement}
          displayText={t('Mandatory requirement')}
        />
      );
    }
  };

  const evaluatedDiscount = () => {
    return existingAnswer?.question.answer.discount;
  };

  const isTextQuestionType =
    requirementAnswer.question.type === QuestionVariant.Q_TEXT;

  const renderTextDiscount = (id: string) => {
    return (
      <div className={css.ProductRequirementAnswer__textDiscountTable}>
        <span>{t('Deduction')}</span>
        {requirementAnswer?.id === id &&
          requirementAnswer?.question.type === QuestionVariant.Q_TEXT &&
          requirementAnswer?.question.config.discountValues?.map((d) => {
            return (
              <span key={d.id}>
                {currencyService(
                  response.specification.currencyUnit,
                  d.discount
                )}
              </span>
            );
          })}
      </div>
    );
  };

  useEffect(() => {
    const answer = (
      productIndex >= 0 ? response.products[productIndex] : response
    ).requirementAnswers.find((reqAns) => {
      return reqAns.id === requirementAnswer.id;
    });
    if (answer) setExistingAnswer(answer);
  }, [requirementAnswer.id, productIndex, response]);

  return (
    <div key={requirementAnswer.id} className={css.ProductRequirementAnswer}>
      <div className={css.title}>
        <span>{requirementAnswer.requirement.title}</span>
        {renderBadge(requirementAnswer.id)}
      </div>
      <span>{requirementVariant?.description}</span>
      {!isInfo && (
        <ProductQuestionAnswer
          requirementAnswer={requirementAnswer}
          existingAnswer={existingAnswer}
          productIndex={productIndex}
        />
      )}
      {isAwardCriteria(requirementAnswer.id) && (
        <>
          {isTextQuestionType ? (
            <>
              <span className={css.discountLevelsTilte}>
                {t('Discount levels')}
              </span>
              {renderTextDiscount(requirementAnswer.id)}
            </>
          ) : (
            <ToolbarItem
              primaryText={t('Evaluated discount')}
              secondaryText={currencyService(
                response.specification.currencyUnit,
                evaluatedDiscount() ?? 0
              )}
              fontSize={'small'}
              dataCy={'evaluated-discount'}
            />
          )}
        </>
      )}
    </div>
  );
}
