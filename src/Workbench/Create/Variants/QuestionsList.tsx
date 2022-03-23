import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import QuestionEnum from '../../../models/QuestionEnum';
import { IRequirement } from '../../../Nexus/entities/IRequirement';
import QuestionService from '../../../Nexus/services/QuestionService';
import SelectQuestionDialog from './SelectQuestionDialog';

interface IProps {
  index: number;
}

const QuestionsList = ({ index }: IProps) => {
  const { t } = useTranslation();
  const { control } = useFormContext<IRequirement>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `variants.${index}.questions` as 'variants.0.questions'
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
      {fields.map((item, i) => {
        return (
          <Card key={item.id}>
            <CardHeader
              title={t(item.type)}
              action={
                <IconButton aria-label="settings" onClick={() => remove(i)}>
                  <DeleteIcon color="warning" sx={{ mr: 1 }} />
                </IconButton>
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
