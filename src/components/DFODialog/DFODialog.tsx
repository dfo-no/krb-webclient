import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@mui/material/Dialog/Dialog';
import DialogTitle from '@mui/material/DialogTitle/DialogTitle';

interface IProps {
  title: string;
  isOpen: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const DFODialog = ({ title, children, isOpen, handleClose }: IProps) => {
  return (
    <Dialog maxWidth="md" fullWidth={true} open={isOpen} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default DFODialog;
