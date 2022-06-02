import React from 'react';
import { Box, Typography } from '@mui/material/';
import { FormDeleteBox } from './FormDeleteBox';
import { t } from 'i18next';

import theme from '../../theme';
import { FormTextButton } from './FormTextButton';

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
        <Typography variant={'mdBold'} sx={{ color: theme.palette.white.main }}>
          {infoText} {canBeDeleted ? t('Wish to delete') : ''}
        </Typography>
        {canBeDeleted && (
          <FormTextButton
            disableRipple={true}
            type="submit"
            aria-label={t('Delete')}
            onClick={onDelete}
            sx={{ marginLeft: 'auto' }}
          >
            {t('Delete')}
          </FormTextButton>
        )}
        <FormTextButton
          disableRipple={true}
          onClick={handleClose}
          aria-label={t('Cancel')}
          sx={!canBeDeleted ? { marginLeft: 'auto' } : {}}
        >
          {t('Cancel')}
        </FormTextButton>
      </Box>

      {children}
    </FormDeleteBox>
  );
}
