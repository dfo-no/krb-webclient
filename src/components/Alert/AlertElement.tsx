import Alert from '@mui/material/Alert/Alert';
import Snackbar from '@mui/material/Snackbar/Snackbar';
import React, { useEffect, useState } from 'react';

import { IAlert } from '../../models/IAlert';
import { AlertsContainer } from './AlertContext';

interface IProps {
  alert: IAlert;
}
export default function AlertElement({ alert }: IProps): React.ReactElement {
  const { removeAlert } = AlertsContainer.useContainer();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      removeAlert(alert.id);
    }, 2000);
    return () => clearTimeout(timer);
  });

  const handleClose = (event?: React.SyntheticEvent | Event, id?: string) => {
    if (id) {
      removeAlert(id);
    }
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
    >
      <Alert onClose={(e) => handleClose(e, alert.id)} severity={alert.style}>
        {alert.text}
      </Alert>
    </Snackbar>
  );
}
