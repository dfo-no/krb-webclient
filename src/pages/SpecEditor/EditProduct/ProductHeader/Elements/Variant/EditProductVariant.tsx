import React, { ReactElement } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFormContext, useWatch } from 'react-hook-form';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Lock from '@mui/icons-material/Lock';
import Tune from '@mui/icons-material/Tune';
import Sort from '@mui/icons-material/Sort';

import css from './EditProductVariant.module.scss';
import ProductQuestionList from '../QuestionList/ProductQuestionList';
import theme from '../../../../../../theme';
import { IRequirement } from '../../../../../../Nexus/entities/IRequirement';
import { IVariant } from '../../../../../../Nexus/entities/IVariant';
import { VariantType } from '../../../../../../Nexus/enums';
import Badge from '../../../../../../components/UI/Badge/Badge';
import { IRequirementAnswer } from '../../../../../../Nexus/entities/IRequirementAnswer';

interface IProps {
  requirement: IRequirement;
  variant: IVariant;
}

export default function EditProductVariant({ variant }: IProps): ReactElement {
  const { t } = useTranslation();
  const { control } = useFormContext<IRequirementAnswer>();
  const nonPreferredDeductibleAmount = useWatch({
    name: 'question.config.pointsNonPrefered',
    control,
  });

  const unConfirmedDeductibleAmount = useWatch({
    name: 'question.config.pointsUnconfirmed',
    control,
  });

  const isAwardCriteria = () => {
    return nonPreferredDeductibleAmount > 0 || unConfirmedDeductibleAmount > 0;
  };

  const questionsTypeCodeList = () => {
    return variant.questions.filter((q) => q.type === 'Q_CODELIST');
  };

  const renderBadge = () => {
    if (variant.type === VariantType.info) {
      return (
        <Badge
          type={'information'}
          icon={<InfoOutlinedIcon />}
          displayText={t('Information')}
        />
      );
    } else if (isAwardCriteria()) {
      return (
        <Badge
          type={'award'}
          icon={<Sort />}
          displayText={t('Award criteria')}
        />
      );
    } else if (
      variant.type === VariantType.requirement &&
      questionsTypeCodeList().length === 0
    ) {
      return (
        <Badge
          type={'requirement'}
          icon={<Lock />}
          displayText={t('Mandatory requirement')}
        />
      );
    } else if (
      variant.type === VariantType.requirement &&
      questionsTypeCodeList().length > 0
    ) {
      return (
        <Badge
          type={'combinationRequirements'}
          icon={<Tune />}
          displayText={t('Combination requirements')}
        />
      );
    }
  };

  return (
    <Box className={css.EditProductVariant}>
      <Box className={css.titleRow}>
        <Typography variant={'lg'} className={css.title}>
          {variant.description}
        </Typography>
        {renderBadge()}
      </Box>
      <Typography variant={'smBold'} color={theme.palette.primary.main}>
        {t('Requirement text')}
      </Typography>
      <Typography className={css.infoText}>
        {variant.requirementText ? variant.requirementText : '-'}
      </Typography>
      {variant.instruction && (
        <>
          <Typography variant={'smBold'} color={theme.palette.primary.main}>
            {t('Instruction')}
          </Typography>
          <Typography className={css.infoText}>
            {variant.instruction}
          </Typography>
        </>
      )}
      <ProductQuestionList variant={variant} />
    </Box>
  );
}
