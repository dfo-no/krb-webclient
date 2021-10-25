import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Fade from 'react-bootstrap/Fade';

interface IProps {
  toggleShow: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
}

export default function SuccessDeleteAlert({
  toggleShow,
  text
}: IProps): React.ReactElement {
  return (
    <Alert
      variant="success"
      onClose={() => toggleShow(false)}
      dismissible
      className="mt-2 mb-2"
      transition={Fade}
    >
      <p>{text}</p>
    </Alert>
  );
}
