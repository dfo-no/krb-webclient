import { IBank } from '../Nexus/entities/IBank';
import { IBaseModel } from '../Nexus/entities/IBaseModel';
import { ICodelist } from '../Nexus/entities/ICodelist';
import { ICodelistConfig } from '../Nexus/entities/ICodelistQuestion';
import { INeed } from '../Nexus/entities/INeed';
import { IProduct } from '../Nexus/entities/IProduct';
import { IResponse } from '../Nexus/entities/IResponse';
import { IRequirement } from '../Nexus/entities/IRequirement';
import { ISpecification } from '../Nexus/entities/ISpecification';
import { IVariant } from '../Nexus/entities/IVariant';
import { Levelable, LevelableKRB858 } from '../models/Levelable';
import { Nestable, NestableKRB858 } from '../models/Nestable';
import { Parentable, ParentableKRB858 } from '../models/Parentable';
import { QuestionType } from '../Nexus/entities/QuestionType';
import { QuestionVariant } from '../Nexus/enums';
import { DiscountValuePair } from '../Nexus/entities/ISliderQuestion';
import { TimeDiscountPair } from '../Nexus/entities/ITimeQuestion';
import { DateDiscountPair } from '../Nexus/entities/IPeriodDateQuestion';
import { CodelistForm } from '../api/nexus2';

// TODO: Not sure this type belongs here
export type RefAndParentable<T> = T & { ref: string } & ParentableKRB858;

type NestableToBeFlattened<T extends IBaseModel> = T & {
  parent: string;
  children?: Nestable<T>[];
  level?: number;
};

export type NestableToBeFlattenedKRB858<T> = T & {
  parent: string;
  children?: NestableKRB858<T>[];
  level?: number;
};

class Utils {
  static ensure<T>(
    argument: T | undefined | null,
    message = 'This value was promised to be there.'
  ): T {
    if (argument === undefined || argument === null) {
      throw new TypeError(message);
    }
    return argument;
  }

  static getNextIndexAfterDelete<T>(array: T[], foundIndex: number) {
    if (foundIndex === -1) {
      return -1;
    }
    if (array.length === 0) {
      return null;
    }
    if (foundIndex <= array.length - 1) {
      return foundIndex;
    }

    if (foundIndex > array.length - 1) {
      return array.length - 1;
    }
    return foundIndex;
  }

