import React from 'react';

import PrefilledResponseEditor from './PrefilledResponseEditor';
import { ProductIndexProvider } from '../../components/ProductIndexContext/ProductIndexContext';
import { PrefilledResponseContainer } from './PrefilledResponseContext';

export default function PrefilledResponseModule(): React.ReactElement {
  return (
    <PrefilledResponseContainer.Provider>
      <ProductIndexProvider>
        <PrefilledResponseEditor />
      </ProductIndexProvider>
    </PrefilledResponseContainer.Provider>
  );
}
