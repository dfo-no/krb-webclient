import { IBank } from '../../models/IBank';

export default abstract class Adapter {
  abstract save(bank: IBank): void;

  abstract load(): IBank;
}
