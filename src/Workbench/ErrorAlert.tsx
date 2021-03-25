import React, { ReactElement } from 'react';
import Alert from 'react-bootstrap/Alert';
import Fade from 'react-bootstrap/Fade';

interface IProps {
  toggleShow: React.Dispatch<React.SetStateAction<boolean>>;
  alertText: string;
}

export default function ErrorAlert({
  toggleShow,
  alertText
}: IProps): ReactElement {
  return (
    <Alert
      variant="error"
      onClose={() => toggleShow(false)}
      dismissible
      className="mt-2 mb-2"
      transition={Fade}
    >
      <p>{alertText}</p>
    </Alert>
  );
}
