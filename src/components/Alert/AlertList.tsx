import React from 'react';
import { useAppSelector } from '../../store/hooks';
import AlertElement from './AlertElement';

export default function AlertList(): React.ReactElement {
  const { list } = useAppSelector((state) => state.alert);
  return (
    <>
      {!!list.length &&
        list.map((alert) => {
          return <AlertElement alert={alert} key={alert.id} />;
        })}
    </>
  );
}
