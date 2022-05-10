import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog/Dialog';
import theme from '../../theme';
import makeStyles from '@mui/styles/makeStyles';
import { Box } from '@mui/material';

interface IProps {
  title?: string;
  isOpen: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const useStyles = makeStyles({
  dfoDialogContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.gray100.main,
    paddingTop: 35,
    paddingBottom: 35,
    width: '50vw',
    overflow: 'hidden'
  }
});

const DFODialog = ({ children, isOpen, handleClose }: IProps) => {
  const classes = useStyles();

  return (
    <Box>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth="xl"
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              marginBottom: 30
            }
          }
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
