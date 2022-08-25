/* eslint-disable class-methods-use-this */
import QuestionService from './QuestionService';
import SpecificationStoreService from './SpecificationStoreService';
import UuidService from './UuidService';
import { IRequirement } from '../entities/IRequirement';
import { IRequirementAnswer } from '../entities/IRequirementAnswer';
import { ISpecification } from '../entities/ISpecification';
import { ISpecificationProduct } from '../entities/ISpecificationProduct';
import { ModelType, QuestionVariant, Weighting } from '../enums';

export default class SpecificationService {
  UuidService = new UuidService();

  private store: SpecificationStoreService;

  public constructor(store: SpecificationStoreService) {
    this.store = store;
  }

  generateDefaultSpecificationProductValues = (): ISpecificationProduct => {
    return {
      id: '',
      title: '',
      description: '',
      originProduct: {
        id: '',
        title: '',
        description: '',
        type: ModelType.product,
        parent: '',
        sourceOriginal: '',
        sourceRel: null,
        deletedDate: null
      },
      weight: Weighting.MEDIUM,
      amount: 1,
      requirements: [],
      requirementAnswers: [],
      type: ModelType.specificationProduct,
      sourceOriginal: null,
      sourceRel: null
    };
  };

  generateDefaultRequirementAnswer = (
    requirement: IRequirement
  ): IRequirementAnswer => {
    const questionService = new QuestionService();
    return {
      id: this.UuidService.generateId(),
      questionId: '',
      weight: Weighting.MEDIUM,
      variantId: '',
      question: questionService.getQuestion(QuestionVariant.Q_TEXT),
      type: ModelType.requirementAnswer,
      requirement: requirement
    };
  };

  createSpecificationWithId = (item: ISpecification): ISpecification => {
    return {
      ...item,
      id: this.UuidService.generateId()
    };
  };

  createSpecificationProductWithId = (
    item: ISpecificationProduct
  ): ISpecificationProduct => {
    const specProd = { ...item };
    specProd.id = this.UuidService.generateId();
    return specProd;
  };

  createRequirementAnswerWithId = (
    item: IRequirementAnswer
  ): IRequirementAnswer => {
    const reqAns = { ...item };
    reqAns.id = this.UuidService.generateId();
    return reqAns;
  };

  async setSpecification(specification: ISpecification): Promise<void> {
    return this.store.setSpecification(specification);
  }

  async getSpecification(): Promise<ISpecification> {
    return this.store.getSpecification();
  }

  async editTtile(title: string): Promise<void> {
    return this.store.editTitle(title);
  }

  async addSpecificationProduct(product: ISpecificationProduct): Promise<void> {
    return this.store.addSpecificationProduct(product);
  }

  async editSpecificationProduct(
    product: ISpecificationProduct
  ): Promise<void> {
    return this.store.editSpecificationProduct(product);
  }

  async deleteSpecificationProduct(
    product: ISpecificationProduct
  ): Promise<void> {
    return this.store.deleteSpecificationProduct(product);
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
