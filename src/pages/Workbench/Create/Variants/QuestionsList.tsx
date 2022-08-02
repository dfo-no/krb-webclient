import DeleteIcon from '@mui/icons-material/Delete';
import React, { ReactElement, useState } from 'react';
import { Button, Card, Typography } from '@mui/material';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import css from './Variant.module.scss';
import QuestionConfig from './QuestionConfig';
import QuestionService from '../../../../Nexus/services/QuestionService';
import SelectQuestionDialog from './SelectQuestionDialog';
import theme from '../../../../theme';
import { FlexColumnBox } from '../../../../components/FlexBox/FlexColumnBox';
import { FormIconButton } from '../../../../components/Form/FormIconButton';
import { IVariant } from '../../../../Nexus/entities/IVariant';
import { QuestionVariant } from '../../../../enums';

const QuestionsList = (): ReactElement => {
  const { t } = useTranslation();
  const { control } = useFormContext<IVariant>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions`
  });

  const [isOpen, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(QuestionVariant.Q_TEXT);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (value: QuestionVariant): void => {
    setOpen(false);
    setSelectedValue(value);
    const questionService = new QuestionService();
    const result = questionService.getQuestion(value);
    if (result) {
      append(result);
    }
  };

  const hasResponseType = (): boolean => {
    return fields.length > 0;
  };

  return (
    <FlexColumnBox>
      <Button
        className={hasResponseType() ? css.Disabled : undefined}
        disabled={hasResponseType()}
        sx={{ marginBottom: 1, marginRight: 'auto' }}
        variant="primary"
        onClick={handleClickOpen}
      >
        {t('Create response type')}
      </Button>

      {fields.length > 0 && (
        <div className={css.QuestionList}>
          {fields.map((item, index) => {
            return (
              <Card className={css.Card} key={item.id}>
                <div className={css.Content}>
                  <Typography variant={'smBold'}>{t(item.type)}</Typography>
                  <FormIconButton
                    className={css.IconButton}
                    hoverColor={theme.palette.errorRed.main}
                    onClick={() => remove(index)}
                  >
                    <DeleteIcon />
                  </FormIconButton>
                </div>
                <QuestionConfig item={item} index={index} />
              </Card>
            );
          })}
        </div>
      )}

      <SelectQuestionDialog
        selectedValue={selectedValue}
        isOpen={isOpen}
        onClose={handleClose}
      />
    </FlexColumnBox>
  );
};

export default QuestionsList;
