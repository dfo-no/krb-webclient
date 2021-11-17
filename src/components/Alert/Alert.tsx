import React, { useEffect } from 'react';
import AlertComponent from 'react-bootstrap/Alert';
import Fade from 'react-bootstrap/Fade';
import { IAlert } from '../../models/IAlert';
import { useAppDispatch } from '../../store/hooks';
import { removeAlert } from '../../store/reducers/alert-reducer';

interface IProps {
  alert: IAlert;
}
export default function AlertElement({ alert }: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeAlert({ id: alert.id }));
    }, 2000);
    return () => clearTimeout(timer);
  });

  return (
    <AlertComponent
      variant={alert.style}
      onClose={() => dispatch(removeAlert({ id: alert.id }))}
      dismissible
      className="mt-2 mb-2"
      transition={Fade}
    >
      <p>{alert.text}</p>
    </AlertComponent>
  );
}
