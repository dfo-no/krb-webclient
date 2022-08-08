/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import produce from 'immer';

import { ModelType } from '../../enums';
import { IBank } from '../entities/IBank';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { ISpecification } from '../entities/ISpecification';
import { ISpecificationProduct } from '../../models/ISpecificationProduct';

export default class SpecificationStoreService {
  private static specification: ISpecification;

  public setSpecification(specification: ISpecification): void {
    SpecificationStoreService.specification = specification;
  }

  public getSpecification(): ISpecification {
    return SpecificationStoreService.specification;
  }

  public static generateDefaultSpecification(): ISpecification {
    return {
      id: '',
      bank: {
        id: '',
        title: '',
        description: '',
        needs: [],
        products: [],
        codelist: [],
        tags: [],
        version: 0,
        type: ModelType.bank,
        publications: [],
        inheritedBanks: [],
        publishedDate: null,
        sourceOriginal: null,
        sourceRel: null,
        projectId: null,
        deletedDate: null
      },
      title: '',
      organization: '',
      organizationNumber: '',
      products: [],
      requirements: [],
      requirementAnswers: []
    };
  }

  public static getSpecificationFromBank(bank: IBank): ISpecification {
    return {
      id: '',
      bank,
      title: '',
      organization: '',
      organizationNumber: '',
      products: [],
      requirements: [],
      requirementAnswers: []
    };
  }

  public editTitle(title: string): void {
    SpecificationStoreService.specification = produce(
      SpecificationStoreService.specification,
      (draft) => {
        draft.title = title;
      }
    );
  }

  public addSpecificationProduct(product: ISpecificationProduct): void {
    SpecificationStoreService.specification = produce(
      SpecificationStoreService.specification,
      (draft) => {
        draft.products.push(product);
      }
    );
  }

  public editSpecificationProduct(product: ISpecificationProduct): void {
    const index = SpecificationStoreService.specification.products.findIndex(
      (specificationproduct: ISpecificationProduct) =>
        specificationproduct.id === product.id
    );
    SpecificationStoreService.specification = produce(
      SpecificationStoreService.specification,
      (draft) => {
        draft.products[index] = product;
      }
    );
  }

  public deleteSpecificationProduct(product: ISpecificationProduct): void {
    const index = SpecificationStoreService.specification.products.findIndex(
      (specificationproduct: ISpecificationProduct) =>
        specificationproduct.id === product.id
    );
    SpecificationStoreService.specification = produce(
      SpecificationStoreService.specification,
      (draft) => {
        draft.products.splice(index, 1);
      }
    );
  }

  addRequirement(requirement: string): void {
    const index =
      SpecificationStoreService.specification.requirements.findIndex(
        (element) => element === requirement
      );
    SpecificationStoreService.specification.products[index].requirements.push(
      requirement
    );
  }

  removeRequirement(requirement: string): void {
    const index =
      SpecificationStoreService.specification.requirements.findIndex(
        (element) => element === requirement
      );
    SpecificationStoreService.specification.products[index].requirements.splice(
      index,
      1
    );
  }

  addSpecificationProductRequirement(
    requirement: string,
    productId: string
  ): void {
    const index = SpecificationStoreService.specification.products.findIndex(
      (product) => product.id === productId
    );
    SpecificationStoreService.specification.products[index].requirements.push(
      requirement
    );
  }

  removeSpecificationProductRequirement(
    requirement: string,
    productId: string
  ): void {
    const productIndex =
      SpecificationStoreService.specification.products.findIndex(
        (product) => product.id === productId
      );
    const index =
      SpecificationStoreService.specification.requirements.findIndex(
        (req) => req === requirement
      );
    SpecificationStoreService.specification.products[
      productIndex
    ].requirements.splice(index, 1);
  }

  addProductAnswer(answer: IRequirementAnswer, productId: string): void {
    const index = SpecificationStoreService.specification.products.findIndex(
      (product) => product.id === productId
    );
    SpecificationStoreService.specification.products[
      index
    ].requirementAnswers.push(answer);
  }

  editProductAnswer(answer: IRequirementAnswer, productId: string): void {
    const index = SpecificationStoreService.specification.products.findIndex(
      (product) => product.id === productId
    );
    const answerIndex = SpecificationStoreService.specification.products[
      index
    ].requirementAnswers.findIndex(
      (element) => element.variantId === answer.variantId
    );
    SpecificationStoreService.specification.products[index].requirementAnswers[
      answerIndex
    ] = answer;
  }

  deleteProductAnswer(answer: IRequirementAnswer, productId: string): void {
    const index = SpecificationStoreService.specification.products.findIndex(
      (product) => product.id === productId
    );
    const answerIndex = SpecificationStoreService.specification.products[
      index
    ].requirementAnswers.findIndex(
      (element) => element.variantId === answer.variantId
    );
    SpecificationStoreService.specification.products[
      index
    ].requirementAnswers.splice(answerIndex, 1);
  }

  addAnswer(answer: IRequirementAnswer): void {
    SpecificationStoreService.specification.requirementAnswers.push(answer);
  }

  editAnswer(answer: IRequirementAnswer): void {
    const answerIndex =
      SpecificationStoreService.specification.requirementAnswers.findIndex(
        (element) => element.variantId === answer.variantId
      );
    SpecificationStoreService.specification.requirementAnswers[answerIndex] =
      answer;
  }

  deleteAnswer(answer: IRequirementAnswer): void {
    const answerIndex =
      SpecificationStoreService.specification.requirementAnswers.findIndex(
        (element) => element.variantId === answer.variantId
      );
    SpecificationStoreService.specification.requirementAnswers.splice(
      answerIndex,
      1
    );
  }
}
