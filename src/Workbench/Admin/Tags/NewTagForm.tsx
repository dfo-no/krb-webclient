import { joiResolver } from '@hookform/resolvers/joi';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import TextCtrl from '../../../FormProvider/TextCtrl';
import { IAlert } from '../../../models/IAlert';
import { ITag, PostTagSchema } from '../../../Nexus/entities/ITag';
import Nexus from '../../../Nexus/Nexus';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import {
  addTag,
  putSelectedProjectThunk
} from '../../../store/reducers/project-reducer';

interface IProps {
  handleClose: () => void;
}

const useStyles = makeStyles({
  tagFormContainer: {
    display: 'flex',
    flexDirection: 'column',
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

export default function NewTagForm({
  handleClose
}: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const { project } = useAppSelector((state) => state.project);
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();

  const classes = useStyles();

  const defaultValues = nexus.tagService.generateDefaultTaglistValues(
    project.id
  );

  const methods = useForm<ITag>({
    resolver: joiResolver(PostTagSchema),
    defaultValues
  });

  const saveValues = (post: any) => {
    const newTag = nexus.tagService.generateTag(post);
    const alert: IAlert = {
      id: uuidv4(),
      style: 'success',
      text: 'Successfully added tag'
    };
    dispatch(addTag(newTag));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      dispatch(addAlert({ alert }));
      handleClose();
    });
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(saveValues)}>
          <Box className={classes.tagFormContainer}>
            <Box className={classes.tagFormTextFields}>
              <TextCtrl name="title" label={t('Title')} />
            </Box>

            <Box className={classes.tagFormButtons}>
              <Button variant="primary" type="submit">
                {t('save')}
              </Button>
              <Button variant="warning" onClick={handleClose}>
                {t('cancel')}
              </Button>
            </Box>
          </Box>
        </form>
      </FormProvider>
    </>
  );
}
