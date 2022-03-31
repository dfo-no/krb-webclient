import { IBank } from '../entities/IBank';

export default abstract class Adapter {
  abstract save(bank: IBank): void;

  abstract load(): IBank;
}
