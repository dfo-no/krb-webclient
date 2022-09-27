import React, { ReactElement, useEffect } from 'react';
import { Box, Card, Divider, Typography } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import css from './QuestionCard.module.scss';
import QuestionAnswer from '../../../QuestionAnswer/QuestionAnswer';
import QuestionSpecification from '../../../QuestionSpecification/QuestionSpecification';
import { IRequirementAnswer } from '../../../../../../Nexus/entities/IRequirementAnswer';
import { IVariant } from '../../../../../../Nexus/entities/IVariant';
import { VariantType } from '../../../../../../Nexus/enums';

interface IProps {
  variant: IVariant;
}

const ProductQuestionsList = ({ variant }: IProps): ReactElement => {
  const { t } = useTranslation();
  const { control, setValue } = useFormContext<IRequirementAnswer>();
  const useQuestionId = useWatch({ name: 'questionId', control });
  const item = variant.questions[0];

  useEffect(() => {
    if (
      variant.questions.length > 0 &&
      variant.questions[0].id !== useQuestionId
    ) {
      setValue('question', item);
      setValue('questionId', item.id);
    }
  }, [useQuestionId, setValue, variant, item]);

  if (!item) {
    return <Typography className={css.infoText}>-</Typography>;
  }

  return (
    <Card className={css.QuestionCard}>
      <Box>
        <Typography variant={'smBold'} className={css.cardTitle}>
          {t(item.type)}
        </Typography>
      </Box>
      <Box className={css.cardContent}>
        <Divider />
        {variant.type === VariantType.info ? (
          <QuestionAnswer item={item} />
        ) : (
          <QuestionSpecification item={item} />
        )}
      </Box>
    </Card>
  );
};

export default ProductQuestionsList;
