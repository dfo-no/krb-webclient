/* eslint-disable class-methods-use-this */
import { Bank } from '../models/Bank';
import Adapter from './Adapters/Adapter';
import LocalStorageAdapter from './Adapters/LocalStorageAdapter';
import CodelistService from './services/CodelistService';
import NeedService from './services/NeedService';
import ProductService from './services/ProductService';
import ProjectService from './services/ProjectService';
import PublicationService from './services/PublicationService';
import StoreService from './services/StoreService';
import TagService from './services/TagService';

export default class Nexus {
  private static instance: Nexus;

  private adapter: Adapter;

  private static bank: Bank;

  public store = new StoreService();

  private constructor(adapter: Adapter) {
    this.adapter = adapter;
  }

  public static getInstance(): Nexus {
    if (!Nexus.instance) {
      Nexus.instance = new this(new LocalStorageAdapter());
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
  public getPublicationService(): PublicationService {
    return new PublicationService();
  }

  // eslint-disable-next-line class-methods-use-this
  public getCodelistService(): CodelistService {
    return new CodelistService(this.store);
  }

  // eslint-disable-next-line class-methods-use-this
  public getTagService(): TagService {
    return new TagService(this.store);
  }

  // eslint-disable-next-line class-methods-use-this
  public getNeedService(): NeedService {
    return new NeedService(this.store);
  }

  // eslint-disable-next-line class-methods-use-this
  public getProductService(): ProductService {
    return new ProductService(this.store);
  }

  // eslint-disable-next-line class-methods-use-this
  public getProjectService(): ProjectService {
    return new ProjectService(this.store);
  }
}
