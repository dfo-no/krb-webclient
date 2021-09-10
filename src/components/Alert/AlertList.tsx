import React, { ReactElement } from 'react';
import { useAppSelector } from '../../store/hooks';
import AlertElement from './Alert';

export default function AlertList(): ReactElement {
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
