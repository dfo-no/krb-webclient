/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import produce from 'immer';

import { Parentable } from '../../models/Parentable';
import { QuestionType } from '../entities/QuestionType';
import {
  Code,
  Codelist,
  Need,
  Product,
  ProjectForm,
} from '../../api/openapi-fetch';

export default class StoreService {
  private static bank: ProjectForm;

  public setBank(bank: ProjectForm): void {
    StoreService.bank = bank;
  }

  public getBank(): ProjectForm {
    return StoreService.bank;
  }

  public addNeed(item: Need): void {
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.needs.push(item);
    });
  }

  public editNeed(item: Need): void {
    const index = StoreService.bank.needs.findIndex(
      (need: Need) => need.ref === item.ref
    );
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.needs[index] = item;
    });
  }

  public deleteNeed(item: Need): void {
    const index = StoreService.bank.needs.findIndex(
      (need: Need) => need.ref === item.ref
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
      (product: Product) => product.ref === item.ref
    );
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.products[index] = item;
    });
  }

  public deleteProduct(item: Product): void {
    const index = StoreService.bank.products.findIndex(
      (product: Product) => product.ref === item.ref
    );
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.products.splice(index, 1);
    });
  }

  public addCodelist(item: Codelist): void {
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.codelist.push(item);
    });
  }

  public editCodelist(item: Codelist): void {
    const index = StoreService.bank.codelist.findIndex(
      (codelist: Codelist) => codelist.ref === item.ref
    );
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.codelist[index] = item;
    });
  }

  public deleteCodelist(item: Codelist): void {
    const index = StoreService.bank.codelist.findIndex(
      (codelist: Codelist) => codelist.ref === item.ref
    );
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.codelist.splice(index, 1);
    });
  }

  public addCode(item: Parentable<Code>, codelistId: string): void {
    const codelistIndex = StoreService.bank.codelist.findIndex(
      (codelist: Codelist) => codelist.ref === codelistId
    );
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.codelist[codelistIndex].codes.push(item);
    });
  }

  public editCode(item: Parentable<Code>, codelistId: string): void {
    const codelistIndex = StoreService.bank.codelist.findIndex(
      (codelist: Codelist) => codelist.ref === codelistId
    );
    const codeIndex = StoreService.bank.codelist[codelistIndex].codes.findIndex(
      (code: Code) => code.ref === item.ref
    );
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.codelist[codeIndex].codes[codeIndex] = item;
    });
  }

  public deleteCode(item: Code, codelistId: string): void {
    const codelistIndex = StoreService.bank.codelist.findIndex(
      (codelist: Codelist) => codelist.ref === codelistId
    );
    const codeIndex = StoreService.bank.codelist[codelistIndex].codes.findIndex(
      (code: Code) => code.ref === item.ref
    );
    StoreService.bank = produce(StoreService.bank, (draft) => {
      draft.codelist[codelistIndex].codes.splice(codeIndex, 1);
    });
  }

  public addRequirement(needId: string, requirement: IRequirement): void {
    const needIndex = StoreService.bank.needs.findIndex(
      (need) => need.ref === needId
    );
    if (needIndex !== -1) {
      StoreService.bank.needs[needIndex].requirements.push(requirement);
    }
  }

  public editRequirement(needId: string, requirement: IRequirement): void {
    const needIndex = StoreService.bank.needs.findIndex(
      (need) => need.ref === needId
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
      (need) => need.ref === needId
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
    variant: RequirementVariant
  ): void {
    const needIndex = StoreService.bank.needs.findIndex(
      (need) => need.ref === needId
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
    variant: RequirementVariant
  ): void {
    const needIndex = StoreService.bank.needs.findIndex(
      (need) => need.ref === needId
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
    variant: RequirementVariant
  ): void {
    const needIndex = StoreService.bank.needs.findIndex(
      (need) => need.ref === needId
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
      (need) => need.ref === needId
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
      (need) => need.ref === needId
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
      (need) => need.ref === needId
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
