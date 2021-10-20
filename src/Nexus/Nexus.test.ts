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
    needservice.add(need);
    const result = nexus.getProject();
    expect(result.needs).toContain(need);
  });

  it('Nexus can create project, set bank in store and add a codelist with a code', () => {
    const nexus = Nexus.getInstance();
    const projectservice = nexus.getProjectService();
    const codelistservice = nexus.getCodelistService();
    const projectDefaultValues = projectservice.generateDefaultProjectValues();
    nexus.setProject(projectDefaultValues);
    const codelist = codelistservice.createCodelistWithId(
      codelistservice.generateDefaultCodelistValues(projectDefaultValues.id)
    );
    codelistservice.addCodelist(codelist);
    const code = codelistservice.createCodeWithId(
      codelistservice.generateDefaultCodeValues(projectDefaultValues.id)
    );
    codelistservice.addCode(code, codelist.id);
    const result = nexus.getProject();
    expect(result.codelist[0].codes).toContain(code);
  });
});
