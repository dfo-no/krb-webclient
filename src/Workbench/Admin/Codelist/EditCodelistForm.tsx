import { joiResolver } from '@hookform/resolvers/joi';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import TextCtrl from '../../../FormProvider/TextCtrl';
import { IAlert } from '../../../models/IAlert';
import { useAppDispatch } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import {
  editSelectedCodelist,
  putSelectedProjectThunk
} from '../../../store/reducers/project-reducer';
import {
  ICodelist,
  PutCodelistSchema
} from '../../../Nexus/entities/ICodelist';
import { Box, IconButton } from '@mui/material/';
import { makeStyles } from '@material-ui/core';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import theme from '../../../theme';

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
  element: ICodelist;
  handleClose: (newCodelist: ICodelist | null) => void;
}

function EditCodelistForm({
  element,
  handleClose
}: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const { t } = useTranslation();

  const methods = useForm<ICodelist>({
    defaultValues: element,
    resolver: joiResolver(PutCodelistSchema)
  });

  const onSubmit = (put: ICodelist) => {
    dispatch(editSelectedCodelist(put));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully edited codelist'
      };
      dispatch(addAlert({ alert }));
      handleClose(put);
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

export default EditCodelistForm;
