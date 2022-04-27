import { Grid, Typography } from '@mui/material';
import HorizontalTextCtrl from '../../../FormProvider/HorizontalTextCtrl';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import React from 'react';
import { ISliderQuestion } from '../../../Nexus/entities/ISliderQuestion';
import { useTranslation } from 'react-i18next';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { IRequirementAnswer } from '../../../models/IRequirementAnswer';

interface IProps {
  item: ISliderQuestion;
}

const QuestionSpecificationSlider = ({ item }: IProps) => {
  const { t } = useTranslation();
  const { control } = useFormContext<IRequirementAnswer>();
  const { fields } = useFieldArray({
    control,
    name: 'question.config.scoreValues'
  });

  return (
    <Grid
      container
      columns={20}
      sx={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Grid item xs={8}>
        <HorizontalTextCtrl
          name={'question.config.min'}
          placeholder={t('Minumum')}
          type={'number'}
        />
      </Grid>
      <Grid
        item
        xs={1}
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <ArrowForwardIcon />
      </Grid>
      <Grid item xs={8}>
        <HorizontalTextCtrl
          name={'question.config.max'}
          placeholder={t('Maximum')}
          type={'number'}
        />
      </Grid>
      <Grid item xs={3}>
        <Typography variant={'md'} sx={{ paddingLeft: 2 }}>
          {item.config.unit}
        </Typography>
      </Grid>
      <Grid
        item
        xs={8}
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Typography variant={'sm'}>Min: {item.config.min}</Typography>
      </Grid>
      <Grid
        item
        xs={1}
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Typography variant={'sm'}>{item.config.step} step</Typography>
      </Grid>
      <Grid
        item
        xs={8}
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Typography variant={'sm'}>Max: {item.config.max}</Typography>
      </Grid>
      <Grid item xs={20}>
        <Typography variant={'smBold'}>Evaluering:</Typography>
      </Grid>
      {fields.map((scoreValue, id) => {
        return (
          <Grid
            item
            container
            key={id}
            xs={20}
            columns={20}
            sx={{
              display: 'flex',
              alignItems: 'center',
              paddingTop: 1
            }}
          >
            <Grid item xs={8}>
              <Typography variant={'smBold'}>{scoreValue.value}</Typography>
            </Grid>
            <Grid
              item
              xs={1}
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <ArrowForwardIcon />
            </Grid>
            <Grid item xs={8}>
              <HorizontalTextCtrl
                name={
                  `question.config.scoreValues.${id}.score` as 'question.config.scoreValues.0.score'
                }
                placeholder={t('Score')}
                type={'number'}
              />
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default QuestionSpecificationSlider;
