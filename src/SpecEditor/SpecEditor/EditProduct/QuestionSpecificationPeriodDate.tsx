import { Box, Button, Grid, styled, Typography } from '@mui/material';
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
import HorizontalTextCtrl from '../../../FormProvider/HorizontalTextCtrl';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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
        display: 'flex',
        margin: '0 auto',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 3
      }}
    >
      <Box sx={{ display: 'flex', margin: '0 auto' }}>
        <Typography variant="smBold">Fra/til dato</Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, width: '90%', margin: '0 auto' }}>
        <DateCtrl label="Fra" name={'name'} />
        <DateCtrl label="Til" name={'name'} />
      </Box>
      <Box sx={{ display: 'flex', margin: '0 auto' }}>
        <Typography variant="smBold">Periode</Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, width: '90%', margin: '0 auto' }}>
        <VerticalTextCtrl
          label="Minimum"
          placeholder="0"
          name="Hei2"
          type={'number'}
        />
        <VerticalTextCtrl
          label="Maximum"
          placeholder="1"
          name="Hei2"
          type={'number'}
        />
      </Box>
      <Box sx={{ display: 'flex', margin: '0 auto' }}>
        <Typography variant="smBold">Date scores</Typography>
      </Box>
      {fields.map((scoreValue, id) => {
        return (
          <Box sx={{ display: 'flex', gap: 2, width: '90%', margin: '0 auto' }}>
            <DateCtrl label={''} name={'name'} />
            <DateCtrl label={''} name={'name'} />
          </Box>
        );
      })}

      <Button
        variant="primary"
        sx={{ width: 200, display: 'flex', margin: '0 auto' }}
        onClick={() => append({})}
      >
        {t('Add new value score')}
      </Button>
    </Box>
  );
};

export default QuestionSpecificationPeriodDate;
