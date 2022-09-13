import { DateScorePair } from '../Nexus/entities/IPeriodDateQuestion';
import { IBank } from '../Nexus/entities/IBank';
import { IBaseModel } from '../Nexus/entities/IBaseModel';
import { ICodelist } from '../Nexus/entities/ICodelist';
import {
  ICodelistConfig,
  ICodelistQuestion
} from '../Nexus/entities/ICodelistQuestion';
import { INeed } from '../Nexus/entities/INeed';
import { IProduct } from '../Nexus/entities/IProduct';
import { IResponse } from '../Nexus/entities/IResponse';
import { IRequirement } from '../Nexus/entities/IRequirement';
import { ISpecification } from '../Nexus/entities/ISpecification';
import { IVariant } from '../Nexus/entities/IVariant';
import { Levelable } from '../models/Levelable';
import { Nestable } from '../models/Nestable';
import { Parentable } from '../models/Parentable';
import { QuestionType } from '../Nexus/entities/QuestionType';
import { QuestionVariant } from '../Nexus/enums';
import { ScoreValuePair } from '../Nexus/entities/ISliderQuestion';
import { TimeScorePair } from '../Nexus/entities/ITimeQuestion';

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

  static findScoreFromCodes(codes: string[], config: ICodelistConfig): number {
    const mandatorySelected = codes.reduce((sum, code) => {
      const foundCode = config.codes.find(
        (selection) => selection.code === code
      );
      return foundCode && foundCode.mandatory ? sum + 1 : sum;
    }, 0);
    if (mandatorySelected < config.optionalCodeMinAmount) {
      return 0;
    }

    const topMandatory = config.codes
      .filter((selection) => selection.mandatory)
      .sort((a, b) => b.score - a.score)
      .slice(0, config.optionalCodeMinAmount);
    const topRest = config.codes
      .filter(
        (selection) =>
          !topMandatory.some(
            (mandatorySelection) => selection.code === mandatorySelection.code
          )
      )
      .sort((a, b) => b.score - a.score)
      .slice(0, config.optionalCodeMaxAmount - config.optionalCodeMinAmount);
    const maxScore = [...topMandatory, ...topRest].reduce(
      (sum, selection) => sum + selection.score,
      0
    );

    const score = codes.reduce((sum, code) => {
      const foundCode = config.codes.find(
        (selection) => selection.code === code
      );
      return foundCode ? sum + foundCode.score : sum;
    }, 0);

    return maxScore > 0 ? Math.min(score / maxScore, 1) * 100 : 100;
  }

  private static dateToValue(dateStr: string): number {
    const date = new Date(dateStr);
    return date.getTime();
  }

  static findScoreFromDate(
    date: string | null,
    pairs: DateScorePair[]
  ): number {
    if (!date) {
      return 0;
    }
    const valuePairs = pairs.reduce(
      (allPairs: ScoreValuePair[], pair: DateScorePair) => {
        if (pair.date) {
          allPairs.push({
            id: pair.id,
            value: this.dateToValue(pair.date),
            score: pair.score
          });
        }
        return allPairs;
      },
      []
    );
    return this.findScoreFromValue(this.dateToValue(date), valuePairs);
  }

  private static timeToValue(timeStr: string): number {
    const date = new Date(timeStr);
    return date.getMinutes() + 60 * date.getHours();
  }

  static findScoreFromTime(
    time: string | null,
    pairs: TimeScorePair[]
  ): number {
    if (!time) {
      return 0;
    }
    const valuePairs = pairs.reduce(
      (allPairs: ScoreValuePair[], pair: TimeScorePair) => {
        if (pair.time) {
          allPairs.push({
            id: pair.id,
            value: this.timeToValue(pair.time),
            score: pair.score
          });
        }
        return allPairs;
      },
      []
    );
    return this.findScoreFromValue(this.timeToValue(time), valuePairs);
  }

  static findScoreFromValue(value: number, pairs: ScoreValuePair[]): number {
    const exact = pairs.find((svp) => svp.value === value);
    if (exact) {
      return exact.score;
    }
    const sortedHigher = pairs
      .filter((svp) => svp.value > value)
      .sort((a, b) => a.value - b.value);
    const sortedLower = pairs
      .filter((svp) => svp.value < value)
      .sort((a, b) => b.value - a.value);

    if (sortedHigher.length > 0 && sortedLower.length > 0) {
      const higher = sortedHigher[0];
      const lower = sortedLower[0];
      return (
        lower.score +
        ((higher.score - lower.score) / (higher.value - lower.value)) *
          (value - lower.value)
      );
    }
    return 0;
  }

  private static flattenNestable<T extends IBaseModel>(
    items: Nestable<T>[]
  ): Nestable<T>[] {
    return items.reduce((result: Nestable<T>[], current) => {
      if (current.children) {
        const children = Utils.flattenNestable(current.children);
        // eslint-disable-next-line no-param-reassign
        delete current.children;
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
    const parentableItem = { ...item };
    delete parentableItem.level;
    delete parentableItem.children;
    return parentableItem as Parentable<T>;
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
    return result as Levelable<T>[];
  }

  static parentable2Levelable<T extends IBaseModel>(
    items: Parentable<T>[]
  ): Levelable<T>[] {
    const nestable = Utils.parentable2Nestable(items);
    return Utils.nestable2Levelable(nestable);
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

  static checkIfHasChildren<T extends IBaseModel>(
    item: Parentable<T>,
    list: Parentable<T>[]
  ): boolean {
    return list.some((listItem) => listItem.parent === item.id);
  }

  static checkIfProductHasChildren<T extends Parentable<IProduct>>(
    item: Parentable<T>,
    list: Parentable<T>[]
  ): boolean {
    return list.some(
      (listItem) => listItem.parent === item.id && !listItem.deletedDate
    );
  }

  static productUsedInVariants(
    selectedProduct: IProduct,
    selectedProject: IBank
  ): boolean {
    let returnValue = false;
    selectedProject.needs.forEach((need: Parentable<INeed>) => {
      need.requirements.forEach((requirement: IRequirement) => {
        requirement.variants.forEach((variant: IVariant) => {
          if (
            variant.useProduct &&
            variant.products.some((p) => p === selectedProduct.id)
          ) {
            returnValue = true;
          }
        });
      });
    });

    return returnValue;
  }

  static codelistUsedInVariants(
    selectedCodelist: ICodelist,
    selectedProject: IBank
  ): boolean {
    let returnValue = false;
    selectedProject.needs.forEach((need: Parentable<INeed>) => {
      need.requirements.forEach((requirement: IRequirement) => {
        requirement.variants.forEach((variant: IVariant) => {
          variant.questions.forEach((question: QuestionType) => {
            if (question.type === QuestionVariant.Q_CODELIST) {
              if (
                (question as ICodelistQuestion).config.codelist ===
                selectedCodelist.id
              ) {
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
            variants: associatedVariants
          });
        }
      });
      if (associatedRequirements.length > 0) {
        associatedNeeds.push({
          ...need,
          requirements: associatedRequirements
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
            variants: associatedVariants
          });
        }
      });
      if (associatedRequirements.length > 0) {
        associatedNeeds.push({
          ...need,
          requirements: associatedRequirements
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
}

export default Utils;
