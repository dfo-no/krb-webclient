import React from 'react';
import { Box, Typography } from '@mui/material/';
import { FormDeleteBox } from './FormDeleteBox';
import theme from '../../theme';
import { FormTextButton } from './FormTextButton';
import { t } from 'i18next';

interface IProps {
  children: React.ReactNode;
  canBeDeleted: boolean;
  infoText: string;
  handleClose: () => void;
  onDelete?: () => void;
}

export default function DeleteFrame({
  children,
  canBeDeleted,
  infoText,
  handleClose,
  onDelete = () => {}
}: IProps): React.ReactElement {
  return (
    <FormDeleteBox
      boxColor={
        canBeDeleted ? theme.palette.errorRed.main : theme.palette.gray500.main
      }
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          padding: 1,
          marginLeft: 1
        }}
      >
        <Typography variant={'mdBold'}>
          {infoText} {canBeDeleted ? t('Wish to delete') : ''}
        </Typography>
        {canBeDeleted && (
          <FormTextButton
            hoverColor={theme.palette.errorRed.main}
            type="submit"
            aria-label="delete"
            onClick={onDelete}
            sx={{ marginLeft: 'auto' }}
          >
            {t('Delete')}
          </FormTextButton>
        )}
        <FormTextButton
          hoverColor={theme.palette.gray500.main}
          onClick={handleClose}
          aria-label="close"
          sx={!canBeDeleted ? { marginLeft: 'auto' } : {}}
        >
          {t('Cancel')}
        </FormTextButton>
      </Box>

      {children}
    </FormDeleteBox>
  );
}
