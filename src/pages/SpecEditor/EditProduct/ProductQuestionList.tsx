import React, { ReactElement, useEffect } from 'react';
import { Box, Card, Divider, Typography } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import css from './QuestionCard.module.scss';
import QuestionAnswer from './QuestionAnswer/QuestionAnswer';
import { IRequirementAnswer } from '../../../Nexus/entities/IRequirementAnswer';
import { IVariant } from '../../../Nexus/entities/IVariant';

interface IProps {
  variant: IVariant;
}

const ProductQuestionsList = ({ variant }: IProps): ReactElement => {
  const { t } = useTranslation();
  const { control, setValue } = useFormContext<IRequirementAnswer>();
  const useQuestionId = useWatch({ name: 'questionId', control });
  const item = variant.questions[0];

  useEffect(() => {
    const index = variant.questions.findIndex(
      (question) => question.id === useQuestionId
    );
    if (variant.questions.length > 0 && index < 0) {
      setValue('question', item);
      setValue('questionId', item.id);
    }
  }, [useQuestionId, setValue, variant, item]);

  if (!item) {
    return <>-</>;
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
        <QuestionAnswer item={item} />
      </Box>
    </Card>
  );
};

export default ProductQuestionsList;
