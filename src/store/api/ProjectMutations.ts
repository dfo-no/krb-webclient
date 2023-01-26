// import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
// import { SerializedError } from '@reduxjs/toolkit';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { createContainer } from 'unstated-next';

import DateService from '../../Nexus/services/DateService';
import Utils from '../../common/Utils';
import { IRouteProjectParams } from '../../models/IRouteProjectParams';
import {
  Code,
  Codelist,
  Need,
  Product,
  ProjectForm,
  PublicationForm,
  Requirement,
  RequirementVariant,
  useDeleteProject,
  useFindOneProject,
  usePostProduct,
  usePutProject,
} from '../../api/openapi-fetch';
// import { useGetProjectQuery, usePutProjectMutation } from './bankApi';

type BankOrError = { data: ProjectForm };
// | { error: FetchBaseQueryError | SerializedError };

const useSelectContext = () => {
  const { projectId } = useParams<IRouteProjectParams>();
  const { project } = useFindOneProject(projectId);
  const { putProject } = usePutProject(projectId);
  const { deleteProject } = useDeleteProject(projectId);
  const { postProduct } = usePostProduct(projectId);

  // PROJECT
  // async function deleteProject(projectToDelete: ProjectForm): Promise<BankOrError> {
  //   if (projectToDelete) {
  //     return putProject({
  //       ...projectToDelete,
  //       deletedDate: DateService.getNowString(),
  //     });
  //   }
  //   throw Error('Cant save changes to Project');
  // }

  // PUBLICATIONS
  async function deletePublication(
    publicationToDelete: PublicationForm,
    publicationBank?: ProjectForm
  ): Promise<BankOrError> {
    if (project && publicationBank && publicationToDelete) {
      const now = DateService.getNowString();
      await putProject({
        ...publicationBank,
        deletedDate: now,
      }).catch(() => {
        throw Error('Cant delete Publication');
      });

      const editedPublications = Utils.replaceElementInList(
        { ...publicationToDelete, deletedDate: now },
        project.publications
      );

      return putProject({ ...project, publications: editedPublications });
    }
    throw Error('Cant delete Publication');
  }

  // PRODUCTS
  async function addProduct(product: Product): Promise<unknown> {
    if (project) {
      return postProduct(product);
    }
    throw Error('Cant save changes to Project');
  }

  async function editProduct(product: Product): Promise<BankOrError> {
    if (project) {
      const editedProducts = Utils.replaceElementInList(
        product,
        project.products
      );
      return putProject({ ...project, products: editedProducts });
    }
    throw Error('Cant save changes to Project');
  }

  async function deleteProduct(product: Product): Promise<BankOrError> {
    if (project) {
      return editProduct({
        ...product,
        deletedDate: DateService.getNowString(),
      });
    }
    throw Error('Cant save changes to Project');
  }

  async function editProducts(products: Product[]): Promise<BankOrError> {
    if (project) {
      return putProject({ ...project, products: products });
    }
    throw Error('Cant save changes to Project');
  }

  // CODELISTS
  async function addCodelist(codelist: Codelist): Promise<BankOrError> {
    if (project) {
      const editedCodelists = Utils.addElementToList(
        codelist,
        project.codelist
      );
      return putProject({ ...project, codelist: editedCodelists });
    }
    throw Error('Cant save changes to Project');
  }

  async function editCodelist(codelist: Codelist): Promise<BankOrError> {
    if (project) {
      const editedCodelists = Utils.replaceElementInList(
        codelist,
        project.codelist
      );
      return putProject({ ...project, codelist: editedCodelists });
    }
    throw Error('Cant save changes to Project');
  }

  async function deleteCodelist(codelist: Codelist): Promise<BankOrError> {
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
  async function addCode(code: Code, codelist: Codelist): Promise<BankOrError> {
    if (project) {
      const editedCodes = Utils.addElementToList(code, codelist.codes);
      return editCodelist({ ...codelist, codes: editedCodes });
    }
    throw Error('Cant save changes to Project');
  }

  async function editCode(
    code: Code,
    codelist: Codelist
  ): Promise<BankOrError> {
    if (project) {
      const editedCodes = Utils.replaceElementInList(code, codelist.codes);
      return editCodelist({ ...codelist, codes: editedCodes });
    }
    throw Error('Cant save changes to Project');
  }

  async function deleteCode(
    code: Code,
    codelist: Codelist
  ): Promise<BankOrError> {
    if (project) {
      const editedCodes = Utils.removeElementFromList(code, codelist.codes);
      return editCodelist({ ...codelist, codes: editedCodes });
    }
    throw Error('Cant save changes to Project');
  }

  async function editCodes(
    codes: Code[],
    codelist: Codelist
  ): Promise<BankOrError> {
    if (project) {
      return editCodelist({ ...codelist, codes: codes });
    }
    throw Error('Cant save changes to Project');
  }

  // NEEDS
  async function addNeed(need: Need): Promise<BankOrError> {
    if (project) {
      const editedNeeds = Utils.addElementToList(need, project.needs);
      return putProject({ ...project, needs: editedNeeds });
    }
    throw Error('Cant save changes to Project');
  }

  async function editNeed(need: Need): Promise<BankOrError> {
    if (project) {
      const editedNeeds = Utils.replaceElementInList(need, project.needs);
      return putProject({ ...project, needs: editedNeeds });
    }
    throw Error('Cant save changes to Project');
  }

  async function deleteNeed(need: Need): Promise<BankOrError> {
    if (project) {
      const editedNeeds = Utils.removeElementFromList(need, project.needs);
      return putProject({ ...project, needs: editedNeeds });
    }
    throw Error('Cant save changes to Project');
  }

  async function editNeeds(needs: Need[]): Promise<BankOrError> {
    if (project) {
      return putProject({ ...project, needs: needs });
    }
    throw Error('Cant save changes to Project');
  }

  // REQUIREMENTS
  async function addRequirement(
    requirement: Requirement,
    need: Need
  ): Promise<BankOrError> {
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
    requirement: Requirement,
    need: Need
  ): Promise<BankOrError> {
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
    requirement: Requirement,
    need: Need
  ): Promise<BankOrError> {
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
    variant: RequirementVariant,
    requirement: Requirement,
    need: Need
  ): Promise<BankOrError> {
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
    variant: RequirementVariant,
    requirement: Requirement,
    need: Need
  ): Promise<BankOrError> {
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
    variant: RequirementVariant,
    requirement: Requirement,
    need: Need
  ): Promise<BankOrError> {
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
    deleteProject,
    deletePublication,
    addProduct,
    editProduct,
    deleteProduct,
    editProducts,
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
    deleteVariant,
  };
};

export const ProjectMutationContextContainer =
  createContainer(useSelectContext);
export const useProjectMutationState =
  ProjectMutationContextContainer.useContainer;
export const ProjectMutationProvider = ProjectMutationContextContainer.Provider;
