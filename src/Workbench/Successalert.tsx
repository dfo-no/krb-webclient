import React, { ReactElement } from 'react';
import Alert from 'react-bootstrap/esm/Alert';

interface IProps {
  toggleShow: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
}

export default function SuccessAlert({
  toggleShow,
  type
}: IProps): ReactElement {
  return (
    <Alert
      variant="success"
      onClose={() => toggleShow(false)}
      dismissible
      className="mt-2 mb-2"
    >
      <p>Success! The {type} was created and added to the list</p>
    </Alert>
  );
}
