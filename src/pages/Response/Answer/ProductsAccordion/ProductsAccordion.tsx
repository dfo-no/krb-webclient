import React, { useState } from 'react';
import { Button, Location, Variant } from '@dfo-no/components.button';
import { useTranslation } from 'react-i18next';
import { Symbols } from '@dfo-no/components.icon';
import { Typography } from '@mui/material';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

import css from './ProductsAccordion.module.scss';
import style from '../../../Stylesheets/EditorFullPage.module.scss';
import { ISpecificationProduct } from '../../../../Nexus/entities/ISpecificationProduct';
import { IResponseProduct } from '../../../../Nexus/entities/IResponseProduct';
import Toolbar from '../../../../components/UI/Toolbar/ToolBar';
import ToolbarItem from '../../../../components/UI/Toolbar/ToolbarItem';
import AnswerProduct from '../AnswerProduct';
import { IRequirementAnswer } from '../../../../Nexus/entities/IRequirementAnswer';
import { useResponseState } from '../../ResponseContext';

interface Props {
  specProducts: ISpecificationProduct[];
  absoluteRequirements: (
    requirementAnswer: (IRequirementAnswer | undefined)[]
  ) => number | undefined;
  absoluteRequirementAnswered: (
    requirementAnswer: (IRequirementAnswer | undefined)[]
  ) => number;
  totalEvaluatedDiscount: (requirementAnswer: IRequirementAnswer[]) => string;
  isMandatoryRequirements: (
    requirementAnswer: (IRequirementAnswer | undefined)[]
  ) => boolean;
  isAwardedRequirements: (
    requirementAnswer: (IRequirementAnswer | undefined)[]
  ) => boolean;
}

export default function ProductsAccordion({
  specProducts,
  absoluteRequirements,
  absoluteRequirementAnswered,
  totalEvaluatedDiscount,
  isMandatoryRequirements,
  isAwardedRequirements,
}: Props) {
  const { t } = useTranslation();
  const { response } = useResponseState();
  const [productIndex, setProductIndex] = useState<number | null>(null);
  const productsLength = specProducts.filter((product, i) => {
    const responseProduct = response.products[i];
    return responseProduct.originProduct.requirementAnswers.length > 0;
  }).length;
  let productResponse: IResponseProduct;

  const handleClick = (index: number) => {
    if (productIndex == index) {
      setProductIndex(null);
    } else setProductIndex(index);
  };

  const handleNext = (index: number) => {
    setProductIndex(index + 1);
  };

  const handleBack = (index: number) => {
    setProductIndex(index - 1);
  };

  const mandatoryRequirements = (responseProduct: IResponseProduct) => {
    return `${absoluteRequirementAnswered(
      responseProduct.requirementAnswers
    )}/${absoluteRequirements(
      responseProduct.originProduct.requirementAnswers
    )}`;
  };

  const isAllRequirementsAnswered = (responseProduct: IResponseProduct) => {
    return (
      absoluteRequirements(responseProduct.originProduct.requirementAnswers) ===
      absoluteRequirementAnswered(responseProduct.requirementAnswers)
    );
  };

  const renderProducts = (
    product: ISpecificationProduct,
    responseProduct: IResponseProduct,
    index: number
  ) => {
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
            responseProduct.originProduct.requirementAnswers
          ) && (
            <span
              className={
                !isAllRequirementsAnswered(responseProduct)
                  ? style.RequirementAnswered__no
                  : ''
              }
            >
              <ToolbarItem
                primaryText={t('Mandatory requirements')}
                secondaryText={mandatoryRequirements(responseProduct)}
                fontSize={'small'}
              />
            </span>
          )}
          {isAwardedRequirements(
            responseProduct.originProduct.requirementAnswers
          ) && (
            <ToolbarItem
              primaryText={t('Total evaluated discount')}
              secondaryText={totalEvaluatedDiscount(
                responseProduct.requirementAnswers
              )}
              fontSize={'small'}
            />
          )}
        </Toolbar>
      );
    };

    return (
      <div key={product.id} className={style.CardContent}>
        <div className={style.CardTitle}>
          <Typography variant="mdBold">{product.title}</Typography>
          {absoluteRequirementAnswered(responseProduct.requirementAnswers) >
            0 &&
            (isAllRequirementsAnswered(responseProduct) ? (
              <CheckBoxOutlinedIcon
                className={style.RequirementAnswered__yes}
              />
            ) : (
              <WarningAmberOutlinedIcon
                className={style.RequirementAnswered__no}
              />
            ))}
        </div>
        <div>{renderProductInfo()}</div>
        <div
          className={productIndex !== index ? style.Description : css.Hidden}
        >
          <Typography>{product.description}</Typography>
        </div>
      </div>
    );
  };

  return (
    <div className={css.ProductsAccordion}>
      {specProducts
        .filter((product, index) => {
          const responseProduct = response.products[index];
          return responseProduct.originProduct.requirementAnswers.length > 0;
        })
        .map((p, i) => {
          productResponse = response.products[i];
          return (
            <ul key={i}>
              <li>
                <div
                  className={css.Header}
                  onClick={() => handleClick(i)}
                  data-expanded={productIndex == i}
                >
                  <div>
                    {specProducts.length > 0 &&
                      renderProducts(p, productResponse, i)}
                  </div>
                  <span className={css.Header__icon}>
                    {productIndex == i ? <ExpandLess /> : <ExpandMore />}
                  </span>
                </div>
                <div className={productIndex == i ? css.Content : css.Hidden}>
                  <div className={css.AnswerProduct}>
                    <AnswerProduct productId={p.id} />
                  </div>
                  <div className={css.ActionButtons}>
                    <Button
                      variant={Variant.Ghost}
                      icon={Symbols.ArrowUp}
                      iconLocation={Location.Before}
                      onClick={() => handleBack(i)}
                      disabled={i === 0}
                    >
                      {t('Previous product')}
                    </Button>
                    <Button
                      variant={Variant.Ghost}
                      icon={Symbols.ChevronUp}
                      iconLocation={Location.Before}
                      onClick={() => handleClick(i)}
                    >
                      {t('Close product')}
                    </Button>
                    <Button
                      variant={Variant.Ghost}
                      icon={Symbols.ArrowDown}
                      iconLocation={Location.Before}
                      onClick={() => handleNext(i)}
                      disabled={i === productsLength - 1}
                    >
                      {t('Next product')}
                    </Button>
                  </div>
                </div>
              </li>
            </ul>
          );
        })}
    </div>
  );
}
