import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import React from 'react';
import { useTranslation } from 'react-i18next';

import css from './Variant.module.scss';
import { QuestionVariant } from '../../../../enums';

interface IProps {
  isOpen: boolean;
  selectedValue: QuestionVariant;
  onClose: (value: QuestionVariant) => void;
}

const SelectQuestionDialog = ({ onClose, selectedValue, isOpen }: IProps) => {
  const { t } = useTranslation();

  const handleClose = (): void => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: QuestionVariant): void => {
    onClose(value);
  };

  return (
    <Dialog className={css.Dialog} onClose={handleClose} open={isOpen}>
      <DialogContent>
        <DialogTitle>{t('DialogTitle-Select-Response-Type')}</DialogTitle>
        <List className={css.DialogList}>
          {(
            Object.keys(QuestionVariant) as Array<keyof typeof QuestionVariant>
          ).map((key) => (
            <ListItem
              className={css.ListItem}
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
