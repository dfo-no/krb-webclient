import React, { ReactElement } from 'react';
import Spinner from 'react-bootstrap/Spinner';

interface IProps {
  variant?: string;
}

export default function LoaderSpinner({ variant }: IProps): ReactElement {
  return (
    <div className="SpinnerContainer">
      <Spinner animation="border" variant={variant} />
    </div>
  );
}

LoaderSpinner.defaultProps = {
  variant: 'primary'
};
