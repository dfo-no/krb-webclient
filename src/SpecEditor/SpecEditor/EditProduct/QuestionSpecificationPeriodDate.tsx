import { Box, styled, Typography } from '@mui/material';
import HorizontalTextCtrl from '../../../FormProvider/HorizontalTextCtrl';
import SelectCtrl from '../../../FormProvider/SelectCtrl';
import VerticalTextCtrl from '../../../FormProvider/VerticalTextCtrl';
import { IOption } from '../../../Nexus/entities/IOption';
import { IPeriodDateQuestion } from '../../../Nexus/entities/IPeriodDateQuestion';

interface IProps {
  item: IPeriodDateQuestion;
}

const FieldBox = styled(Box)(() => ({
  width: 200
}));

const QuestionSpecificationPeriodDate = ({ item }: IProps) => {
  const selectOptions: IOption[] = [
    { label: 'dager', value: '1' },
    { label: 'timer', value: '2' },
    { label: 'minutter', value: '3' }
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <VerticalTextCtrl
          label="Fra"
          placeholder={''}
          type={'number'}
          name={''}
        />
        <VerticalTextCtrl
          label="Til"
          placeholder={''}
          type={'number'}
          name={''}
        />
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Typography sx={{ alignSelf: 'center' }}>Periode:</Typography>
          <FieldBox>
            <HorizontalTextCtrl placeholder={''} type={'number'} name={''} />
          </FieldBox>
          <FieldBox>
            <HorizontalTextCtrl placeholder={''} type={'number'} name={''} />
          </FieldBox>
          <FieldBox>
            <SelectCtrl name="person.cars" label={''} options={selectOptions} />
          </FieldBox>
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionSpecificationPeriodDate;
