/* eslint-disable class-methods-use-this */
import { Bank } from '../models/Bank';
import Adapter from './Adapters/Adapter';
import LocalStorageAdapter from './Adapters/LocalStorageAdapter';
import CodelistService from './services/CodelistService';
import NeedService from './services/NeedService';
import ProductService from './services/ProductService';
import ProjectService from './services/ProjectService';
import PublicationService from './services/PublicationService';
import RequirementService from './services/RequirementService';
import StoreService from './services/StoreService';
import TagService from './services/TagService';

export default class Nexus {
  private static instance: Nexus;

  private adapter: Adapter;

  private static bank: Bank;

  public store = new StoreService();

  public needService = new NeedService(this.store);

  public requirementService = new RequirementService(this.store);

  public tagService = new TagService(this.store);

  public productService = new ProductService(this.store);

  public publicationService = new PublicationService();

  public codelistService = new CodelistService(this.store);

  public projectService = new ProjectService(this.store);

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

  public setProject(bank: Bank): void {
    this.store.setBank(bank);
  }

  public getProject(): Bank {
    return this.store.getBank();
  }

  async save(): Promise<void> {
    return this.adapter.save(this.store.getBank());
  }

  async load(): Promise<Bank> {
    return this.adapter.load();
  }

  /**
   * We will probably get the services in another way than this eventually.
   * Possibly by using Dependency Injection of some sort.
   * The important part is that the business logic *inside* the services are good for now.
   */

  // eslint-disable-next-line class-methods-use-this
}
