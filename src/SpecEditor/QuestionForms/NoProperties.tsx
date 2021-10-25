import React from 'react';
import Card from 'react-bootstrap/Card';

export default function NoProperties(): React.ReactElement {
  return (
    <Card>
      <Card.Body>
        <h6>This alternative has no configurable properties</h6>
      </Card.Body>
    </Card>
  );
}
