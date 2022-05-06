import { useState } from 'react';
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material';
import { DFOCheckbox } from '../../../components/DFOCheckbox/DFOCheckbox';
import VerticalTextCtrl from '../../../FormProvider/VerticalTextCtrl';
import { ICodelistQuestion } from '../../../Nexus/entities/ICodelistQuestion';
import { useAppSelector } from '../../../store/hooks';
import { ICodelist } from '../../../Nexus/entities/ICodelist';
import QuestionSpecificationCodelistPicker from './QuestionSpecificationCodelistPicker';

interface IProps {
  item: ICodelistQuestion;
}

interface ILabel {
  label: string;
  value: string;
}

const QuestionSpecificationCodelist = ({ item }: IProps) => {
  const { spec } = useAppSelector((state) => state.specification);
  const codelist = spec.bank.codelist.find((cl: ICodelist) => {
    return cl.id === item.config.codelist;
  });

  const [showOptionalCodes, setShowOptionalCodes] = useState(false);
  const [showMandatoryCodes, setShowMandatoryCodes] = useState(false);

  const [showSelectedCodes, setShowSelectedCodes] = useState(false);
  const [radiogroupValue, setRadiogroupValue] = useState('allCodes');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadiogroupValue((event.target as HTMLInputElement).value);

    if (event.target.value === 'pickedCodes') {
      setShowSelectedCodes(true);
    } else {
      setShowSelectedCodes(false);
    }
  };

  if (!codelist) return <></>;

  const codesList: ILabel[] = [];
  Object.values(codelist.codes).forEach((code, i) => {
    codesList[i] = { label: code.title, value: code.id };
  });

  const uniqueCodes = new Set();
  const filteredCodes: ILabel[] = codesList.filter((obj) => {
    const isPresentInSet = uniqueCodes.has(obj.label);
    return !isPresentInSet;
  });

  return (
    <Box>
      <Box>
        <Box>
          <DFOCheckbox
            value={showMandatoryCodes}
            onClick={() => setShowMandatoryCodes((prev) => !prev)}
          />
          <Typography variant={'smBold'}>Obligatoriske koder</Typography>
        </Box>
        {showMandatoryCodes && (
          <Box sx={{ padding: 3 }}>
            <QuestionSpecificationCodelistPicker
              codes={filteredCodes}
              name="question.config.mandatoryCodes"
            />
          </Box>
        )}
        <DFOCheckbox
          value={showOptionalCodes}
          onClick={() => setShowOptionalCodes((prev) => !prev)}
        />
        <Typography variant={'smBold'}>Valgfrie koder</Typography>
      </Box>
      {showOptionalCodes && (
        <Box>
          <Box
            sx={{
              padding: 3,
              backgroundColor: 'red',
              display: 'flex',
              flexDirection: 'column',
              justifyItems: 'center'
            }}
          >
            <VerticalTextCtrl
              name={'question.config.optionalCodeMinAmount'}
              label="Minimum"
              placeholder={''}
              type={'number'}
            />
            <VerticalTextCtrl
              name={'question.config.optionalCodeMaxAmount'}
              label="Maksimum"
              placeholder={''}
              type={'number'}
            />
          </Box>
          <FormControl>
            <RadioGroup value={radiogroupValue} onChange={handleChange}>
              <FormControlLabel
                value="allCodes"
                control={<Radio />}
                label="Alle koder"
              />
              <FormControlLabel
                value="pickedCodes"
                control={<Radio />}
                label="Utvalgte koder"
              />
            </RadioGroup>
          </FormControl>
          {showSelectedCodes && (
            <Box sx={{ padding: 3 }}>
              <QuestionSpecificationCodelistPicker
                codes={filteredCodes}
                name="question.config.optionalCodes"
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default QuestionSpecificationCodelist;
