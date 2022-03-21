import { useParams } from 'react-router-dom';
import Utils from '../../common/Utils';
import { Parentable } from '../../models/Parentable';
import { ICode } from '../../Nexus/entities/ICode';
import { ICodelist } from '../../Nexus/entities/ICodelist';
import { IProduct } from '../../Nexus/entities/IProduct';
import { ITag } from '../../Nexus/entities/ITag';
import { IRouteParams } from '../../Workbench/Models/IRouteParams';
import { useGetProjectQuery, usePutProjectMutation } from './bankApi';

function useProjectMutations() {
  const { projectId } = useParams<IRouteParams>();
  const { data: project } = useGetProjectQuery(projectId);
  const [putProject] = usePutProjectMutation();

  async function addProduct(product: Parentable<IProduct>) {
    if (project) {
      const editedProducts = Utils.addElementToList(product, project.products);
      return putProject({ ...project, products: editedProducts });
    }
    throw Error('Cant save changes to Project');
  }

  async function editProduct(product: Parentable<IProduct>) {
    if (project) {
      const editedProducts = Utils.replaceElementInList(
        product,
        project.products
      );
      return putProject({ ...project, products: editedProducts });
    }
    throw Error('Cant save changes to Project');
  }

  async function editProducts(products: Parentable<IProduct>[]) {
    if (project) {
      return putProject({ ...project, products: products });
    }
    throw Error('Cant save changes to Project');
  }

  async function addTag(tag: Parentable<ITag>) {
    if (project) {
      const editedTags = Utils.addElementToList(tag, project.tags);
      return putProject({ ...project, tags: editedTags });
    }
    throw Error('Cant save changes to Project');
  }

  async function editTag(tag: Parentable<ITag>) {
    if (project) {
      const editedTags = Utils.replaceElementInList(tag, project.tags);
      return putProject({ ...project, tags: editedTags });
    }
    throw Error('Cant save changes to Project');
  }

  async function deleteTag(tag: Parentable<ITag>) {
    if (project) {
      const editedTags = Utils.removeElementFromList(tag, project.tags);
      return putProject({ ...project, tags: editedTags });
    }
    throw Error('Cant save changes to Project');
  }

  async function editTags(tags: Parentable<ITag>[]) {
    if (project) {
      return putProject({ ...project, tags: tags });
    }
    throw Error('Cant save changes to Project');
  }

  async function addCodelist(codelist: ICodelist) {
    if (project) {
      const editedCodelists = Utils.addElementToList(
        codelist,
        project.codelist
      );
      return putProject({ ...project, codelist: editedCodelists });
    }
    throw Error('Cant save changes to Project');
  }

  async function editCodelist(codelist: ICodelist) {
    if (project) {
      const editedCodelists = Utils.replaceElementInList(
        codelist,
        project.codelist
      );
      return putProject({ ...project, codelist: editedCodelists });
    }
    throw Error('Cant save changes to Project');
  }

  async function editCodelists(codelists: ICodelist[]) {
    if (project) {
      return putProject({ ...project, codelist: codelists });
    }
    throw Error('Cant save changes to Project');
  }

  async function addCode(code: Parentable<ICode>, codelist: ICodelist) {
    if (project) {
      const editedCodes = Utils.addElementToList(code, codelist.codes);
      return editCodelist({ ...codelist, codes: editedCodes });
    }
    throw Error('Cant save changes to Project');
  }

  async function editCode(code: Parentable<ICode>, codelist: ICodelist) {
    if (project) {
      const editableCodes = Utils.replaceElementInList(code, codelist.codes);
      return editCodelist({ ...codelist, codes: editableCodes });
    }
    throw Error('Cant save changes to Project');
  }

  async function editCodes(codes: Parentable<ICode>[], codelist: ICodelist) {
    if (project) {
      return editCodelist({ ...codelist, codes: codes });
    }
    throw Error('Cant save changes to Project');
  }

  return {
    addProduct,
    editProduct,
    editProducts,
    addTag,
    editTag,
    deleteTag,
    editTags,
    addCodelist,
    editCodelist,
    editCodelists,
    addCode,
    editCode,
    editCodes
  };
}

export default useProjectMutations;
