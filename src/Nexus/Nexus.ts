import CodelistService from './services/CodelistService';
import NeedService from './services/NeedService';
import ProductService from './services/ProductService';
import ProjectService from './services/ProjectService';
import PublicationService from './services/PublicationService';
import TagService from './services/TagService';

export default class Nexus {
  private static instance: Nexus;

  private constructor() {
    // intensional private constructor
  }

  public static getInstance(): Nexus {
    if (!Nexus.instance) {
      Nexus.instance = new this();
    }

    return Nexus.instance;
  }

  /**
   * We will probably get the services in another way than this eventually.
   * Possibly by using Dependency Injection of some sort.
   * The important part is that the business logic *inside* the services are good for now.
   */

  // eslint-disable-next-line class-methods-use-this
  public getPublicationService(): PublicationService {
    return new PublicationService();
  }

  // eslint-disable-next-line class-methods-use-this
  public getCodelistService(): CodelistService {
    return new CodelistService();
  }

  // eslint-disable-next-line class-methods-use-this
  public getTagService(): TagService {
    return new TagService();
  }

  // eslint-disable-next-line class-methods-use-this
  public getNeedService(): NeedService {
    return new NeedService();
  }

  // eslint-disable-next-line class-methods-use-this
  public getProductService(): ProductService {
    return new ProductService();
  }

  // eslint-disable-next-line class-methods-use-this
  public getProjectService(): ProjectService {
    return new ProjectService();
  }
}
