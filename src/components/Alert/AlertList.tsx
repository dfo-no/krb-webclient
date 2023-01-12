import React from 'react';

import { AlertsContainer } from './AlertContext';
import AlertElement from './AlertElement';

export default function AlertList(): React.ReactElement {
  const { alerts } = AlertsContainer.useContainer();
  return (
    <>
      {!!alerts.length &&
        alerts.map((alert) => {
          return <AlertElement alert={alert} key={alert.id} />;
        })}
    </>
  );
}
