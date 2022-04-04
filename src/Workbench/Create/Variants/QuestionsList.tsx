import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import QuestionEnum from '../../../models/QuestionEnum';
import QuestionService from '../../../Nexus/services/QuestionService';
import { IVariant } from '../../../Nexus/entities/IVariant';
import SelectQuestionDialog from './SelectQuestionDialog';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormIconButton } from '../../Components/Form/FormIconButton';
import theme from '../../../theme';

const QuestionsList = () => {
  const { t } = useTranslation();
  const { control } = useFormContext<IVariant>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions`
  });

  const [isOpen, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(QuestionEnum.Q_TEXT);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: QuestionEnum) => {
    setOpen(false);
    setSelectedValue(value);
    const questionService = new QuestionService();
    const result = questionService.getQuestion(value);
    if (result) {
      append(result);
    }
  };

  return (
    <>
      {fields.map((item, index) => {
        return (
          <Card key={item.id}>
            <CardHeader
              title={t(item.type)}
              action={
                <FormIconButton
                  hoverColor={theme.palette.errorRed.main}
                  onClick={() => remove(index)}
                  sx={{ marginLeft: 'auto' }}
                >
                  <DeleteIcon />
                </FormIconButton>
              }
            />
          </Card>
        );
      })}
      <Button sx={{ mt: 1 }} variant="contained" onClick={handleClickOpen}>
        Lag ny svartype
      </Button>
      <SelectQuestionDialog
        selectedValue={selectedValue}
        isOpen={isOpen}
        onClose={handleClose}
      />
    </>
  );
};

export default QuestionsList;
