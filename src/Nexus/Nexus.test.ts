// import { BaseTagSchema } from './entities/ITag';
import Nexus from './Nexus';
import ProjectService from './services/ProjectService';
import PublicationService from './services/PublicationService';

describe('Nexus', () => {
  it('Can instanciate Nexus', () => {
    const nexus = Nexus.getInstance();
    expect(nexus).toBeDefined();

    expect(nexus).toBeInstanceOf(Nexus);
  });

  it('Nexus can provide a service', () => {
    const nexus = Nexus.getInstance();
    expect(nexus.publicationService).toBeInstanceOf(PublicationService);
  });

  // it('Nexus can generate tag in tagService based on self-generated defaultValues', () => {
  //   const nexus = Nexus.getInstance();
  //   const tag = {
  //     ...nexus.tagService.generateTag(
  //       nexus.tagService.generateDefaultTaglistValues(
  //         'b3f7f5ac-c22d-4e71-a06a-8951a2d864f2'
  //       )
  //     ),
  //     title: 'Title',
  //   };
  //   const report = BaseTagSchema.validate(tag);

  //   expect(report.error).toBeUndefined();
  // });

  it('Nexus can create project, set bank in store and add a need', () => {
    const nexus = Nexus.getInstance();
    const projectDefaultValues = ProjectService.defaultProject();
    nexus.projectService.setProject(projectDefaultValues);
    const need = nexus.needService.generateDefaultNeedValues(
      projectDefaultValues.id
    );
    nexus.needService.add(need);
    const result = nexus.projectService.getProject();
    expect(result.needs).toContain(need);
  });

  it('Nexus can create project, set bank in store and add a codelist with a code', () => {
    const nexus = Nexus.getInstance();
    const projectDefaultValues = ProjectService.defaultProject();
    nexus.projectService.setProject(projectDefaultValues);
    const codelist = nexus.codelistService.createCodelistWithId(
      nexus.codelistService.generateDefaultCodelistValues(
        projectDefaultValues.id
      )
    );
    nexus.codelistService.addCodelist(codelist);
    const code = nexus.codelistService.createCodeWithId(
      nexus.codelistService.generateDefaultCodeValues(projectDefaultValues.id)
    );
    nexus.codelistService.addCode(code, codelist.id);
    const result = nexus.projectService.getProject();
    expect(result.codelist[0].codes).toContain(code);
  });

  it('Nexus can save and load bank using adapter', () => {
    const nexus = Nexus.getInstance();
    const projectDefaultValues = ProjectService.defaultProject();
    nexus.projectService.setProject(projectDefaultValues);
    const need = nexus.needService.generateDefaultNeedValues(
      projectDefaultValues.id
    );
    nexus.needService.add(need);
    nexus.save();
    return nexus.load().then((result) => {
      const storageBank = nexus.projectService.getProject();

      expect(result).toEqual(storageBank);
    });
  });
});
