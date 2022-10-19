import React, { ReactElement } from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import css from './PrefilledResponse.module.scss';
import ProductQuestion from './ProductQuestion';
import theme from '../../../theme';
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
      <Typography
        variant={'smBold'}
        color={theme.palette.primary.main}
        className={css.Label}
      >
        {t('Description')}
      </Typography>
      <Typography
        variant={'sm'}
        color={theme.palette.primary.main}
        className={css.Text}
      >
        {variant.description}
      </Typography>
      <Typography
        variant={'smBold'}
        color={theme.palette.primary.main}
        className={css.Label}
      >
        {t('Requirement text')}
      </Typography>
      <Typography
        variant={'sm'}
        color={theme.palette.primary.main}
        className={css.Text}
      >
        {variant.requirementText}
      </Typography>
      <Typography
        variant={'smBold'}
        color={theme.palette.primary.main}
        className={css.Label}
      >
        {t('Instruction')}
      </Typography>
      <Typography
        variant={'sm'}
        color={theme.palette.primary.main}
        className={css.Text}
      >
        {variant.instruction}
      </Typography>

      <Typography
        variant={'smBold'}
        color={theme.palette.primary.main}
        className={css.Label}
      >
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
