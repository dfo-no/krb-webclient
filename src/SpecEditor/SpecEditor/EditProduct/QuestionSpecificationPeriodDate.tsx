import { Box, Button, styled, Typography } from '@mui/material';
import { t } from 'i18next';
import DateCtrl from '../../../FormProvider/DateCtrl';
import VerticalTextCtrl from '../../../FormProvider/VerticalTextCtrl';
import { FormIconButton } from '../../../Workbench/Components/Form/FormIconButton';
import theme from '../../../theme';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import CheckboxCtrl from '../../../FormProvider/CheckboxCtrl';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { IRequirementAnswer } from '../../../models/IRequirementAnswer';

const FieldBox = styled(Box)(() => ({
  width: 200
}));

const QuestionSpecificationPeriodDate = () => {
  const [isPeriod, setIsPeriod] = useState(false);
  const { control } = useFormContext<IRequirementAnswer>();
  const useIsPeriod = useWatch({
    name: 'question.config.isPeriod',
    control
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'question.config.dateScores'
  });

  const renderDeleteAdornment = (index: number) => {
    return (
      <FormIconButton
        onClick={() => remove(index)}
        hoverColor={theme.palette.errorRed.main}
        sx={{
          display: 'flex',
          cursor: 'pointer',
          color: theme.palette.primary.main
        }}
      >
        <DeleteIcon />
      </FormIconButton>
    );
  };

  useEffect(() => {
    if (!useIsPeriod) {
      setIsPeriod(false);
      return;
    }

    setIsPeriod(true);
  }, [useIsPeriod]);

  return (
    <Box
      sx={{
        display: 'flex'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          alignSelf: 'center'
        }}
      >
        <Box>
          <CheckboxCtrl
            label="Periode"
            variant="blue"
            name="question.config.isPeriod"
          />
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
              {t('From/to date')}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <FieldBox>
              <DateCtrl label={t('From')} name="question.config.fromBoundary" />
            </FieldBox>
            <FieldBox>
              <DateCtrl label={t('To')} name="question.config.toBoundary" />
            </FieldBox>
          </Box>
        </Box>
        {isPeriod && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: 422
              }}
            >
              <Typography variant="smBold" sx={{ alignSelf: 'center' }}>
                {t('Period')}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <FieldBox>
                <VerticalTextCtrl
                  name="question.config.periodMin"
                  label={t('Minimum')}
                />
              </FieldBox>
              <FieldBox>
                <VerticalTextCtrl
                  name="question.config.periodMax"
                  label={t('Maximum')}
                />
              </FieldBox>
            </Box>
          </Box>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: 422
            }}
          >
            {fields.length !== 0 && (
              <Typography variant="smBold" sx={{ alignSelf: 'center' }}>
                {t('Date scores')}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3
            }}
          >
            {fields.map((field, index) => {
              return (
                <Box
                  sx={{
                    display: 'flex'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 3
                    }}
                  >
                    <FieldBox>
                      <DateCtrl
                        label={t('From')}
                        name={`question.config.dateScores.${index}.date`}
                      />
                    </FieldBox>
                    <FieldBox sx={{ width: 232 }}>
                      <VerticalTextCtrl
                        name={`question.config.dateScores.${index}.score`}
                        label={t('Score')}
                        type={'number'}
                        endAdornment={renderDeleteAdornment(index)}
                      />
                    </FieldBox>
                  </Box>
                </Box>
              );
            })}
            <Button
              variant="primary"
              sx={{ width: 200 }}
              onClick={() => append({ score: 0, date: null })}
            >
              {t('add datescore')}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionSpecificationPeriodDate;
