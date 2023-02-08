import React from 'react';
import { Box, Typography } from '@mui/material/';
import { t } from 'i18next';

import { FormDeleteBox } from './FormDeleteBox';
import theme from '../../theme';
import { FormTextButton } from './FormTextButton';

interface IProps {
  children: React.ReactNode;
  canBeDeleted: boolean;
  infoText: string;
  handleCancel: () => void;
  onDelete?: () => void;
}

export default function DeleteFrame({
  children,
  canBeDeleted,
  infoText,
  handleCancel,
  onDelete = () => {},
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
          marginLeft: 1,
        }}
      >
        <Typography variant={'mdBold'} sx={{ color: theme.palette.white.main }}>
          {infoText} {canBeDeleted ? t('Wish to delete') : ''}
        </Typography>
        {canBeDeleted && (
          <FormTextButton
            type="submit"
            aria-label={t('Delete')}
            onClick={onDelete}
            sx={{ marginLeft: 'auto' }}
          >
            {t('Delete')}
          </FormTextButton>
        )}
        <FormTextButton
          onClick={handleCancel}
          aria-label={t('common.Cancel')}
          sx={!canBeDeleted ? { marginLeft: 'auto' } : {}}
        >
          {t('common.Cancel')}
        </FormTextButton>
      </Box>

      {children}
    </FormDeleteBox>
  );
}
