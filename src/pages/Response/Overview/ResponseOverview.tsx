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

  const isAwardedRequirements = (requirement: IRequirementAnswer) => {
    return (
      ('discount' in requirement.question.config &&
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
        requirement.question.config.timeDiscounts.length > 0)
    );
  };
  const absoluteRequirements = (index: number) => {
    if (response.products[index].originProduct.requirementAnswers.length > 0) {
      let totalAbsoluteRequirements = 0;
      response.products[index].originProduct.requirementAnswers.map(
        (element) => {
          if (!isAwardedRequirements(element)) totalAbsoluteRequirements++;
        }
      );
      return totalAbsoluteRequirements;
    }
  };

  const absoluteRequirementAnswered = (index: number) => {
    if (response.products[index].requirementAnswers.length > 0) {
      let absoluteReqAnswered = 0;
      response.products[index].requirementAnswers.map((element) => {
        if (!isAwardedRequirements(element)) absoluteReqAnswered++;
      });
      return absoluteReqAnswered;
    } else {
      return 0;
    }
  };

  const totalEvaluatedDiscount = (index: number) => {
    let discount = 0;
    if (response.products[index].requirementAnswers.length > 0) {
      response.products[index].requirementAnswers.map((element) => {
        if (element.question.answer.discount) {
          discount += element.question.answer.discount;
        }
      });
    }
    return `${discount} ${t('NOK')}`;
  };
  const mandatoryRequirements = (index: number) => {
    return `${absoluteRequirementAnswered(index)}/${absoluteRequirements(
      index
    )}`;
  };

  const isAllRequirementsAnswered = (index: number) => {
    return absoluteRequirements(index) === absoluteRequirementAnswered(index);
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
          <ToolbarItem
            primaryText={t('Mandatory requirements')}
            secondaryText={mandatoryRequirements(index)}
            fontSize={'small'}
          />
          <ToolbarItem
            primaryText={t('Total evaluated discount')}
            secondaryText={totalEvaluatedDiscount(index)}
            fontSize={'small'}
          />
        </Toolbar>
      );
    };

    return (
      <li key={product.id}>
        <div className={css.CardContent}>
          <div className={css.CardTitle}>
            <Typography variant="mdBold">{product.title}</Typography>
            {absoluteRequirementAnswered(index) > 0 &&
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

  return (
    <div className={css.overview}>
      <div className={css.overview__content}>
        <Typography variant={'lgBold'}>{response.supplier}</Typography>
        <Toolbar hasPadding={true}>
          <DownloadToolbarItem />
        </Toolbar>
        <Typography variant={'mdBold'}>{t('Products')}</Typography>
        <ul aria-label="general-products">
          <li className={css.Active} key={'generic'}>
            <div className={css.CardContent}>
              <div className={css.CardTitle}>
                <Typography>{t('General requirements')}</Typography>
              </div>
              <Toolbar>
                <ToolbarItem
                  secondaryText={t('Edit general requirements')}
                  icon={<EditIcon />}
                  handleClick={() => genericPressed()}
                  fontSize={'small'}
                />
              </Toolbar>
            </div>
          </li>
        </ul>
        {response.specification.products.length > 0 && (
          <ul>
            {response.specification.products.map((element, index) => {
              return renderProducts(element, index);
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ResponseOverview;
