import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import React from 'react';
import { useTranslation } from 'react-i18next';
import QuestionEnum from '../../../models/QuestionEnum';

interface IProps {
  isOpen: boolean;
  selectedValue: QuestionEnum;
  onClose: (value: QuestionEnum) => void;
}

const SelectQuestionDialog = ({ onClose, selectedValue, isOpen }: IProps) => {
  const { t } = useTranslation();
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: QuestionEnum) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <DialogContent>
        <DialogTitle>Velg svar type</DialogTitle>
        <List sx={{ pt: 0 }}>
          {(Object.keys(QuestionEnum) as Array<keyof typeof QuestionEnum>).map(
            (key) => (
              <ListItem
                value={key}
                key={key}
                onClick={() => handleListItemClick(QuestionEnum[key])}
              >
                {t(key)}
              </ListItem>
            )
          )}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default SelectQuestionDialog;
