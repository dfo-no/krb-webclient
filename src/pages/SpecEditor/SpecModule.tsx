import React from 'react';

import SpecEditor from './SpecEditor';
import { SpecificationProvider } from './SpecificationContext';

export default function SpecModule(): React.ReactElement {
  return (
    <SpecificationProvider>
      <SpecEditor />
    </SpecificationProvider>
  );
}
