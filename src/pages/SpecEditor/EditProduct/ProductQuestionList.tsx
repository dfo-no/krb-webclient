import React, { ReactElement, useEffect, useState } from 'react';
import { Box, Card, Divider, Typography } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import css from './QuestionCard.module.scss';
import QuestionAnswer from './QuestionAnswer/QuestionAnswer';
import QuestionSpecification from './QuestionSpecification/QuestionSpecification';
import { DFORadioButton } from '../../../components/DFORadioButton/DFORadioButton';
import { IRequirementAnswer } from '../../../Nexus/entities/IRequirementAnswer';
import { IVariant } from '../../../Nexus/entities/IVariant';
import { VariantType } from '../../../Nexus/enums';
import { QuestionType } from '../../../Nexus/entities/QuestionType';

interface IProps {
  variant: IVariant;
}

const ProductQuestionsList = ({ variant }: IProps) => {
  const { t } = useTranslation();
  const [selectedRadioIndex, setSelectedRadioIndex] = useState(-1);
  const { control, setValue } = useFormContext<IRequirementAnswer>();
  const useQuestionId = useWatch({ name: 'questionId', control });

  useEffect(() => {
    const index = variant.questions.findIndex(
      (question) => question.id === useQuestionId
    );
    if (variant.questions.length > 0 && index < 0) {
      setValue('question', variant.questions[0]);
      setValue('questionId', variant.questions[0].id);
    }
    setSelectedRadioIndex(index > 0 ? index : 0);
  }, [useQuestionId, setValue, variant]);

  const questionSelected = (item: QuestionType, index: number) => {
    setSelectedRadioIndex(index);
    setValue('question', item);
    setValue('questionId', item.id);
  };

  const getInfoQuestion = (): ReactElement => {
    if (variant.questions.length === 0) {
      return <></>;
    }
    const item = variant.questions[0];
    return (
      <Card className={css.QuestionCard}>
        <Box className={css.cardHeader}>
          <Typography variant={'md'} className={css.cardTitle}>
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

  const getRequirementQuestions = (): ReactElement[] => {
    return variant.questions.map((item, index) => {
      return (
        <Card key={index} className={css.QuestionCard}>
          <Box className={css.cardHeader}>
            <DFORadioButton
              checked={selectedRadioIndex === index}
              onClick={() => questionSelected(item, index)}
            />
            <Typography variant={'md'} className={css.cardTitle}>
              {t(item.type)}
            </Typography>
          </Box>
          {index === selectedRadioIndex && (
            <Box className={css.cardContent}>
              <Divider />
              <QuestionSpecification item={item} />
            </Box>
          )}
        </Card>
      );
    });
  };

  const getQuestions = (): ReactElement | ReactElement[] => {
    return variant.type === VariantType.info
      ? getInfoQuestion()
      : getRequirementQuestions();
  };

  return <Box className={css.QuestionCardList}>{getQuestions()}</Box>;
};

export default ProductQuestionsList;
