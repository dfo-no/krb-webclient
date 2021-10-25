import { Bank } from '../../models/Bank';

export default abstract class Adapter {
  abstract save(bank: Bank): void;

  abstract load(): Bank;
}
