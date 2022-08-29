import React from 'react';

import ResponseEditor from './ResponseEditor';
import { ProductIndexProvider } from '../../components/ProductIndexContext/ProductIndexContext';

export default function ResponseModule(): React.ReactElement {
  return (
    <ProductIndexProvider>
      <ResponseEditor />
    </ProductIndexProvider>
  );
}
