import { ProjectForm } from '../../api/openapi-fetch';

export default abstract class Adapter {
  abstract save(bank: ProjectForm): void;

  abstract load(): ProjectForm;
}
