import { joiResolver } from '@hookform/resolvers/joi';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import Utils from '../../common/Utils';
import { default as QE } from '../../models/QuestionEnum';
import { QuestionBaseSchema } from '../../Nexus/entities/IQuestionBase';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { ITextQuestion } from '../../Nexus/entities/ITextQuestion';

interface IProps {
  index: number;
  handleClose: () => void;
}

const NewQuestionForm = ({ index, handleClose }: IProps) => {
  const { t } = useTranslation();

  const [type, setType] = React.useState<QE>(QE.Q_TEXT);

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as QE);
  };

  const { append } = useFieldArray({
    name: `variants.${index}.questions` as 'variants.0.questions'
  });

  const addQuestion = () => {
    let retVal = '';
    const uuid = uuidv4();
    switch (type) {
      case QE.Q_TIME:
        retVal = QE.Q_TIME;
        break;
      case QE.Q_TEXT:
        const q: ITextQuestion = {
          id: uuid,
          type: QE.Q_TEXT,
          config: {
            max: 10000,
            defaultPoint: 1
          },
          answer: {
            point: 0,
            text: ''
          },
          sourceRel: null,
          sourceOriginal: null
        };
        append(q);
        handleClose();
        console.log('append');
        break;
      case QE.Q_SLIDER:
        retVal = QE.Q_SLIDER;
        break;
      case QE.Q_PERIOD_DATE:
        retVal = QE.Q_PERIOD_DATE;
        break;
      case QE.Q_FILEUPLOAD:
        retVal = QE.Q_FILEUPLOAD;
        break;
      case QE.Q_CODELIST:
        retVal = QE.Q_CODELIST;
        break;
      case QE.Q_CHECKBOX:
        retVal = QE.Q_CHECKBOX;
        break;
      default:
        Utils.assertUnreachable(type);
    }
    return retVal;
  };

  return (
    <form autoComplete="off" noValidate>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Type"
          onChange={handleChange}
        >
          {(Object.keys(QE) as Array<keyof typeof QE>).map((key, i) => (
            <MenuItem value={key} key={key}>
              {t(key)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="primary" onClick={() => addQuestion()}>
        {t('save')}
      </Button>
      <Button variant="warning" onClick={handleClose}>
        {t('cancel')}
      </Button>
    </form>
  );
};

export default NewQuestionForm;
