import React from 'react';
import { Box, Typography } from '@mui/material/';
import { t } from 'i18next';

import theme from '../../theme';
import { FormDeleteBox } from './FormDeleteBox';
import { FormTextButton } from './FormTextButton';

interface IProps {
  children: React.ReactElement;
  activated?: boolean;
  canBeDeleted: boolean;
  infoText: string;
  handleClose: () => void;
  onDelete?: () => void;
}

export function DeleteFrame({
  children,
  activated = true,
  canBeDeleted,
  infoText,
  handleClose,
  onDelete = () => {},
}: IProps): React.ReactElement {
  if (!children) {
    return <></>;
  } else if (!activated) {
    return children;
  } else {
    return (
      <FormDeleteBox
        boxColor={
          canBeDeleted
            ? theme.palette.errorRed.main
            : theme.palette.gray500.main
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
          <Typography
            variant={'mdBold'}
            sx={{ color: theme.palette.white.main }}
          >
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
            onClick={handleClose}
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
}
