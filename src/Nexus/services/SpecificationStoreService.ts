/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import produce from 'immer';
import { Bank } from '../../models/Bank';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { Specification } from '../../models/Specification';
import { SpecificationProduct } from '../../models/SpecificationProduct';

export default class SpecificationStoreService {
  private static specification: Specification;

  public setSpecification(specification: Specification): void {
    SpecificationStoreService.specification = specification;
  }

  // eslint-disable-next-line class-methods-use-this
  public getSpecification(): Specification {
    return SpecificationStoreService.specification;
  }

  public createSpecificationFromBank(bank: Bank): void {
    SpecificationStoreService.specification = {
      bank,
      title: '',
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

  public addSpesificationProduct(product: SpecificationProduct): void {
    SpecificationStoreService.specification = produce(
      SpecificationStoreService.specification,
      (draft) => {
        draft.products.push(product);
      }
    );
  }

  public editSpesificationProduct(product: SpecificationProduct): void {
    const index = SpecificationStoreService.specification.products.findIndex(
      (specificationproduct: SpecificationProduct) =>
        specificationproduct.id === product.id
    );
    SpecificationStoreService.specification = produce(
      SpecificationStoreService.specification,
      (draft) => {
        draft.products[index] = product;
      }
    );
  }

  public deleteSpesificationProduct(product: SpecificationProduct): void {
    const index = SpecificationStoreService.specification.products.findIndex(
      (specificationproduct: SpecificationProduct) =>
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
