import React, { ReactElement } from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import css from './PrefilledResponse.module.scss';
import ProductQuestion from './ProductQuestion';
import { IVariant } from '../../../Nexus/entities/IVariant';
import { IRequirement } from '../../../Nexus/entities/IRequirement';

interface IProps {
  requirement: IRequirement;
  variant: IVariant;
}

export default function ProductVariant({
  requirement,
  variant,
}: IProps): ReactElement {
  const { t } = useTranslation();

  return (
    <div className={css.Variant}>
      {variant.description && (
        <>
          <Typography variant={'smBold'} className={css.Label}>
            {t('Description')}
          </Typography>
          <Typography variant={'sm'} className={css.Text}>
            {variant.description}
          </Typography>
        </>
      )}
      <Typography variant={'smBold'} className={css.Label}>
        {t('Requirement text')}
      </Typography>
      <Typography variant={'sm'} className={css.Text}>
        {variant.requirementText}
      </Typography>
      {variant.instruction && (
        <>
          <Typography variant={'smBold'} className={css.Label}>
            {t('Instruction')}
          </Typography>
          <Typography variant={'sm'} className={css.Text}>
            {variant.instruction}
          </Typography>
        </>
      )}
      <Typography variant={'smBold'} className={css.Label}>
        {t('Requirement answer')}
      </Typography>
      {variant.questions.map((question) => {
        return (
          <ProductQuestion
            key={question.id}
            question={question}
            requirement={requirement}
            variant={variant}
          />
        );
      })}
    </div>
  );
}
