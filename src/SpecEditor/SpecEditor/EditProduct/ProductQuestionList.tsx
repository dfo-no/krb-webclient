import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import { Box, Card, Divider, Typography } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import QuestionSpecification from './QuestionSpecification';
import QuestionVariant from '../../../models/QuestionVariant';
import theme from '../../../theme';
import { DFORadioButton } from '../../../components/DFORadioButton/DFORadioButton';
import { ICheckboxQuestion } from '../../../Nexus/entities/ICheckboxQuestion';
import { ICodelistQuestion } from '../../../Nexus/entities/ICodelistQuestion';
import { IFileUploadQuestion } from '../../../Nexus/entities/IFileUploadQuestion';
import { IPeriodDateQuestion } from '../../../Nexus/entities/IPeriodDateQuestion';
import { IRequirementAnswer } from '../../../models/IRequirementAnswer';
import { ISliderQuestion } from '../../../Nexus/entities/ISliderQuestion';
import { ITextQuestion } from '../../../Nexus/entities/ITextQuestion';
import { ITimeQuestion } from '../../../Nexus/entities/ITimeQuestion';
import { IVariant } from '../../../Nexus/entities/IVariant';

const useStyles = makeStyles({
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    border: `1px solid ${theme.palette.black.main}`,
    backgroundColor: theme.palette.gray100.main,
    padding: 32,
    marginBottom: 16
  }
});

interface IProps {
  variant: IVariant;
}

const ProductQuestionsList = ({ variant }: IProps) => {
  const { t } = useTranslation();
  const classes = useStyles();
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

  const questionSelected = (
    item:
      | ITimeQuestion
      | ITextQuestion
      | ISliderQuestion
      | IPeriodDateQuestion
      | IFileUploadQuestion
      | ICodelistQuestion
      | ICheckboxQuestion,
    index: number
  ) => {
    setSelectedRadioIndex(index);
    setValue('question', item);
    setValue('questionId', item.id);
  };

  return (
    <Box className={classes.list}>
      {variant.questions.map((item, index) => {
        return (
          <Card key={index} sx={{ padding: 1 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                marginLeft: 2,
                marginRight: 2
              }}
            >
              <DFORadioButton
                checked={selectedRadioIndex === index}
                onClick={() => questionSelected(item, index)}
              />
              <Typography
                variant={'md'}
                sx={{ display: 'flex', paddingLeft: 2, alignSelf: 'center' }}
              >
                {t(QuestionVariant[item.type])}
              </Typography>
            </Box>
            {index === selectedRadioIndex && (
              <Box sx={{ margin: 2 }}>
                <Divider />
                <QuestionSpecification item={item} />
              </Box>
            )}
          </Card>
        );
      })}
    </Box>
  );
};

export default ProductQuestionsList;
