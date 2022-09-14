import React from 'react';

import { SpecificationProvider } from './SpecificationContext';
import SpecEditor from './SpecEditor';

export default function SpecModule(): React.ReactElement {
  return (
    <SpecificationProvider>
      <SpecEditor />
    </SpecificationProvider>
  );
}
