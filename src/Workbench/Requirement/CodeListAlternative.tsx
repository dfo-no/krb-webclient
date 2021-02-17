import React, { ReactElement, useState } from 'react';
import { Card } from 'react-bootstrap';
import { CodelistAlternative } from '../../models/Alternatives';

interface IProps {
  alternative: CodelistAlternative;
}

export default function CodeListAlternative({
  alternative
}: IProps): ReactElement {
  return (
    <Card>
      <Card.Body>
        <p>{alternative.type}</p>
      </Card.Body>
    </Card>
  );
}
