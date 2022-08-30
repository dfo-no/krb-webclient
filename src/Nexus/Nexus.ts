/* eslint-disable class-methods-use-this */
import Adapter from './Adapters/Adapter';
import LocalStorageAdapter from './Adapters/LocalStorageAdapter';
import { IBank } from './entities/IBank';
import CodelistService from './services/CodelistService';
import EvaluationService from './services/EvaluationService';
import NeedService from './services/NeedService';
import ProductService from './services/ProductService';
import ProjectService from './services/ProjectService';
import PublicationService from './services/PublicationService';
import RequirementService from './services/RequirementService';
import ResolverService from './services/ResolverService';
import ResponseService from './services/ResponseService';
import ResponseStoreService from './services/ResponseStoreService';
import SpecificationService from './services/SpecificationService';
import SpecificationStoreService from './services/SpecificationStoreService';
import StoreService from './services/StoreService';
import TagService from './services/TagService';
import VariantService from './services/VariantService';
import PrefilledResponseService from './services/PrefilledResponseService';
import QuestionService from './services/QuestionService';

export default class Nexus {
  private static instance: Nexus;

  private adapter: Adapter;

  public store = new StoreService();

  public specificationStore = new SpecificationStoreService();

  public responseStore = new ResponseStoreService();

  // investigate Inversify.js to get rid of this code and remove use of new
  public needService = new NeedService(this.store);

  public requirementService = new RequirementService(this.store);

  public variantService = new VariantService(this.store);

  public tagService = new TagService(this.store);

  public productService = new ProductService(this.store);

  public publicationService = new PublicationService();

  public codelistService = new CodelistService(this.store);

  public projectService = new ProjectService(this.store);

  public specificationService = new SpecificationService(
    this.specificationStore
  );

  public prefilledResponseService = new PrefilledResponseService();

  public responseService = new ResponseService(this.responseStore);

  public evaluationService = new EvaluationService();

  public questionService = new QuestionService();

  public resolverService = new ResolverService();

  private constructor(adapter: Adapter) {
    this.adapter = adapter;
  }

  public static getInstance(adapter?: Adapter): Nexus {
    if (!Nexus.instance) {
      if (!adapter) {
        Nexus.instance = new this(new LocalStorageAdapter());
      } else {
        Nexus.instance = new this(adapter);
      }
    }

    return Nexus.instance;
  }

  // find out how to handle potential save of specification as well as bank
  async save(): Promise<void> {
    return this.adapter.save(this.store.getBank());
  }

  // find out how to handle potential load of specification as well as bank
  async load(): Promise<IBank> {
    return this.adapter.load();
  }

  // eslint-disable-next-line class-methods-use-this
}
