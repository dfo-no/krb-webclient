/* eslint-disable class-methods-use-this */
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { ISpecification } from '../../models/ISpecification';
import { ISpecificationProduct } from '../../models/ISpecificationProduct';
import { IBank } from '../entities/IBank';
import SpecificationStoreService from './SpecificationStoreService';
import UuidService from './UuidService';

export default class SpecificationService {
  UuidService = new UuidService();

  private store: SpecificationStoreService;

  public constructor(store: SpecificationStoreService) {
    this.store = store;
  }

  async setSpecification(specification: ISpecification): Promise<void> {
    return this.store.setSpecification(specification);
  }

  async getSpecification(): Promise<ISpecification> {
    return this.store.getSpecification();
  }

  async editTtile(title: string): Promise<void> {
    return this.store.editTitle(title);
  }

  async createSpecificationFromBank(bank: IBank): Promise<void> {
    return this.store.createSpecificationFromBank(bank);
  }

  async addSpecificationProduct(product: ISpecificationProduct): Promise<void> {
    return this.store.addSpesificationProduct(product);
  }

  async editSpecificationProduct(
    product: ISpecificationProduct
  ): Promise<void> {
    return this.store.editSpesificationProduct(product);
  }

  async deleteSpecificationProduct(
    product: ISpecificationProduct
  ): Promise<void> {
    return this.store.deleteSpesificationProduct(product);
  }

  async addRequirement(requirementId: string): Promise<void> {
    return this.store.addRequirement(requirementId);
  }

  async removeRequirement(requirementId: string): Promise<void> {
    return this.store.removeRequirement(requirementId);
  }

  async addProductRequirement(
    requirementId: string,
    productId: string
  ): Promise<void> {
    return this.store.addSpecificationProductRequirement(
      requirementId,
      productId
    );
  }

  async removeProductRequirement(
    requirementId: string,
    productId: string
  ): Promise<void> {
    return this.store.removeSpecificationProductRequirement(
      requirementId,
      productId
    );
  }

  async addProductAnswer(
    answer: IRequirementAnswer,
    productId: string
  ): Promise<void> {
    return this.store.addProductAnswer(answer, productId);
  }

  async editProductAnswer(
    answer: IRequirementAnswer,
    productId: string
  ): Promise<void> {
    return this.store.editProductAnswer(answer, productId);
  }

  async deleteProductAnswer(
    answer: IRequirementAnswer,
    productId: string
  ): Promise<void> {
    return this.store.deleteProductAnswer(answer, productId);
  }

  async addAnswer(answer: IRequirementAnswer): Promise<void> {
    return this.store.addAnswer(answer);
  }

  async editAnswer(answer: IRequirementAnswer): Promise<void> {
    return this.store.editAnswer(answer);
  }

  async deleteAnswer(answer: IRequirementAnswer): Promise<void> {
    return this.store.deleteAnswer(answer);
  }
}
