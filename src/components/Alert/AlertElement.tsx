import MUIAlert from '@mui/material/Alert/Alert';
import Snackbar from '@mui/material/Snackbar/Snackbar';
import React, { useEffect, useState } from 'react';

import { Alert } from '../../models/Alert';
import { AlertsContainer } from './AlertContext';

interface Props {
  alert: Alert;
}
export default function AlertElement({ alert }: Props): React.ReactElement {
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
      <MUIAlert
        onClose={(e) => handleClose(e, alert.id)}
        severity={alert.style}
      >
        {alert.text}
      </MUIAlert>
    </Snackbar>
  );
}
