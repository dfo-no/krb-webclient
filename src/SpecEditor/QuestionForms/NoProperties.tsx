import React, { ReactElement } from 'react';
import Card from 'react-bootstrap/Card';

export default function NoProperties(): ReactElement {
  return (
    <Card>
      <Card.Body>
        <h6>This alternative has no properties to configure</h6>
      </Card.Body>
    </Card>
  );
}
