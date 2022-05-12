import { Box, Grid, styled, Typography } from '@mui/material';
import { t } from 'i18next';
import DateCtrl from '../../../FormProvider/DateCtrl';
import HorizontalTextCtrl from '../../../FormProvider/HorizontalTextCtrl';
import { IPeriodDateQuestion } from '../../../Nexus/entities/IPeriodDateQuestion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { IRequirementAnswer } from '../../../models/IRequirementAnswer';
import VerticalTextCtrl from '../../../FormProvider/VerticalTextCtrl';

interface IProps {
  item: IPeriodDateQuestion;
}

const FieldBox = styled(Box)(() => ({
  width: 200
}));

const QuestionSpecificationPeriodDate = ({ item }: IProps) => {
  const { control } = useFormContext<IRequirementAnswer>();
  const { fields } = useFieldArray({
    control,
    name: 'question.config.scoreValues'
  });

  return (
    <Box sx={{ display: 'flex', margin: '0 auto' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          alignSelf: 'center'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: 422
            }}
          >
            <Typography variant="smBold" sx={{ alignSelf: 'center' }}>
              Fra/til dato
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <FieldBox>
              <DateCtrl label={t('From')} name="question.config.fromBoundry" />
            </FieldBox>
            <FieldBox>
              <DateCtrl label={t('To')} name="question.config.toBoundry" />
            </FieldBox>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: 422
            }}
          >
            <Typography variant="smBold" sx={{ alignSelf: 'center' }}>
              Periode
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <FieldBox>
              <VerticalTextCtrl name="question.config.periodMin" label="Min" />
            </FieldBox>
            <FieldBox>
              <VerticalTextCtrl name="question.config.periodMax" label="Max" />
            </FieldBox>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: 422
            }}
          >
            <Typography variant="smBold" sx={{ alignSelf: 'center' }}>
              Date scores
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <FieldBox>
              <DateCtrl label={t('From')} name="question.config.toBoundry" />
            </FieldBox>
            <FieldBox>
              <VerticalTextCtrl
                name={
                  `question.config.scoreValues.0.score` as 'question.config.scoreValues.0.score'
                }
                label={t('Score')}
                type={'number'}
              />
            </FieldBox>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionSpecificationPeriodDate;
