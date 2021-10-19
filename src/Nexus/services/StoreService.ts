/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import produce from 'immer';
import { Bank } from '../../models/Bank';
import { Code } from '../../models/Code';
import { Codelist } from '../../models/Codelist';
import { Need } from '../../models/Need';
import { Parentable } from '../../models/Parentable';
import { Product } from '../../models/Product';
import { Requirement } from '../../models/Requirement';
import { Tag } from '../../models/Tag';

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
      draft.needs.push(item);
    });
  }

  public editNeed(item: Parentable<Need>): void {
    const index = StoreService.bank.needs.findIndex(
      (need: Need) => need.id === item.id
    );
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.needs[index] = item;
    });
  }

  public deleteNeed(item: Parentable<Need>): void {
    const index = StoreService.bank.needs.findIndex(
      (need: Need) => need.id === item.id
    );
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.needs.splice(index, 1);
    });
  }

  public addProduct(item: Product): void {
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.products.push(item);
    });
  }

  public editProduct(item: Product): void {
    const index = StoreService.bank.products.findIndex(
      (product: Product) => product.id === item.id
    );
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.products[index] = item;
    });
  }

  public deleteProduct(item: Product): void {
    const index = StoreService.bank.products.findIndex(
      (product: Product) => product.id === item.id
    );
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.products.splice(index, 1);
    });
  }

  public addTag(item: Parentable<Tag>): void {
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.tags.push(item);
    });
  }

  public editTag(item: Parentable<Tag>): void {
    const index = StoreService.bank.tags.findIndex(
      (tag: Parentable<Tag>) => tag.id === item.id
    );
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.tags[index] = item;
    });
  }

  public deleteTag(item: Parentable<Tag>): void {
    const index = StoreService.bank.tags.findIndex(
      (tag: Parentable<Tag>) => tag.id === item.id
    );
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.tags.splice(index, 1);
    });
  }

  public addCodelist(item: Codelist): void {
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.codelist.push(item);
    });
  }

  public editCodelist(item: Codelist): void {
    const index = StoreService.bank.codelist.findIndex(
      (codelist: Codelist) => codelist.id === item.id
    );
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.codelist[index] = item;
    });
  }

  public deleteCodelist(item: Codelist): void {
    const index = StoreService.bank.codelist.findIndex(
      (codelist: Codelist) => codelist.id === item.id
    );
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.codelist.splice(index, 1);
    });
  }

  public addCode(item: Code, codelistId: string): void {
    const codelistIndex = StoreService.bank.codelist.findIndex(
      (codelist: Codelist) => codelist.id === codelistId
    );
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.codelist[codelistIndex].codes.push(item);
    });
  }

  public editCode(item: Code, codelistId: string): void {
    const codelistIndex = StoreService.bank.codelist.findIndex(
      (codelist: Codelist) => codelist.id === codelistId
    );
    const codeIndex = StoreService.bank.codelist[codelistIndex].codes.findIndex(
      (code: Code) => code.id === item.id
    );
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.codelist[codeIndex].codes[codeIndex] = item;
    });
  }

  public deleteCode(item: Code, codelistId: string): void {
    const codelistIndex = StoreService.bank.codelist.findIndex(
      (codelist: Codelist) => codelist.id === codelistId
    );
    const codeIndex = StoreService.bank.codelist[codelistIndex].codes.findIndex(
      (code: Code) => code.id === item.id
    );
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.codelist[codelistIndex].codes.splice(codeIndex, 1);
    });
  }

  public addRequirement(needId: string, requirement: Requirement): void {
    const needIndex = StoreService.bank.needs.findIndex(
      (need) => need.id === needId
    );
    if (needIndex !== -1) {
      StoreService.bank.needs[needIndex].requirements.push(requirement);
    }
  }

  public editRequirement(needId: string, requirement: Requirement): void {
    const needIndex = StoreService.bank.needs.findIndex(
      (need) => need.id === needId
    );

    const requirementIndex = StoreService.bank.needs[
      needIndex
    ].requirements.findIndex((elem) => elem.id === requirement.id);
    if (requirementIndex !== -1) {
      StoreService.bank.needs[needIndex].requirements[requirementIndex] =
        requirement;
    }
  }

  public deleteRequirement(needId: string, requirement: Requirement): void {
    const needIndex = StoreService.bank.needs.findIndex(
      (need) => need.id === needId
    );
    if (needIndex !== -1) {
      const requirementIndex = StoreService.bank.needs[
        needIndex
      ].requirements.findIndex((element) => element.id === requirement.id);
      if (requirementIndex !== -1) {
        StoreService.bank.needs[needIndex].requirements.splice(
          requirementIndex,
          1
        );
      }
    }
  }
}
