import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import SimpleDialog from './SimpleDialog';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
// import Dialog from '../../components/DFODialog/DFODialog';
import NewQuestionForm from './NewQuestionForm';

interface IProps {
  index: number;
}

const NewQuestion = ({ index }: IProps) => {
  const [open, setOpen] = useState(false);
  // const [open, setOpen] = React.useState(false);

  const emails = ['username@gmail.com', 'user02@gmail.com'];
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /* const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
    console.log(value);
  }; */

  return (
    <Box
      sx={{
        display: 'flex',
        m: 1,
        flexDirection: 'row-reverse'
      }}
    >
      <Button variant="primary" onClick={handleClickOpen}>
        Legg til Spørsmål
      </Button>

      {/*  <Dialog
        title="Nytt krav til behovet"
        isOpen={isOpen}
        handleClose={() => setOpen(false)}
        children={
          <NewQuestionForm index={index} handleClose={() => setOpen(false)} />
        }
      /> */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewQuestion;
