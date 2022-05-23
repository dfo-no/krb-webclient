import DeleteIcon from '@mui/icons-material/Delete';
import makeStyles from '@mui/styles/makeStyles';
import React, { useState } from 'react';
import { Box, Button, Card, Divider, Typography } from '@mui/material';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import QuestionConfig from './QuestionConfig';
import QuestionService from '../../../Nexus/services/QuestionService';
import SelectQuestionDialog from './SelectQuestionDialog';
import theme from '../../../theme';
import { FormIconButton } from '../../Components/Form/FormIconButton';
import { IVariant } from '../../../Nexus/entities/IVariant';
import { QuestionVariant } from '../../../enums';

const useStyles = makeStyles({
  list: {
    border: `1px solid ${theme.palette.black.main}`,
    backgroundColor: theme.palette.gray100.main,
    padding: 32,
    marginBottom: 16
  }
});

const QuestionsList = () => {
  const { t } = useTranslation();
  const { control } = useFormContext<IVariant>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions`
  });
  const classes = useStyles();

  const [isOpen, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(QuestionVariant.Q_TEXT);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: QuestionVariant) => {
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
      <Button
        sx={{ marginBottom: 1, marginRight: 'auto' }}
        variant="contained"
        onClick={handleClickOpen}
      >
        Lag ny svartype
      </Button>
      <Box className={classes.list}>
        {fields.map((item, index) => {
          return (
            <Card key={item.id} sx={{ margin: 1, padding: 1 }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', margin: 2 }}>
                <Typography variant={'smBold'}>
                  {t(QuestionVariant[item.type])}
                </Typography>
                <FormIconButton
                  hoverColor={theme.palette.errorRed.main}
                  onClick={() => remove(index)}
                  sx={{ marginLeft: 'auto', paddingRight: 2 }}
                >
                  <DeleteIcon />
                </FormIconButton>
              </Box>
              <Divider />
              <QuestionConfig item={item} index={index} />
            </Card>
          );
        })}
      </Box>
      <SelectQuestionDialog
        selectedValue={selectedValue}
        isOpen={isOpen}
        onClose={handleClose}
      />
    </>
  );
};

export default QuestionsList;
