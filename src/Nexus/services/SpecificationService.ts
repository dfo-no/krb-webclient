/* eslint-disable class-methods-use-this */
import { IBank } from '../../models/IBank';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { Specification } from '../../models/Specification';
import { SpecificationProduct } from '../../models/SpecificationProduct';
import SpecificationStoreService from './SpecificationStoreService';
import UuidService from './UuidService';

export default class SpecificationService {
  UuidService = new UuidService();

  private store: SpecificationStoreService;

  public constructor(store: SpecificationStoreService) {
    this.store = store;
  }

  async setSpecification(specification: Specification): Promise<void> {
    return this.store.setSpecification(specification);
  }

  async getSpecification(): Promise<Specification> {
    return this.store.getSpecification();
  }

  async editTtile(title: string): Promise<void> {
    return this.store.editTitle(title);
  }

  async createSpecificationFromBank(bank: IBank): Promise<void> {
    return this.store.createSpecificationFromBank(bank);
  }

  async addSpecificationProduct(product: SpecificationProduct): Promise<void> {
    return this.store.addSpesificationProduct(product);
  }

  async editSpecificationProduct(product: SpecificationProduct): Promise<void> {
    return this.store.editSpesificationProduct(product);
  }

  async deleteSpecificationProduct(
    product: SpecificationProduct
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
