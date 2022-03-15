import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
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
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogContent className={classes.dfoDialog}>
        <DialogTitle className={classes.dialogTitle}>{title}</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DFODialog;
