import TagPage from './TagPage';
import { EditableProvider } from '../../../../components/EditableContext/EditableContext';

export default function TagGuard(): React.ReactElement {
  return (
    <EditableProvider>
      <TagPage />
    </EditableProvider>
  );
}
