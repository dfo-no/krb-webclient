import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { IInheritedBank } from '../../../models/IInheritedBank';
import theme from '../../../theme';

export interface IProps {
  bank: IInheritedBank;
}

const useStyles = makeStyles({
  bankItem: {
    width: '100%',
    height: 70
  },
  titleOptions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    borderBottom: `1px solid ${theme.palette.black.main}`,
    paddingBottom: 6,
    marginRight: 30
  },
  titleVersion: {
    display: 'flex',
    gap: 5
  },
  endContainer: {
    display: 'flex'
  },
  closeIcon: {
    color: theme.palette.gray700.main,
    fontSize: '28px'
  },
  description: { paddingTop: 5 }
});

export default function InheritanceBankHeader({
  bank
}: IProps): React.ReactElement {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Box className={classes.bankItem}>
      <Box className={classes.titleOptions}>
        <Box className={classes.titleVersion}>
          <Typography variant="mdBold">{bank.title}; </Typography>
          <Typography variant="md">{t('version')}</Typography>
        </Box>
        <Box className={classes.endContainer}>
          <CloseIcon className={classes.closeIcon} />
        </Box>
      </Box>
      <Box className={classes.description}>
        <Typography variant="sm">{bank.description}</Typography>
      </Box>
    </Box>
  );
}
