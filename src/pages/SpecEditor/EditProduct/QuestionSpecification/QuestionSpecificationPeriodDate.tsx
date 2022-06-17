import { Button, Grid, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { ReactElement } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { t } from 'i18next';

import css from './QuestionSpecification.module.scss';
import DateCtrl from '../../../../FormProvider/DateCtrl';
import HorizontalTextCtrl from '../../../../FormProvider/HorizontalTextCtrl';
import theme from '../../../../theme';
import { FormIconButton } from '../../../../components/Form/FormIconButton';
import { IRequirementAnswer } from '../../../../models/IRequirementAnswer';

const QuestionSpecificationPeriodDate = (): ReactElement => {
  const { control } = useFormContext<IRequirementAnswer>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'question.config.dateScores'
  });

  const useFromBoundary = useWatch({
    name: 'question.config.fromBoundary',
    control
  });

  /* TODO: Enable view for period selection
  const [isPeriod, setIsPeriod] = useState(false);
  const useIsPeriod = useWatch({
    name: 'question.config.isPeriod',
    control
  });

  useEffect(() => {
    setIsPeriod(useIsPeriod);
  }, [useIsPeriod]);

  const periodGrid = (): ReactElement => {
    return (
      <Grid>
        <Grid item xs={20}>
          <CheckboxCtrl
            name={'question.config.isPeriod'}
            label={t<string>('Include to date')}
          />
        </Grid>
        <Grid item xs={20}>
          <Typography variant="smBold">{t('Period')}</Typography>
        </Grid>
        <Grid item xs={8}>
          <HorizontalTextCtrl
            placeholder={t('Minimum')}
            name={'question.config.periodMin'}
            type={'number'}
          />
        </Grid>
        <Grid item xs={1} className={css.arrow}>
          <ArrowForwardIcon />
        </Grid>
        <Grid item xs={8}>
          <HorizontalTextCtrl
            placeholder={t('Maximum')}
            name={'question.config.periodMax'}
            type={'number'}
          />
        </Grid>
      </Grid>
    );
  };
  */

  return (
    <Grid container columns={20} className={css.QuestionSpecificationGrid}>
      <Grid item xs={20}>
        <Typography variant={'smBold'}>Fra/til dato</Typography>
      </Grid>
      <Grid item xs={8}>
        <DateCtrl name={'question.config.fromBoundary'} />
      </Grid>
      <Grid item xs={1} className={css.centeredText}>
        /
      </Grid>
      <Grid item xs={8}>
        <DateCtrl name={'question.config.toBoundary'} />
      </Grid>
      <Grid item xs={20}>
        <Typography variant={'smBold'}>{t('Evaluation')}</Typography>
      </Grid>
      {fields.map((scoreValue, idx) => {
        return (
          <Grid item container key={scoreValue.id} xs={20} columns={20}>
            <Grid item xs={8}>
              <DateCtrl
                name={
                  `question.config.dateScores.${idx}.date` as 'question.config.dateScores.0.date'
                }
              />
            </Grid>
            <Grid item xs={1} className={css.arrow}>
              <ArrowForwardIcon />
            </Grid>
            <Grid item xs={8}>
              <HorizontalTextCtrl
                name={
                  `question.config.dateScores.${idx}.score` as 'question.config.dateScores.0.score'
                }
                placeholder={t('Score')}
                type={'number'}
              />
            </Grid>
            <Grid item xs={2} className={css.delete}>
              <FormIconButton
                hoverColor={theme.palette.errorRed.main}
                onClick={() => remove(idx)}
              >
                <DeleteIcon />
              </FormIconButton>
            </Grid>
          </Grid>
        );
      })}
      <Grid item xs={20}>
        <Button
          variant="primary"
          onClick={() => append({ date: useFromBoundary, score: 0 })}
        >
          {t('Add new date score')}
        </Button>
      </Grid>
    </Grid>
  );
};

export default QuestionSpecificationPeriodDate;
