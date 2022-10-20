import Dialog from '@mui/material/Dialog/Dialog';
import DialogContent from '@mui/material/DialogContent';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { Box } from '@mui/material';

import theme from '../../theme';

interface IProps {
  title?: string;
  isOpen: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  scroll?: 'body' | 'paper' | undefined;
}

const useStyles = makeStyles({
  dfoDialogContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.gray100.main,
    paddingTop: 35,
    paddingBottom: 35,
    overflow: 'visible',
  },
});

const DFODialog = ({
  children,
  isOpen,
  handleClose,
  scroll = 'body',
}: IProps) => {
  const classes = useStyles();

  return (
    <Box>
      <Dialog
        scroll={scroll}
        open={isOpen}
        onClose={handleClose}
        maxWidth="xl"
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              marginBottom: 10,
            },
          },
        }}
      >
        <DialogContent className={classes.dfoDialogContent}>
          {children}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default DFODialog;
