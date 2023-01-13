import produce from 'immer';
import { useState } from 'react';
import { createContainer } from 'unstated-next';

import { Alert as Alert } from '../../models/Alert';

const useAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const addAlert = (alert: Alert) => {
    setAlerts(
      produce(alerts, (draft) => {
        draft.unshift(alert);
      })
    );
  };

  const removeAlert = (id: string) => {
    setAlerts(
      produce(alerts, (draft) => {
        const index = draft.findIndex((alert) => alert.id === id);
        if (index !== -1) {
          draft.splice(index, 1);
        }
      })
    );
  };

  return { alerts, addAlert, removeAlert };
};

export const AlertsContainer = createContainer(useAlerts);
