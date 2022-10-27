/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import produce from 'immer';

import { Parentable } from '../../models/Parentable';
import { QuestionType } from '../entities/QuestionType';
import { IBank } from '../entities/IBank';
import { ICode } from '../entities/ICode';
import { ICodelist } from '../entities/ICodelist';
import { INeed } from '../entities/INeed';
import { IProduct } from '../entities/IProduct';
import { IRequirement } from '../entities/IRequirement';
import { ITag } from '../entities/ITag';
import { IVariant } from '../entities/IVariant';

export default class StoreService {
  private static bank: IBank;

  public setBank(bank: IBank): void {
    StoreService.bank = bank;
  }

  // eslint-disable-next-line class-methods-use-this
  public getBank(): IBank {
    return StoreService.bank;
  }

  public addNeed(item: Parentable<INeed>): void {
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.needs.push(item);
    });
  }

  public editNeed(item: Parentable<INeed>): void {
    const index = StoreService.bank.needs.findIndex(
      (need: INeed) => need.id === item.id
    );
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.needs[index] = item;
    });
  }

  public deleteNeed(item: Parentable<INeed>): void {
    const index = StoreService.bank.needs.findIndex(
      (need: INeed) => need.id === item.id
    );
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.needs.splice(index, 1);
    });
  }

  public addProduct(item: IProduct): void {
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.products.push(item);
    });
  }

  public editProduct(item: IProduct): void {
    const index = StoreService.bank.products.findIndex(
      (product: IProduct) => product.id === item.id
    );
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.products[index] = item;
    });
  }

  public deleteProduct(item: IProduct): void {
    const index = StoreService.bank.products.findIndex(
      (product: IProduct) => product.id === item.id
    );
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.products.splice(index, 1);
    });
  }

  public addTag(item: Parentable<ITag>): void {
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.tags.push(item);
    });
  }

  public editTag(item: Parentable<ITag>): void {
    const index = StoreService.bank.tags.findIndex(
      (tag: Parentable<ITag>) => tag.id === item.id
    );
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.tags[index] = item;
    });
  }

  public deleteTag(item: Parentable<ITag>): void {
    const index = StoreService.bank.tags.findIndex(
      (tag: Parentable<ITag>) => tag.id === item.id
    );
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.tags.splice(index, 1);
    });
  }

  public addCodelist(item: ICodelist): void {
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.codelist.push(item);
    });
  }

  public editCodelist(item: ICodelist): void {
    const index = StoreService.bank.codelist.findIndex(
      (codelist: ICodelist) => codelist.id === item.id
    );
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.codelist[index] = item;
    });
  }

  public deleteCodelist(item: ICodelist): void {
    const index = StoreService.bank.codelist.findIndex(
      (codelist: ICodelist) => codelist.id === item.id
    );
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.codelist.splice(index, 1);
    });
  }

  public addCode(item: Parentable<ICode>, codelistId: string): void {
    const codelistIndex = StoreService.bank.codelist.findIndex(
      (codelist: ICodelist) => codelist.id === codelistId
    );
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.codelist[codelistIndex].codes.push(item);
    });
  }

  public editCode(item: Parentable<ICode>, codelistId: string): void {
    const codelistIndex = StoreService.bank.codelist.findIndex(
      (codelist: ICodelist) => codelist.id === codelistId
    );
    const codeIndex = StoreService.bank.codelist[codelistIndex].codes.findIndex(
      (code: ICode) => code.id === item.id
    );
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.codelist[codeIndex].codes[codeIndex] = item;
    });
  }

  public deleteCode(item: ICode, codelistId: string): void {
    const codelistIndex = StoreService.bank.codelist.findIndex(
      (codelist: ICodelist) => codelist.id === codelistId
    );
    const codeIndex = StoreService.bank.codelist[codelistIndex].codes.findIndex(
      (code: ICode) => code.id === item.id
    );
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.codelist[codelistIndex].codes.splice(codeIndex, 1);
    });
  }

  public addRequirement(needId: string, requirement: IRequirement): void {
    const needIndex = StoreService.bank.needs.findIndex(
      (need) => need.id === needId
    );
    if (needIndex !== -1) {
      StoreService.bank.needs[needIndex].requirements.push(requirement);
    }
  }

  public editRequirement(needId: string, requirement: IRequirement): void {
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

  public deleteRequirement(needId: string, requirement: IRequirement): void {
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

  public editProjectTitle(title: string): void {
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.title = title;
    });
  }

  public editProjectDescription(description: string): void {
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.description = description;
    });
  }

  public addVariant(
    needId: string,
    requirementId: string,
    variant: IVariant
  ): void {
    const needIndex = StoreService.bank.needs.findIndex(
      (need) => need.id === needId
    );
    const requirementIndex = StoreService.bank.needs[
      needIndex
    ].requirements.findIndex((elem) => elem.id === requirementId);
    if (needIndex !== -1) {
      StoreService.bank.needs[needIndex].requirements[
        requirementIndex
      ].variants.push(variant);
    }
  }

  public editVariant(
    needId: string,
    requirementId: string,
    variant: IVariant
  ): void {
    const needIndex = StoreService.bank.needs.findIndex(
      (need) => need.id === needId
    );

    const requirementIndex = StoreService.bank.needs[
      needIndex
    ].requirements.findIndex((elem) => elem.id === requirementId);

    const variantIndex = StoreService.bank.needs[needIndex].requirements[
      requirementIndex
    ].variants.findIndex((elem) => elem.id === variant.id);
    if (requirementIndex !== -1) {
      StoreService.bank.needs[needIndex].requirements[
        requirementIndex
      ].variants[variantIndex] = variant;
    }
  }

  public deleteVariant(
    needId: string,
    requirementId: string,
    variant: IVariant
  ): void {
    const needIndex = StoreService.bank.needs.findIndex(
      (need) => need.id === needId
    );

    const requirementIndex = StoreService.bank.needs[
      needIndex
    ].requirements.findIndex((elem) => elem.id === requirementId);

    const variantIndex = StoreService.bank.needs[needIndex].requirements[
      requirementIndex
    ].variants.findIndex((elem) => elem.id === variant.id);
    if (requirementIndex !== -1) {
      StoreService.bank.needs[needIndex].requirements[
        requirementIndex
      ].variants.splice(variantIndex, 1);
    }
  }

  public addQuestion(
    needId: string,
    requirementId: string,
    variantId: string,
    question: QuestionType
  ): void {
    const needIndex = StoreService.bank.needs.findIndex(
      (need) => need.id === needId
    );
    const requirementIndex = StoreService.bank.needs[
      needIndex
    ].requirements.findIndex((elem) => elem.id === requirementId);

    const variantIndex = StoreService.bank.needs[needIndex].requirements[
      requirementIndex
    ].variants.findIndex((elem) => elem.id === variantId);

    StoreService.bank.needs[needIndex].requirements[requirementIndex].variants[
      variantIndex
    ].questions.push(question);
  }

  public editQuestion(
    needId: string,
    requirementId: string,
    variantId: string,
    question: QuestionType
  ): void {
    const needIndex = StoreService.bank.needs.findIndex(
      (need) => need.id === needId
    );

    const requirementIndex = StoreService.bank.needs[
      needIndex
    ].requirements.findIndex((elem) => elem.id === requirementId);

    const variantIndex = StoreService.bank.needs[needIndex].requirements[
      requirementIndex
    ].variants.findIndex((elem) => elem.id === variantId);

    const questionIndex = StoreService.bank.needs[needIndex].requirements[
      requirementIndex
    ].variants[variantIndex].questions.findIndex(
      (elem) => elem.id === question.id
    );

    StoreService.bank.needs[needIndex].requirements[requirementIndex].variants[
      variantIndex
    ].questions[questionIndex] = question;
  }

  public deleteQuestion(
    needId: string,
    requirementId: string,
    variantId: string,
    question: QuestionType
  ): void {
    const needIndex = StoreService.bank.needs.findIndex(
      (need) => need.id === needId
    );

    const requirementIndex = StoreService.bank.needs[
      needIndex
    ].requirements.findIndex((elem) => elem.id === requirementId);

    const variantIndex = StoreService.bank.needs[needIndex].requirements[
      requirementIndex
    ].variants.findIndex((elem) => elem.id === variantId);

    const questionIndex = StoreService.bank.needs[needIndex].requirements[
      requirementIndex
    ].variants[variantIndex].questions.findIndex(
      (elem) => elem.id === question.id
    );

    StoreService.bank.needs[needIndex].requirements[requirementIndex].variants[
      variantIndex
    ].questions.splice(questionIndex, 1);
  }
}
