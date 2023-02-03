import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useParams } from 'react-router-dom';

import DateService from '../../Nexus/services/DateService';
import Utils from '../../common/Utils';
import { IBank } from '../../Nexus/entities/IBank';
import { ICode } from '../../Nexus/entities/ICode';
import { ICodelist } from '../../Nexus/entities/ICodelist';
import { IProduct } from '../../Nexus/entities/IProduct';
import { IPublication } from '../../Nexus/entities/IPublication';
import { IRouteProjectParams } from '../../models/IRouteProjectParams';
import { Parentable } from '../../models/Parentable';
import { useGetProjectQuery, usePutProjectMutation } from './bankApi';

type BankOrError =
  | { data: IBank }
  | { error: FetchBaseQueryError | SerializedError };

function useProjectMutations() {
  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project } = useGetProjectQuery(projectId);
  const [putProject] = usePutProjectMutation();

  // PROJECT

  // PUBLICATIONS
  async function deletePublication(
    publicationToDelete: IPublication,
    publicationBank?: IBank
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
  async function addProduct(
    product: Parentable<IProduct>
  ): Promise<BankOrError> {
    if (project) {
      const editedProducts = Utils.addElementToList(product, project.products);
      return putProject({ ...project, products: editedProducts });
    }
    throw Error('Cant save changes to Project');
  }

  async function editProduct(
    product: Parentable<IProduct>
  ): Promise<BankOrError> {
    if (project) {
      const editedProducts = Utils.replaceElementInList(
        product,
        project.products
      );
      return putProject({ ...project, products: editedProducts });
    }
    throw Error('Cant save changes to Project');
  }

  async function deleteProduct(
    product: Parentable<IProduct>
  ): Promise<BankOrError> {
    if (project) {
      return editProduct({
        ...product,
        deletedDate: DateService.getNowString(),
      });
    }
    throw Error('Cant save changes to Project');
  }

  async function editProducts(
    products: Parentable<IProduct>[]
  ): Promise<BankOrError> {
    if (project) {
      return putProject({ ...project, products: products });
    }
    throw Error('Cant save changes to Project');
  }

  // CODELISTS
  async function addCodelist(codelist: ICodelist): Promise<BankOrError> {
    if (project) {
      const editedCodelists = Utils.addElementToList(
        codelist,
        project.codelist
      );
      return putProject({ ...project, codelist: editedCodelists });
    }
    throw Error('Cant save changes to Project');
  }

  async function editCodelist(codelist: ICodelist): Promise<BankOrError> {
    if (project) {
      const editedCodelists = Utils.replaceElementInList(
        codelist,
        project.codelist
      );
      return putProject({ ...project, codelist: editedCodelists });
    }
    throw Error('Cant save changes to Project');
  }

  async function deleteCodelist(codelist: ICodelist): Promise<BankOrError> {
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
  async function addCode(
    code: Parentable<ICode>,
    codelist: ICodelist
  ): Promise<BankOrError> {
    if (project) {
      const editedCodes = Utils.addElementToList(code, codelist.codes);
      return editCodelist({ ...codelist, codes: editedCodes });
    }
    throw Error('Cant save changes to Project');
  }

  async function editCode(
    code: Parentable<ICode>,
    codelist: ICodelist
  ): Promise<BankOrError> {
    if (project) {
      const editedCodes = Utils.replaceElementInList(code, codelist.codes);
      return editCodelist({ ...codelist, codes: editedCodes });
    }
    throw Error('Cant save changes to Project');
  }

  async function deleteCode(
    code: Parentable<ICode>,
    codelist: ICodelist
  ): Promise<BankOrError> {
    if (project) {
      const editedCodes = Utils.removeElementFromList(code, codelist.codes);
      return editCodelist({ ...codelist, codes: editedCodes });
    }
    throw Error('Cant save changes to Project');
  }

  async function editCodes(
    codes: Parentable<ICode>[],
    codelist: ICodelist
  ): Promise<BankOrError> {
    if (project) {
      return editCodelist({ ...codelist, codes: codes });
    }
    throw Error('Cant save changes to Project');
  }

  return {
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
  };
}

export default useProjectMutations;
