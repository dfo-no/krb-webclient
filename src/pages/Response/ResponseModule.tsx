import React from 'react';

import ResponseEditor from './ResponseEditor';
import { ResponseProvider } from './ResponseContext';

export default function ResponseModule(): React.ReactElement {
  return (
    <ResponseProvider>
      <ResponseEditor />
    </ResponseProvider>
  );
}
