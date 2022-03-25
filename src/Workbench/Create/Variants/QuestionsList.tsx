import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import QuestionEnum from '../../../models/QuestionEnum';
import QuestionService from '../../../Nexus/services/QuestionService';
import { IVariant } from '../../../Nexus/entities/IVariant';

interface IProps {
  variant: IVariant;
}

// TODO: Make modal to create questions
const QuestionsList = ({ variant }: IProps) => {
  const { t } = useTranslation();

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
  };

  return (
    <>
      {variant.questions.map((item) => {
        return (
          <Card key={item.id}>
            <CardHeader
              title={t(item.type)}
              action={
                <IconButton aria-label="settings" onClick={() => {}}>
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
      {/* <SelectQuestionDialog
        selectedValue={selectedValue}
        isOpen={isOpen}
        onClose={handleClose}
      />*/}
    </>
  );
};

export default QuestionsList;