  static getNextTAfterDelete<T>(array: T[], foundIndex: number) {
    if (foundIndex === -1 || array.length === 0) {
      return null;
    }
    if (foundIndex > array.length - 1) {
      return array[array.length - 1];
    }
    return array[foundIndex];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static assertUnreachable(_x: never): never {
    throw new Error("Didn't expect to get here");
  }

  static replaceElementInList<T extends { id: string }>(
    element: T,
    list: T[]
  ): T[] {
    const newList = [...list];
    const index = newList.findIndex((elem) => elem.id === element.id);
    if (index !== -1) {
      newList.splice(index, 1, element);
    }
    return newList;
  }

  static filterOutDeletedElements<T extends { deletedDate: string | null }>(
    list: T[]
  ): T[] {
    return list.filter((elem) => !elem.deletedDate);
  }

  static addElementToList<T extends { id: string }>(
    element: T,
    list: T[]
  ): T[] {
    const newList = [...list];
    newList.push(element);
    return newList;
  }

  static removeElementFromList<T extends { id: string }>(
    element: T,
    list: T[]
  ): T[] {
    const newList = [...list];
    const index = newList.findIndex((elem) => elem.id === element.id);
    if (index !== -1) {
      newList.splice(index, 1);
    }
    return newList;
  }

  static findDiscountFromCodes(
    codes: string[],
    config: ICodelistConfig
  ): number {
    let discount = 0;
    config.codes.forEach((element) => {
      if (codes.includes(element.code)) {
        discount += element.discount;
        return discount;
      }
      return discount;
    });

    return discount;
  }

  private static dateToValue(dateStr: string): number {
    const date = new Date(dateStr);
    return date.getTime();
  }

  static findDiscountFromDate(
    date: string | null,
    pairs: DateDiscountPair[]
  ): number {
    if (!date) {
      return 0;
    }
    const valuePairs = pairs.reduce(
      (allPairs: DiscountValuePair[], pair: DateDiscountPair) => {
        if (pair.date) {
          allPairs.push({
            id: pair.id,
            value: this.dateToValue(pair.date),
            discount: pair.discount,
          });
        }
        return allPairs;
      },
      []
    );
    return this.findDiscountFromValue(this.dateToValue(date), valuePairs);
  }

  private static timeToValue(timeStr: string): number {
    const date = new Date(timeStr);
    return date.getMinutes() + 60 * date.getHours();
  }

  static findDiscountFromTime(
    time: string | null,
    pairs: TimeDiscountPair[]
  ): number {
    if (!time) {
      return 0;
    }
    const valuePairs = pairs.reduce(
      (allPairs: DiscountValuePair[], pair: TimeDiscountPair) => {
        if (pair.time) {
          allPairs.push({
            id: pair.id,
            value: this.timeToValue(pair.time),
            discount: pair.discount,
          });
        }
        return allPairs;
      },
      []
    );
    return this.findDiscountFromValue(this.timeToValue(time), valuePairs);
  }

  static findDiscountFromValue(
    value: number,
    pairs: DiscountValuePair[]
  ): number {
    let discount = 0;
    pairs.forEach((element) => {
      if (element.value === value) {
        discount += element.discount;
        return discount;
      }
      return discount;
    });

    return discount;
  }

  private static flattenNestable<T extends IBaseModel>(
    items: Nestable<T>[]
  ): Nestable<T>[] {
    return items.reduce((result: Nestable<T>[], current) => {
      if (current.children) {
        const children = Utils.flattenNestable(current.children);
        // eslint-disable-next-line no-param-reassign
        current.children = [];
        result.push(current);
        result.push(...children);
      } else {
        result.push(current);
      }
      return result;
    }, []);
  }

  private static flattenNestableKRB858<T extends RefAndParentable<unknown>>(
    items: NestableKRB858<T>[]
  ): NestableKRB858<T>[] {
    return items.reduce((result: NestableKRB858<T>[], current) => {
      if (current.children) {
        const children = Utils.flattenNestableKRB858(current.children);
        // eslint-disable-next-line no-param-reassign
        current.children = [];
        result.push(current);
        result.push(...children);
      } else {
        result.push(current);
      }
      return result;
    }, []);
  }

  static nestableList2Parentable<T extends IBaseModel>(
    items: Nestable<T>[]
  ): Parentable<T>[] {
    return Utils.flattenNestable(items).map((item) =>
      Utils.nestable2Parentable(item)
    );
  }

  static nestable2Parentable<T extends IBaseModel>(
    item: Nestable<T>
  ): Parentable<T> {
    const parentableItem = { ...item } as NestableToBeFlattened<T>;
    delete parentableItem.level;
    delete parentableItem.children;
    return parentableItem as Parentable<T>;
  }

  static nestable2ParentableKRB858<T extends RefAndParentable<unknown>>(
    item: NestableKRB858<T>
  ): T {
    const parentableItem = { ...item } as NestableToBeFlattenedKRB858<T>;
    delete parentableItem.level;
    delete parentableItem.children;
    return parentableItem;
  }

  static levelable2Parentable<T extends IBaseModel>(
    item: Levelable<T>
  ): Parentable<T> {
    const { level, ...parentableItem } = item;
    return parentableItem as Parentable<T>;
  }

  static nestable2Levelable<T extends IBaseModel>(
    items: Nestable<T>[]
  ): Levelable<T>[] {
    const result = Utils.flattenNestable(items);
    return result as Levelable<T>[]; // TODO: Can we remove as cast?
  }

  static nestable2LevelableKRB858<T extends RefAndParentable<unknown>>(
    items: NestableKRB858<T>[]
  ): LevelableKRB858<T>[] {
    const result = Utils.flattenNestableKRB858(items);
    return result;
  }

  static parentable2Levelable<T extends IBaseModel>(
    items: Parentable<T>[]
  ): Levelable<T>[] {
    const nestable = Utils.parentable2Nestable(items);
    return Utils.nestable2Levelable(nestable);
  }

  static parentable2LevelableKRB858<T extends RefAndParentable<unknown>>(
    items: T[]
  ): LevelableKRB858<T>[] {
    const nestable = Utils.parentable2NestableKRB858(items);
    return Utils.nestable2LevelableKRB858(nestable);
  }

  static parentable2Nestable<T extends IBaseModel>(
    items: Parentable<T>[],
    parent = '',
    level = 1
  ): Nestable<T>[] {
    const out: Nestable<T>[] = [];
    items.forEach((node) => {
      const levelNode = { ...node } as Nestable<T>;
      if (levelNode.parent === parent) {
        levelNode.level = level;
        levelNode.children = Utils.parentable2Nestable(
          items,
          levelNode.id,
          level + 1
        );
        out.push(levelNode);
      }
    });
    return out;
  }

  // TODO: Clean up name
  // TODO: Update tests
  static parentable2NestableKRB858<T extends RefAndParentable<unknown>>(
    items: T[],
    parent = '',
    level = 1
  ): NestableKRB858<T>[] {
    const out: NestableKRB858<T>[] = [];
    items.forEach((node) => {
      const levelNode = { ...node } as NestableKRB858<T>;
      if (levelNode.parent === parent) {
        levelNode.level = level;
        levelNode.children = Utils.parentable2NestableKRB858(
          items,
          levelNode.ref,
          level + 1
        );
        out.push(levelNode);
      }
    });
    return out;
  }

  static checkIfHasChildren<T extends IBaseModel>(
    item: Parentable<T>,
    list: Parentable<T>[]
  ): boolean {
    return list.some((listItem) => listItem.parent === item.id);
  }

  static checkIfProductHasChildren<T extends RefAndParentable<ProductForm>>(
    item: RefAndParentable<T>,
    list: RefAndParentable<T>[]
  ): boolean {
    return list.some(
      (listItem) => listItem.parent === item.ref // TODO && !listItem.deletedDate
    );
  }

  static productUsedInVariants(
    selectedProduct: ProductForm,
    selectedProject: IBank
  ): boolean {
    let returnValue = false;
    selectedProject.needs.forEach((need: Parentable<INeed>) => {
      need.requirements.forEach((requirement: IRequirement) => {
        requirement.variants.forEach((variant: IVariant) => {
          if (
            variant.useProduct &&
            variant.products.some((p) => p === selectedProduct.ref)
          ) {
            returnValue = true;
          }
        });
      });
    });

    return returnValue;
  }

  static codelistUsedInVariants(
    selectedCodelist: CodelistForm,
    needs: NeedForm[]
  ): boolean {
    let returnValue = false;
    selectedProject.needs.forEach((need: Parentable<INeed>) => {
      need.requirements.forEach((requirement: IRequirement) => {
        requirement.variants.forEach((variant: IVariant) => {
          variant.questions.forEach((question: QuestionType) => {
            if (question.type === QuestionVariant.Q_CODELIST) {
              if (question.config.codelist === selectedCodelist.ref) {
                returnValue = true;
              }
            }
          });
        });
      });
    });

    return returnValue;
  }

  static findVariantsUsedByProduct(
    selectedProduct: IProduct,
    selectedProject: IBank,
    extraProducts?: string[]
  ): Parentable<INeed>[] {
    const associatedNeeds: Parentable<INeed>[] = [];

    selectedProject.needs.forEach((need: Parentable<INeed>) => {
      const associatedRequirements: IRequirement[] = [];
      need.requirements.forEach((requirement: IRequirement) => {
        const associatedVariants: IVariant[] = [];
        requirement.variants.forEach((variant: IVariant) => {
          if (
            variant.useProduct &&
            variant.products.some(
              (pid) =>
                pid === selectedProduct.id ||
                (extraProducts && extraProducts.some((p) => p === pid))
            )
          ) {
            associatedVariants.push(variant);
          }
        });
        if (associatedVariants.length > 0) {
          associatedRequirements.push({
            ...requirement,
            variants: associatedVariants,
          });
        }
      });
      if (associatedRequirements.length > 0) {
        associatedNeeds.push({
          ...need,
          requirements: associatedRequirements,
        });
      }
    });

    return associatedNeeds;
  }

  static findVariantsUsedBySpecification(
    selectedProject: IBank
  ): Parentable<INeed>[] {
    const associatedNeeds: Parentable<INeed>[] = [];

    selectedProject.needs.forEach((need: Parentable<INeed>) => {
      const associatedRequirements: IRequirement[] = [];
      need.requirements.forEach((requirement: IRequirement) => {
        const associatedVariants: IVariant[] = [];
        requirement.variants.forEach((variant: IVariant) => {
          if (variant.useSpesification) {
            associatedVariants.push(variant);
          }
        });
        if (associatedVariants.length > 0) {
          associatedRequirements.push({
            ...requirement,
            variants: associatedVariants,
          });
        }
      });
      if (associatedRequirements.length > 0) {
        associatedNeeds.push({
          ...need,
          requirements: associatedRequirements,
        });
      }
    });

    return associatedNeeds;
  }

  static findParentTree<T extends Parentable<IBaseModel>>(
    element: T,
    parentList: T[],
    allElements: T[]
  ): T[] {
    const parentIndex = allElements.findIndex((e) => e.id === element.parent);
    if (parentIndex === -1) {
      return parentList;
    }

    return Utils.findParentTree(
      allElements[parentIndex],
      [allElements[parentIndex], ...parentList],
      allElements
    );
  }

  static isValidResponse = (
    response: IResponse,
    specification: ISpecification
  ): boolean => {
    if (!response.specification || !response.requirementAnswers) {
      return false;
    }

    return response.specification.id === specification.id;
  };

  static hasValidResponses = (
    responses: IResponse[],
    specification: ISpecification
  ): boolean => {
    return responses.some((response) =>
      this.isValidResponse(response, specification)
    );
  };

  static isRecord = (value: unknown): value is Record<string, unknown> => {
    return typeof value === 'object' && value !== null;
  };

  // Based on answers to this question: https://stackoverflow.com/questions/23437476/in-typescript-how-to-check-if-a-string-is-numeric
  // "To steal ideas from one person is plagiarism; to steal from many is research." - https://quoteinvestigator.com/2010/09/20/plagiarism/
  static isNumeric = (value: unknown): value is number => {
    if (value === '' || value === null) return false;
    return !isNaN(Number(value));
  };
}

export default Utils;

export function replaceElementInList<T extends { ref: string }>(
  element: T,
  list: T[]
): T[] {
  const newList = [...list];
  const index = newList.findIndex((elem) => elem.ref === element.ref);
  if (index !== -1) {
    newList.splice(index, 1, element);
  }
  return newList;
}

export function addElementToList<T extends { ref: string }>(
  element: T,
  list: T[]
): T[] {
  const newList = [...list];
  newList.push(element);
  return newList;
}

export function removeElementFromList<T extends { ref: string }>(
  element: T,
  list: T[]
): T[] {
  const newList = [...list];
  const index = newList.findIndex((elem) => elem.ref === element.ref);
  if (index !== -1) {
    newList.splice(index, 1);
  }
  return newList;
}
