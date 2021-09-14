import { Bank } from '../models/Bank';

export default class Nexus {
  private static instance: Nexus;

  private bank!: Bank;

  private constructor() {
    // intensional private constructor
  }

  public static getInstance(): Nexus {
    if (!Nexus.instance) {
      Nexus.instance = new Nexus();
    }
    return Nexus.instance;
  }

  public load(bank: Bank): Nexus {
    this.bank = bank;
    return this;
  }

  public printTitle(): Nexus {
    if (this.bank) {
      // eslint-disable-next-line no-console
      console.log(this.bank.title);
    }
    return this;
  }

  public getTitle(): string {
    if (this.bank) {
      return this.bank.title;
    }
    throw Error('Bank is not loaded');
  }
}
