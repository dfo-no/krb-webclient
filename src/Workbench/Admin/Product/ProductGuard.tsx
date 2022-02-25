import React from 'react';
import ProductPage from './ProductPage';
import { EditableProvider } from '../../Components/EditableContext';

export default function ProductGuard(): React.ReactElement {
  return (
    <EditableProvider>
      <ProductPage />
    </EditableProvider>
  );
}
