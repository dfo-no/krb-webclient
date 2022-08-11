import React from 'react';

import PrefilledResponseEditor from './PrefilledResponseEditor';
import { ProductIndexProvider } from '../../components/ProductIndexContext/ProductIndexContext';

export default function PrefilledResponseModule(): React.ReactElement {
  return (
    <ProductIndexProvider>
      <PrefilledResponseEditor />
    </ProductIndexProvider>
  );
}
