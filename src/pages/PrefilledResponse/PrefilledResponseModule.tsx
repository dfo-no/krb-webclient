import React from 'react';

import PrefilledResponseEditor from './PrefilledResponseEditor';
import { PrefilledResponseContainer } from './PrefilledResponseContext';

export default function PrefilledResponseModule(): React.ReactElement {
  return (
    <PrefilledResponseContainer.Provider>
      <PrefilledResponseEditor />
    </PrefilledResponseContainer.Provider>
  );
}
