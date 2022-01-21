import Alert from '@mui/material/Alert/Alert';
import Snackbar from '@mui/material/Snackbar/Snackbar';
import React, { useEffect } from 'react';
import { IAlert } from '../../models/IAlert';
import { useAppDispatch } from '../../store/hooks';
import { removeAlert } from '../../store/reducers/alert-reducer';

interface IProps {
  alert: IAlert;
}
export default function AlertElement({ alert }: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeAlert({ id: alert.id }));
    }, 2000);
    return () => clearTimeout(timer);
  });

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      onClose={() => dispatch(removeAlert({ id: alert.id }))}
    >
      <Alert severity={alert.style}>{alert.text}</Alert>
    </Snackbar>
  );
}
