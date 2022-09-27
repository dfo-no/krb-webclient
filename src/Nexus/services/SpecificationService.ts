/* eslint-disable class-methods-use-this */
import BaseService from './BaseService';
import ProductService from './ProductService';
import ProjectService from './ProjectService';
import QuestionService from './QuestionService';
import RequirementService from './RequirementService';
import SpecificationStoreService from './SpecificationStoreService';
import { IBank } from '../entities/IBank';
import { IRequirement } from '../entities/IRequirement';
import { IRequirementAnswer } from '../entities/IRequirementAnswer';
import { ISpecification } from '../entities/ISpecification';
import { ISpecificationProduct } from '../entities/ISpecificationProduct';
import { ModelType, QuestionVariant, Weighting } from '../enums';
import { QuestionType } from '../entities/QuestionType';
import { IProduct } from '../entities/IProduct';

export default class SpecificationService extends BaseService {
  private store: SpecificationStoreService;

  public constructor() {
    super();
    this.store = new SpecificationStoreService();
  }

  public static defaultSpecification(bank?: IBank): ISpecification {
    return {
      id: '',
      bank: bank ?? ProjectService.defaultProject(),
      title: '',
      organization: '',
      organizationNumber: '',
      products: [],
      requirements: [],
      requirementAnswers: [],
      caseNumber: ''
    };
  }

  public static defaultSpecificationProduct = (
    product?: IProduct
  ): ISpecificationProduct => {
    return {
      id: '',
      title: '',
      description: '',
      originProduct: product ?? ProductService.defaultProduct(),
      weight: Weighting.MEDIUM,
      amount: 1,
      requirements: [],
      requirementAnswers: [],
      type: ModelType.specificationProduct,
      sourceOriginal: null,
      sourceRel: null,
      unit: 'stk'
    };
  };

  public static defaultRequirementAnswer = (
    requirement?: IRequirement,
    variantId?: string,
    question?: QuestionType
  ): IRequirementAnswer => {
    const questionService = new QuestionService();
    return {
      id: '',
      questionId: '',
      weight: Weighting.MEDIUM,
      variantId: variantId ?? '',
      question: question ?? questionService.getQuestion(QuestionVariant.Q_TEXT),
      type: ModelType.requirementAnswer,
      requirement: requirement ?? RequirementService.defaultRequirement()
    };
  };

  async setSpecification(
    specification: ISpecification
  ): Promise<ISpecification> {
    return this.store.setSpecification(specification);
  }

  async getSpecification(id: string): Promise<ISpecification> {
    return this.store.getSpecification(id);
  }

  async addSpecificationProduct(
    product: ISpecificationProduct
  ): Promise<ISpecification> {
    return this.store.addSpecificationProduct(product);
  }

  async editSpecificationProduct(
    product: ISpecificationProduct
  ): Promise<ISpecification> {
    return this.store.editSpecificationProduct(product);
  }

  async deleteSpecificationProduct(
    product: ISpecificationProduct
  ): Promise<ISpecification> {
    return this.store.deleteSpecificationProduct(product);
  }

  async addProductAnswer(
    answer: IRequirementAnswer,
    productId: string
  ): Promise<ISpecification> {
    return this.store.addProductAnswer(answer, productId);
  }

  async editProductAnswer(
    answer: IRequirementAnswer,
    productId: string
  ): Promise<ISpecification> {
    return this.store.editProductAnswer(answer, productId);
  }

  async deleteProductAnswer(
    answer: IRequirementAnswer,
    productId: string
  ): Promise<ISpecification> {
    return this.store.deleteProductAnswer(answer, productId);
  }

  async addAnswer(answer: IRequirementAnswer): Promise<ISpecification> {
    return this.store.addAnswer(answer);
  }

  async editAnswer(answer: IRequirementAnswer): Promise<ISpecification> {
    return this.store.editAnswer(answer);
  }

  async deleteAnswer(answer: IRequirementAnswer): Promise<ISpecification> {
    return this.store.deleteAnswer(answer);
  }
}
