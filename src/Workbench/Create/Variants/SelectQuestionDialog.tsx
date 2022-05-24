import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { QuestionVariant } from '../../../enums';

interface IProps {
  isOpen: boolean;
  selectedValue: QuestionVariant;
  onClose: (value: QuestionVariant) => void;
}

const SelectQuestionDialog = ({ onClose, selectedValue, isOpen }: IProps) => {
  const { t } = useTranslation();
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: QuestionVariant) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <DialogContent>
        <DialogTitle>Velg svar type</DialogTitle>
        <List sx={{ pt: 0 }}>
          {(
            Object.keys(QuestionVariant) as Array<keyof typeof QuestionVariant>
          ).map((key) => (
            <ListItem
              value={key}
              key={key}
              onClick={() => handleListItemClick(QuestionVariant[key])}
            >
              {t(key)}
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default SelectQuestionDialog;
