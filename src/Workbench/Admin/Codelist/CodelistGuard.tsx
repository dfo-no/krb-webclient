import CodelistPage from './CodelistPage';
import { SelectProvider } from './SelectContext';

export default function CodelistGuard(): React.ReactElement {
  return (
    <SelectProvider>
      <CodelistPage />
    </SelectProvider>
  );
}
