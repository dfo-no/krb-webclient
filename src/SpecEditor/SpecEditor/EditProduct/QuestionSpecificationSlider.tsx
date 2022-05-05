import { Button, Grid, Typography } from '@mui/material';
import HorizontalTextCtrl from '../../../FormProvider/HorizontalTextCtrl';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useEffect } from 'react';
import { ISliderQuestion } from '../../../Nexus/entities/ISliderQuestion';
import { useTranslation } from 'react-i18next';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { IRequirementAnswer } from '../../../models/IRequirementAnswer';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormIconButton } from '../../../Workbench/Components/Form/FormIconButton';
import theme from '../../../theme';

interface IProps {
  item: ISliderQuestion;
}

const QuestionSpecificationSlider = ({ item }: IProps) => {
  const { t } = useTranslation();
  const { control } = useFormContext<IRequirementAnswer>();

  const useMinValue = useWatch({ name: 'question.config.min', control });
  const useMaxValue = useWatch({ name: 'question.config.max', control });

  const useMinScore = useWatch({
    name: 'question.config.scoreValues.0.score',
    control
  });
  const useMaxScore = useWatch({
    name: 'question.config.scoreValues.1.score',
    control
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'question.config.scoreValues'
  });

  useEffect(() => {
    update(0, { value: useMinValue, score: useMinScore });
  }, [useMinValue, useMinScore, update]);

  useEffect(() => {
    update(1, { value: useMaxValue, score: useMaxScore });
  }, [useMaxValue, useMaxScore, update]);

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
          placeholder={t('Minimum')}
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
        <Typography variant={'sm'}>
          {t('Minimum')}: {item.config.min}
        </Typography>
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
        <Typography variant={'sm'}>
          {t('Maximum')}: {item.config.max}
        </Typography>
      </Grid>
      <Grid item xs={20}>
        <Typography variant={'smBold'}>Evaluering:</Typography>
      </Grid>
      {fields.map((scoreValue, id) => {
        console.log(scoreValue);
        return (
          <Grid
            item
            container
            key={scoreValue.id}
            xs={20}
            columns={20}
            sx={{
              display: 'flex',
              alignItems: 'center',
              paddingTop: 1
            }}
          >
            <Grid item xs={8}>
              {id < 2 ? (
                <Typography variant={'smBold'}>{scoreValue.value}</Typography>
              ) : (
                <HorizontalTextCtrl
                  name={
                    `question.config.scoreValues.${id}.value` as 'question.config.scoreValues.0.value'
                  }
                  placeholder={t('Value')}
                  type={'number'}
                />
              )}
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
            {id > 1 && (
              <FormIconButton
                hoverColor={theme.palette.errorRed.main}
                onClick={() => remove(id)}
                sx={{ marginLeft: 2, cursor: 'pointer' }}
              >
                <DeleteIcon />
              </FormIconButton>
            )}
          </Grid>
        );
      })}
      <Grid item>
        <Button
          variant="primary"
          sx={{ marginTop: 2 }}
          onClick={() => append({ value: useMinValue, score: 0 })}
        >
          {t('Add new value score')}
        </Button>
      </Grid>
    </Grid>
  );
};

export default QuestionSpecificationSlider;
