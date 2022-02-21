import React from 'react';
import { Box, IconButton } from '@mui/material/';
import { makeStyles } from '@material-ui/core';
import TextCtrl from '../../../FormProvider/TextCtrl';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { FormProvider, useForm } from 'react-hook-form';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { joiResolver } from '@hookform/resolvers/joi';
import {
  addCodelist,
  putSelectedProjectThunk
} from '../../../store/reducers/project-reducer';
import { IAlert } from '../../../models/IAlert';
import { v4 as uuidv4 } from 'uuid';
import { addAlert } from '../../../store/reducers/alert-reducer';
import theme from '../../../theme';
import {
  ICodelist,
  PostCodelistSchema
} from '../../../Nexus/entities/ICodelist';
import Nexus from '../../../Nexus/Nexus';

const useStyles = makeStyles({
  codeItem: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 8
  },
  inputBox: {
    display: 'flex',
    paddingRight: 8
  },
  iconButton: {
    display: 'flex',
    marginLeft: 'auto',
    justifySelf: 'flex-end',
    alignSelf: 'center',
    '& .MuiSvgIcon-root': {
      cursor: 'pointer',
      color: theme.palette.gray500.main,
      width: 32,
      height: 32,
      '&:hover': {
        color: theme.palette.dfoLightBlue.main
      }
    }
  }
});

interface IProps {
  handleClose: (newCodelist: ICodelist | null) => void;
}

export default function NewCodelistForm({
  handleClose
}: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const { project } = useAppSelector((state) => state.project);
  const classes = useStyles();
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
        <Box className={classes.codeItem}>
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
