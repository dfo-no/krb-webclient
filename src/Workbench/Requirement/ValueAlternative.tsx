import React, { ReactElement, useState } from 'react';
import { Card } from 'react-bootstrap';
import { ValueAlternative } from '../../models/Alternatives';

interface IProps {
  alternative: ValueAlternative;
}

export default function Value({ alternative }: IProps): ReactElement {
  return (
    <Card>
      <Card.Body>
        <p>{alternative.type}</p>
      </Card.Body>
    </Card>
  );
}
