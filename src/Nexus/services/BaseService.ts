import UuidService from './UuidService';

export default class BaseService {
  private uuidService: UuidService;

  public constructor() {
    this.uuidService = new UuidService();
  }

  withId<T>(obj: T): T {
    return {
      ...obj,
      id: this.uuidService.generateId(),
    };
  }
}
