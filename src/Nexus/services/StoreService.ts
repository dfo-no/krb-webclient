/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import produce from 'immer';
import { Bank } from '../../models/Bank';
import { Need } from '../../models/Need';
import { Parentable } from '../../models/Parentable';

export default class StoreService {
  private static bank: Bank;

  public setBank(bank: Bank): void {
    StoreService.bank = bank;
  }

  // eslint-disable-next-line class-methods-use-this
  public getBank(): Bank {
    return StoreService.bank;
  }

  public addNeed(item: Parentable<Need>): void {
    StoreService.bank = produce(StoreService.bank, (draft) => {
      // `x` can be modified here
      draft.needs.push(item);
    });
  }

  public editNeed(item: Parentable<Need>): void {
    StoreService.bank = produce(StoreService.bank, (draft) => {
      const index = StoreService.bank.needs.findIndex(
        (need: Need) => need.id === item.id
      );
      draft.needs[index] = item;
    });
  }

  public deleteNeed(item: Parentable<Need>): void {
    StoreService.bank = produce(StoreService.bank, (draft) => {
      const index = StoreService.bank.needs.findIndex(
        (need: Need) => need.id === item.id
      );
      draft.needs.splice(index, 1);
    });
  }
}
