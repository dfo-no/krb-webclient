/* eslint-disable no-param-reassign */
import localforage from 'localforage';
import produce from 'immer';

import SpecificationService from './SpecificationService';
import { IRequirementAnswer } from '../entities/IRequirementAnswer';
import { ISpecification } from '../entities/ISpecification';
import { ISpecificationProduct } from '../entities/ISpecificationProduct';

export default class SpecificationStoreService {
  private specification: ISpecification;

  private db: LocalForage;

  constructor() {
    this.specification = SpecificationService.defaultSpecification();
    this.db = localforage.createInstance({
      name: 'specifications'
    });
  }

  private async storeSpecification(): Promise<ISpecification> {
    return this.db.setItem(this.specification.id, this.specification);
  }

  async setSpecification(
    specification: ISpecification
  ): Promise<ISpecification> {
    this.specification = specification;
    await this.storeSpecification();
    return specification;
  }

  async getSpecification(id: string): Promise<ISpecification> {
    if (this.specification && this.specification.id === id) {
      return this.specification;
    }
    const storedSpecification = await this.db.getItem(id);
    if (storedSpecification) {
      this.specification = storedSpecification as ISpecification;
      return storedSpecification as ISpecification;
    }
    this.specification = SpecificationService.defaultSpecification();
    return SpecificationService.defaultSpecification();
  }

  async addSpecificationProduct(
    product: ISpecificationProduct
  ): Promise<ISpecification> {
    this.specification = produce(this.specification, (draft) => {
      draft.products.push(product);
    });
    await this.storeSpecification();
    return this.specification;
  }

  async editSpecificationProduct(
    product: ISpecificationProduct
  ): Promise<ISpecification> {
    const index = this.specification.products.findIndex(
      (specificationproduct: ISpecificationProduct) =>
        specificationproduct.id === product.id
    );
    this.specification = produce(this.specification, (draft) => {
      draft.products[index] = product;
    });
    await this.storeSpecification();
    return this.specification;
  }

  async deleteSpecificationProduct(
    product: ISpecificationProduct
  ): Promise<ISpecification> {
    const index = this.specification.products.findIndex(
      (specificationproduct: ISpecificationProduct) =>
        specificationproduct.id === product.id
    );
    this.specification = produce(this.specification, (draft) => {
      draft.products.splice(index, 1);
    });
    await this.storeSpecification();
    return this.specification;
  }

  async addProductAnswer(
    answer: IRequirementAnswer,
    productId: string
  ): Promise<ISpecification> {
    const index = this.specification.products.findIndex(
      (product) => product.id === productId
    );
    this.specification = produce(this.specification, (draft) => {
      draft.products[index].requirementAnswers.push(answer);
      draft.products[index].requirements.push(answer.requirement.id);
    });
    await this.storeSpecification();
    return this.specification;
  }

  async editProductAnswer(
    answer: IRequirementAnswer,
    productId: string
  ): Promise<ISpecification> {
    const index = this.specification.products.findIndex(
      (product) => product.id === productId
    );
    const answerIndex = this.specification.products[
      index
    ].requirementAnswers.findIndex(
      (element) => element.variantId === answer.variantId
    );
    this.specification = produce(this.specification, (draft) => {
      draft.products[index].requirementAnswers[answerIndex] = answer;
    });
    await this.storeSpecification();
    return this.specification;
  }

  async deleteProductAnswer(
    answer: IRequirementAnswer,
    productId: string
  ): Promise<ISpecification> {
    const index = this.specification.products.findIndex(
      (product) => product.id === productId
    );
    const answerIndex = this.specification.products[
      index
    ].requirementAnswers.findIndex(
      (element) => element.variantId === answer.variantId
    );
    const requirementIndex = this.specification.products[
      index
    ].requirements.findIndex((element) => element === answer.requirement.id);
    this.specification = produce(this.specification, (draft) => {
      draft.products[index].requirementAnswers.splice(answerIndex, 1);
      draft.products[index].requirements.splice(requirementIndex, 1);
    });
    await this.storeSpecification();
    return this.specification;
  }

  async addAnswer(answer: IRequirementAnswer): Promise<ISpecification> {
    this.specification = produce(this.specification, (draft) => {
      draft.requirementAnswers.push(answer);
      draft.requirements.push(answer.requirement.id);
    });
    await this.storeSpecification();
    return this.specification;
  }

  async editAnswer(answer: IRequirementAnswer): Promise<ISpecification> {
    const answerIndex = this.specification.requirementAnswers.findIndex(
      (element) => element.variantId === answer.variantId
    );
    this.specification = produce(this.specification, (draft) => {
      draft.requirementAnswers[answerIndex] = answer;
    });
    await this.storeSpecification();
    return this.specification;
  }

  async deleteAnswer(answer: IRequirementAnswer): Promise<ISpecification> {
    const answerIndex = this.specification.requirementAnswers.findIndex(
      (element) => element.variantId === answer.variantId
    );
    const requirementIndex = this.specification.requirements.findIndex(
      (element) => element === answer.requirement.id
    );
    this.specification = produce(this.specification, (draft) => {
      draft.requirementAnswers.splice(answerIndex, 1);
      draft.requirements.splice(requirementIndex, 1);
    });
    await this.storeSpecification();
    return this.specification;
  }
}
