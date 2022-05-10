import { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Typography
} from '@mui/material';
import { DFOCheckbox } from '../../../components/DFOCheckbox/DFOCheckbox';
import VerticalTextCtrl from '../../../FormProvider/VerticalTextCtrl';
import { ICodelistQuestion } from '../../../Nexus/entities/ICodelistQuestion';
import { useAppSelector } from '../../../store/hooks';
import { ICodelist } from '../../../Nexus/entities/ICodelist';
import QuestionSpecificationCodelistPicker from './QuestionSpecificationCodelistPicker';
import { DFORadioButton } from '../../../components/DFORadioButton/DFORadioButton';
import theme from '../../../theme';
import { useTranslation } from 'react-i18next';
import { useFormContext, useWatch } from 'react-hook-form';
import { IRequirementAnswer } from '../../../models/IRequirementAnswer';

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

  const { t } = useTranslation();

  const { control, setValue } = useFormContext<IRequirementAnswer>();

  const useMandatoryCodes = useWatch({
    name: 'question.config.mandatoryCodes',
    control
  });

  const useOptionalCodes = useWatch({
    name: 'question.config.optionalCodes',
    control
  });

  const [showOptionalCodes, setShowOptionalCodes] = useState(false);
  const [showMandatoryCodes, setShowMandatoryCodes] = useState(false);

  const [showSelectedCodes, setShowSelectedCodes] = useState(false);
  const [radiogroupValue, setRadiogroupValue] = useState('allCodes');

  useEffect(() => {
    if (useMandatoryCodes.length > 0) {
      setShowMandatoryCodes(true);
    }
  }, [useMandatoryCodes]);

  useEffect(() => {
    if (useOptionalCodes.length > 0) {
      if (codelist && useOptionalCodes.length < codelist?.codes.length) {
        setShowSelectedCodes(true);
        setRadiogroupValue('pickedCodes');
      }

      setShowOptionalCodes(true);
    }
  }, [useOptionalCodes, codelist]);

  if (!codelist) return <></>;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadiogroupValue((event.target as HTMLInputElement).value);

    if (event.target.value === 'pickedCodes') {
      setShowSelectedCodes(true);
      setValue('question.config.optionalCodes', []);
    } else {
      setShowSelectedCodes(false);
      setValue(
        'question.config.optionalCodes',
        codelist.codes.map((code) => code.id)
      );
    }
  };

  const onOptionalCodesClick = () => {
    if (showOptionalCodes) {
      setValue('question.config.optionalCodes', []);
    } else {
      setValue(
        'question.config.optionalCodes',
        codelist.codes.map((code) => code.id)
      );
      setShowSelectedCodes(false);
      setRadiogroupValue('allCodes');
    }
    setShowOptionalCodes((prev) => !prev);
  };

  const onMandatoryCodesClick = () => {
    if (showMandatoryCodes) {
      setValue('question.config.mandatoryCodes', []);
    }

    setShowMandatoryCodes((prev) => !prev);
  };

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
            variant="blue"
            value={showMandatoryCodes}
            onClick={onMandatoryCodesClick}
          />
          <Typography variant={'smBold'}>{t('Obligatory codes')}</Typography>
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
          variant="blue"
          value={showOptionalCodes}
          onClick={onOptionalCodesClick}
        />
        <Typography variant={'smBold'}>{t('Optional codes')}</Typography>
      </Box>
      {showOptionalCodes && (
        <Box
          sx={{
            display: 'flex',
            paddingTop: 3,
            paddingLeft: 3,
            paddingRight: 3,
            flexDirection: 'column',
            justifyItems: 'center'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}
          >
            <VerticalTextCtrl
              name={'question.config.optionalCodeMinAmount'}
              label={t('Minimum')}
              placeholder={''}
              type={'number'}
            />
            <VerticalTextCtrl
              name={'question.config.optionalCodeMaxAmount'}
              label={t('Maksimum')}
              placeholder={''}
              type={'number'}
            />
          </Box>
          <FormControl sx={{ paddingTop: 2 }}>
            <RadioGroup value={radiogroupValue} onChange={handleChange}>
              <FormControlLabel
                value="allCodes"
                control={
                  <DFORadioButton radioColor={theme.palette.primary.main} />
                }
                label={String(t('All codes'))}
              />
              <FormControlLabel
                value="pickedCodes"
                control={
                  <DFORadioButton radioColor={theme.palette.primary.main} />
                }
                label={String(t('Chosen codes'))}
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
