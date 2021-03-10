import React, { ReactElement } from 'react';
import Alert from 'react-bootstrap/esm/Alert';
import Fade from 'react-bootstrap/esm/Fade';

interface IProps {
  toggleShow: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
}

export default function SuccessBobbo({
  toggleShow,
  type
}: IProps): ReactElement {
  return (
    <Alert
      variant="success"
      onClose={() => toggleShow(false)}
      dismissible
      className="mt-2 mb-2"
      transition={Fade}
    >
      <p>Success! The {type} was created and added to the list</p>
    </Alert>
  );
}
