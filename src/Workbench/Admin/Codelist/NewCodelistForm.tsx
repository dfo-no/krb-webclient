import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { Box, IconButton } from '@mui/material/';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { v4 as uuidv4 } from 'uuid';
import TextCtrl from '../../../FormProvider/TextCtrl';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  addCodelist,
  putSelectedProjectThunk
} from '../../../store/reducers/project-reducer';
import { addAlert } from '../../../store/reducers/alert-reducer';
import Nexus from '../../../Nexus/Nexus';
import {
  ICodelist,
  PostCodelistSchema
} from '../../../Nexus/entities/ICodelist';
import { IAlert } from '../../../models/IAlert';
import { useFormStyles } from './CodelistStyles';

interface IProps {
  handleClose: (newCodelist: ICodelist | null) => void;
}

export default function NewCodelistForm({
  handleClose
}: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const { project } = useAppSelector((state) => state.project);
  const classes = useFormStyles();
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();

  const defaultValues: ICodelist =
    nexus.codelistService.generateDefaultCodelistValues(project.id);

  const methods = useForm<ICodelist>({
    resolver: joiResolver(PostCodelistSchema),
    defaultValues
  });

  const onSubmit = (post: ICodelist) => {
    const newCodelist = nexus.codelistService.createCodelistWithId(post);
    dispatch(addCodelist(newCodelist));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully created codelist'
      };
      dispatch(addAlert({ alert }));
      methods.reset();
      handleClose(newCodelist);
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <Box className={classes.formItem}>
          <Box className={classes.inputBox}>
            <TextCtrl name="title" label={t('Title')} />
          </Box>
          <Box className={classes.inputBox}>
            <TextCtrl name="description" label={t('Description')} />
          </Box>
          <Box className={classes.iconButton}>
            <IconButton type="submit" aria-label="save">
              <CheckIcon />
            </IconButton>
          </Box>
          <Box className={classes.iconButton} aria-label="close">
            <IconButton onClick={() => handleClose(null)} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
}
