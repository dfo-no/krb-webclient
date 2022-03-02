import ProjectPage from './ProjectPage';
import { ProjectEditingProvider } from './ProjectEditingContext';

export default function ProjectGuard(): React.ReactElement {
  return (
    <ProjectEditingProvider>
      <ProjectPage />
    </ProjectEditingProvider>
  );
}
