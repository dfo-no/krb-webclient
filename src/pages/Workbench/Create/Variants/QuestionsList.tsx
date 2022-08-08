import DeleteIcon from '@mui/icons-material/Delete';
import React, { ReactElement, useState } from 'react';
import { Button, Card, Typography } from '@mui/material';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import css from './Variant.module.scss';
import QuestionConfig from './QuestionConfig';
import QuestionService from '../../../../Nexus/services/QuestionService';
import SelectQuestionDialog from './SelectQuestionDialog';
import VariantType from '../../../../Nexus/entities/VariantType';
import { FlexColumnBox } from '../../../../components/FlexBox/FlexColumnBox';
import { FormIconButton } from '../../../../components/Form/FormIconButton';
import { IVariant } from '../../../../Nexus/entities/IVariant';
import { QuestionVariant } from '../../../../enums';

interface IProps {
  variant?: IVariant;
}

interface ISelected {
  variant: QuestionVariant | null;
}

const defaultSelectedVariant: ISelected = {
  variant: null
};

const QuestionsList = ({ variant }: IProps): ReactElement => {
  const { t } = useTranslation();
  const { control } = useFormContext<IVariant>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions`
  });

  const [isOpen, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultSelectedVariant);

  const handleClickOpen = (): void => {
    setOpen(true);
    setSelectedValue(defaultSelectedVariant);
  };

  const handleClose = (value: QuestionVariant | null): void => {
    setOpen(false);
    setSelectedValue({ variant: value });

    if (value !== null) {
      const questionService = new QuestionService();
      const result = questionService.getQuestion(value);
      if (result) {
        append(result);
      }
    }
  };

  const hasResponseType = (): boolean => {
    return variant?.type !== VariantType.requirement && fields.length > 0;
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
                    hoverColor={'var(--error-color)'}
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
        selectedValue={selectedValue.variant}
        isOpen={isOpen}
        onClose={handleClose}
      />
    </FlexColumnBox>
  );
};

export default QuestionsList;
