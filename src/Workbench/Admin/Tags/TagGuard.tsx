import TagPage from './TagPage';
import { EditableProvider } from '../../Components/EditableContext';

export default function TagGuard(): React.ReactElement {
  return (
    <EditableProvider>
      <TagPage />
    </EditableProvider>
  );
}
