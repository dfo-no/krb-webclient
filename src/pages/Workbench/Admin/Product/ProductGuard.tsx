import ProductPage from './ProductPage';
import { EditableProvider } from '../../../../components/EditableContext/EditableContext';

export default function ProductGuard(): React.ReactElement {
  return (
    <EditableProvider>
      <ProductPage />
    </EditableProvider>
  );
}
