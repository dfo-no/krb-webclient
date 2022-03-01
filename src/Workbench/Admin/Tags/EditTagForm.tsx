import { joiResolver } from '@hookform/resolvers/joi';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { IAlert } from '../../../models/IAlert';
import { Nestable } from '../../../models/Nestable';
import { Parentable } from '../../../models/Parentable';
import { ITag, PutTagSchema } from '../../../Nexus/entities/ITag';
import { useAppDispatch } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import {
  editTag,
  putSelectedProjectThunk,
  removeTag
} from '../../../store/reducers/project-reducer';
import { Box, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import TextCtrl from '../../../FormProvider/TextCtrl';

interface IProps {
  element: Parentable<ITag>;
}

const useStyles = makeStyles({
  tagFormContainer: {
    display: 'flex',
    height: 200
  },
  tagForm: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    alignSelf: 'center',
    gap: 10
  },
  tagFormTextFields: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'column',
    gap: 10,
    width: '30vw',
    minWidth: '350px'
  },
  tagFormButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: 10
  }
});

export default function EditTagForm({ element }: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const methods = useForm<Parentable<ITag>>({
    resolver: joiResolver(PutTagSchema),
    defaultValues: element
  });

  const onEditTagSubmit = (post: Nestable<ITag>) => {
    const postTag = { ...post };
    if (postTag.children) {
      delete postTag.children;
    }
    if (postTag.level) {
      delete postTag.level;
    }
    const alert: IAlert = {
      id: uuidv4(),
      style: 'success',
      text: 'Successfully edited tag'
    };
    dispatch(editTag(postTag as Parentable<ITag>));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      dispatch(addAlert({ alert }));
    });
  };

  const deleteTag = () => {
    const deletableTag = { ...element };
    dispatch(removeTag(deletableTag));
    dispatch(putSelectedProjectThunk('dummy'));
    methods.reset();

    const alert: IAlert = {
      id: uuidv4(),
      style: 'success',
      text: 'Successfully edited tag'
    };
    dispatch(addAlert({ alert }));
  };

  const classes = useStyles();

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onEditTagSubmit)}>
          <Box className={classes.tagFormContainer}>
            <Box className={classes.tagForm}>
              <Box className={classes.tagFormTextFields}>
                <TextCtrl name="title" label={t('Title')} />
              </Box>
              <Box className={classes.tagFormButtons}>
                <Button variant="primary" type="submit">
                  {t('save')}
                </Button>
                <Button variant="warning" onClick={deleteTag}>
                  {t('delete')}
                </Button>
              </Box>
            </Box>
          </Box>
        </form>
      </FormProvider>
    </>
  );
}
