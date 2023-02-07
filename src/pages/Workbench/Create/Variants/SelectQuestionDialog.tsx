import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useTranslation } from 'react-i18next';

import css from './Variant.module.scss';
import { QuestionVariant } from '../../../../Nexus/enums';

interface Props {
  isOpen: boolean;
  selectedValue: QuestionVariant | null;
  onClose: (value: QuestionVariant | null) => void;
}

const SelectQuestionDialog = ({ onClose, selectedValue, isOpen }: Props) => {
  const { t } = useTranslation();

  const handleClose = (): void => {
    onClose(selectedValue ?? null);
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
            Object.keys(QuestionVariant).filter(
              (value) => value != QuestionVariant.Q_FILEUPLOAD
            ) as Array<keyof typeof QuestionVariant>
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
