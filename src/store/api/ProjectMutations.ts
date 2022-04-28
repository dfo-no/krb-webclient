import { useParams } from 'react-router-dom';
import Utils from '../../common/Utils';
import { Parentable } from '../../models/Parentable';
import { ICode } from '../../Nexus/entities/ICode';
import { ICodelist } from '../../Nexus/entities/ICodelist';
import { IProduct } from '../../Nexus/entities/IProduct';
import { ITag } from '../../Nexus/entities/ITag';
import { IRouteParams } from '../../Workbench/Models/IRouteParams';
import { useGetProjectQuery, usePutProjectMutation } from './bankApi';
import { INeed } from '../../Nexus/entities/INeed';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { IVariant } from '../../Nexus/entities/IVariant';
import DateService from '../../Nexus/services/DateService';

function useProjectMutations() {
  const { projectId } = useParams<IRouteParams>();
  const { data: project } = useGetProjectQuery(projectId);
  const [putProject] = usePutProjectMutation();

  // PRODUCTS
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

  async function deleteProduct(product: Parentable<IProduct>) {
    if (project) {
      return editProduct({
        ...product,
        deletedDate: DateService.getNowString()
      });
    }
    throw Error('Cant save changes to Project');
  }

  async function editProducts(products: Parentable<IProduct>[]) {
    if (project) {
      return putProject({ ...project, products: products });
    }
    throw Error('Cant save changes to Project');
  }

  // TAGS
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

  // CODELISTS
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

  async function deleteCodelist(codelist: ICodelist) {
    if (project) {
      const editedCodelists = Utils.removeElementFromList(
        codelist,
        project.codelist
      );
      return putProject({ ...project, codelist: editedCodelists });
    }
    throw Error('Cant save changes to Project');
  }

  // CODES
  async function addCode(code: Parentable<ICode>, codelist: ICodelist) {
    if (project) {
      const editedCodes = Utils.addElementToList(code, codelist.codes);
      return editCodelist({ ...codelist, codes: editedCodes });
    }
    throw Error('Cant save changes to Project');
  }

  async function editCode(code: Parentable<ICode>, codelist: ICodelist) {
    if (project) {
      const editedCodes = Utils.replaceElementInList(code, codelist.codes);
      return editCodelist({ ...codelist, codes: editedCodes });
    }
    throw Error('Cant save changes to Project');
  }

  async function deleteCode(code: Parentable<ICode>, codelist: ICodelist) {
    if (project) {
      const editedCodes = Utils.removeElementFromList(code, codelist.codes);
      return editCodelist({ ...codelist, codes: editedCodes });
    }
    throw Error('Cant save changes to Project');
  }

  async function editCodes(codes: Parentable<ICode>[], codelist: ICodelist) {
    if (project) {
      return editCodelist({ ...codelist, codes: codes });
    }
    throw Error('Cant save changes to Project');
  }

  // NEEDS
  async function addNeed(need: Parentable<INeed>) {
    if (project) {
      const editedNeeds = Utils.addElementToList(need, project.needs);
      return putProject({ ...project, needs: editedNeeds });
    }
    throw Error('Cant save changes to Project');
  }

  async function editNeed(need: Parentable<INeed>) {
    if (project) {
      const editedNeeds = Utils.replaceElementInList(need, project.needs);
      return putProject({ ...project, needs: editedNeeds });
    }
    throw Error('Cant save changes to Project');
  }

  async function deleteNeed(need: Parentable<INeed>) {
    if (project) {
      const editedNeeds = Utils.removeElementFromList(need, project.needs);
      return putProject({ ...project, needs: editedNeeds });
    }
    throw Error('Cant save changes to Project');
  }

  async function editNeeds(needs: Parentable<INeed>[]) {
    if (project) {
      return putProject({ ...project, needs: needs });
    }
    throw Error('Cant save changes to Project');
  }

  // REQUIREMENTS
  async function addRequirement(
    requirement: IRequirement,
    need: Parentable<INeed>
  ) {
    if (project) {
      const editedRequirements = Utils.addElementToList(
        requirement,
        need.requirements
      );
      return editNeed({ ...need, requirements: editedRequirements });
    }
    throw Error('Cant save changes to Project');
  }

  async function editRequirement(
    requirement: IRequirement,
    need: Parentable<INeed>
  ) {
    if (project) {
      const editedRequirements = Utils.replaceElementInList(
        requirement,
        need.requirements
      );
      return editNeed({ ...need, requirements: editedRequirements });
    }
    throw Error('Cant save changes to Project');
  }

  async function deleteRequirement(
    requirement: IRequirement,
    need: Parentable<INeed>
  ) {
    if (project) {
      const editedRequirements = Utils.removeElementFromList(
        requirement,
        need.requirements
      );
      return editNeed({ ...need, requirements: editedRequirements });
    }
    throw Error('Cant save changes to Project');
  }

  // VARIANTS
  async function addVariant(
    variant: IVariant,
    requirement: IRequirement,
    need: Parentable<INeed>
  ) {
    if (project) {
      const editedVariants = Utils.addElementToList(
        variant,
        requirement.variants
      );
      return editRequirement(
        { ...requirement, variants: editedVariants },
        need
      );
    }
    throw Error('Cant save changes to Project');
  }

  async function editVariant(
    variant: IVariant,
    requirement: IRequirement,
    need: Parentable<INeed>
  ) {
    if (project) {
      const editedVariants = Utils.replaceElementInList(
        variant,
        requirement.variants
      );
      return editRequirement(
        { ...requirement, variants: editedVariants },
        need
      );
    }
    throw Error('Cant save changes to Project');
  }

  async function deleteVariant(
    variant: IVariant,
    requirement: IRequirement,
    need: Parentable<INeed>
  ) {
    if (project) {
      const editedVariants = Utils.removeElementFromList(
        variant,
        requirement.variants
      );
      return editRequirement(
        { ...requirement, variants: editedVariants },
        need
      );
    }
    throw Error('Cant save changes to Project');
  }

  return {
    addProduct,
    editProduct,
    deleteProduct,
    editProducts,
    addTag,
    editTag,
    deleteTag,
    editTags,
    addCodelist,
    editCodelist,
    deleteCodelist,
    addCode,
    editCode,
    deleteCode,
    editCodes,
    addNeed,
    editNeed,
    deleteNeed,
    editNeeds,
    addRequirement,
    editRequirement,
    deleteRequirement,
    addVariant,
    editVariant,
    deleteVariant
  };
}

export default useProjectMutations;
