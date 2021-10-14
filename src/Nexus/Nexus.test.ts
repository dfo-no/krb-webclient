import { PutTagSchema } from '../models/Tag';
import Nexus from './Nexus';
import PublicationService from './services/PublicationService';

describe('Nexus', () => {
  it('Can instanciate Nexus', () => {
    const nexus = Nexus.getInstance();
    expect(nexus).toBeDefined();

    expect(nexus).toBeInstanceOf(Nexus);
  });

  it('Nexus can provide a service', () => {
    const nexus = Nexus.getInstance();
    const service = nexus.getPublicationService();
    expect(service).toBeInstanceOf(PublicationService);
  });

  it('Nexus can generate tag in tagService based on self-generated defaultValues', () => {
    const nexus = Nexus.getInstance();
    const service = nexus.getTagService();
    const tag = service.generateTag(
      service.generateDefaultTaglistValues(
        '123456789123456789123456789012345678'
      )
    );
    const report = PutTagSchema.validate(tag);

    expect(report.error).toBeUndefined();
  });
  it('Nexus can create project, set bank in store and add a need', () => {
    const nexus = Nexus.getInstance();
    const projectservice = nexus.getProjectService();
    const needservice = nexus.getNeedService();
    const projectDefaultValues = projectservice.generateDefaultProjectValues();
    nexus.setProject(projectDefaultValues);
    const need = needservice.generateDefaultNeedValues(projectDefaultValues.id);
    needservice.addNeed(need);
    const result = nexus.getProject();
    expect(result.needs).toContain(need);
  });
});
