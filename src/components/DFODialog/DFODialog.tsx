import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog/Dialog';
import { Box, DialogTitle } from '@mui/material';
import theme from '../../theme';
import makeStyles from '@mui/styles/makeStyles';

interface IProps {
  title: string;
  isOpen: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const useStyles = makeStyles({
  dfoDialog: {
    backgroundColor: theme.palette.gray200.main,
    border: `2px solid ${theme.palette.primary.main}`
  },
  dialogTitle: {
    color: theme.palette.primary.main
  }
});

const DFODialog = ({ title, children, isOpen, handleClose }: IProps) => {
  const classes = useStyles();

  return (
    <Dialog fullWidth={true} open={isOpen} onClose={handleClose}>
      <DialogContent className={classes.dfoDialog}>
        <DialogTitle className={classes.dialogTitle}>{title}</DialogTitle>
        <Box>{children}</Box>
      </DialogContent>
    </Dialog>
  );
};

export default DFODialog;
