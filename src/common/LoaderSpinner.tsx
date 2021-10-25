import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

interface IProps {
  variant?: string;
}

export default function LoaderSpinner({ variant }: IProps): React.ReactElement {
  return (
    <div className="SpinnerContainer">
      <Spinner animation="border" variant={variant} />
    </div>
  );
}

LoaderSpinner.defaultProps = {
  variant: 'primary'
};
