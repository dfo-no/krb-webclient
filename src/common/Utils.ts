import { DateScorePair } from '../Nexus/entities/IPeriodDateQuestion';
import { IBank } from '../Nexus/entities/IBank';
import { IBaseModel } from '../Nexus/entities/IBaseModel';
import { ICodelist } from '../Nexus/entities/ICodelist';
import {
  ICodelistConfig,
  ICodelistQuestion
} from '../Nexus/entities/ICodelistQuestion';
import { IInheritedBank } from '../models/IInheritedBank';
import { INeed } from '../Nexus/entities/INeed';
import { IProduct } from '../Nexus/entities/IProduct';
import { IRequirement } from '../Nexus/entities/IRequirement';
import { IVariant } from '../Nexus/entities/IVariant';
import { Levelable } from '../models/Levelable';
import { Nestable } from '../models/Nestable';
import { Parentable } from '../models/Parentable';
import { QuestionType } from '../models/QuestionType';
import { QuestionVariant } from '../enums';
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

  static truncate(
    str: string | undefined,
    length = 100,
    ending = '...'
  ): string {
    if (str === undefined) {
      return '';
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    }
    return str;
  }

  static capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  static generatePaddingChars(level: number): string {
    if (level === 0) {
      return '';
    }
    return unescape('  '.replace(/ /g, '%A0').repeat(level - 1));
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

  /* static nestable2Parentable<T extends IBaseModel>(item: Nestable<T>) {
    const tmp = { ...item };
    if (tmp.children) {
      delete tmp.children;
    }
    if (tmp.level) {
      delete tmp.level;
    }
    return item as Parentable<T>;
  } */

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
        const children = Utils.parentable2Nestable(
          items,
          levelNode.id,
          level + 1
        );
        // if (children.length) {
        levelNode.children = children;
        // }
        out.push(levelNode);
      }
    });
    return out;
  }

  /**
   * @@deprecated use parentable2Nestable instead
   */
  static toNestable<T extends IBaseModel>(
    items: Parentable<T>[]
  ): Nestable<T>[] {
    const hierarchy: Nestable<T>[] = [];
    const mappedArr: { [key: string]: Nestable<T> } = {};
    items.forEach((item) => {
      const Id = item.id;
      if (!Object.prototype.hasOwnProperty.call(mappedArr, Id)) {
        mappedArr[Id] = { ...item };
      }
    });
    Object.keys(mappedArr).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(mappedArr, key)) {
        const mappedElem = mappedArr[key];

        if (mappedElem.parent) {
          const parentId = mappedElem.parent;
          const parent = mappedArr[parentId];
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(mappedElem);
        } else {
          hierarchy.push(mappedElem);
        }
      }
    });
    return hierarchy;
  }

  static unflatten<T extends IBaseModel>(
    items: Nestable<T>[]
  ): [Nestable<T>[], { [key: string]: Nestable<T> }] {
    const hierarchy: Nestable<T>[] = [];
    const mappedArr: { [key: string]: Nestable<T> } = {};
    items.forEach((item) => {
      const Id = item.id;
      if (!Object.prototype.hasOwnProperty.call(mappedArr, Id)) {
        mappedArr[Id] = { ...item };
        mappedArr[Id].children = [];
      }
    });
    Object.keys(mappedArr).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(mappedArr, key)) {
        const mappedElem = mappedArr[key];

        if (mappedElem.parent) {
          const parentId = mappedElem.parent;
          const parent = mappedArr[parentId];
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(mappedElem);
        } else {
          hierarchy.push(mappedElem);
        }
      }
    });
    return [hierarchy, mappedArr];
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

  static findNeedParents(
    element: Nestable<INeed>,
    parents: Nestable<INeed>[],
    selectedProject: IBank
  ): Nestable<INeed>[] {
    const parentList = parents;
    const parentNeed = Utils.ensure(
      selectedProject.needs.find((need: INeed) => need.id === element.parent)
    );
    parentList.push(parentNeed);
    if (parentNeed.parent !== '') {
      Utils.findNeedParents(parentNeed, parentList, selectedProject);
    }
    return parentList;
  }

  static checkParentInProductList(
    products: string[],
    parentId: string,
    selectedProject: IBank
  ): boolean {
    if (parentId === '') return false;
    const parentProduct = Utils.ensure(
      selectedProject.products.find(
        (product: IProduct) => product.id === parentId
      )
    );
    if (products.includes(parentId)) {
      return true;
    }

    if (parentProduct.parent !== '') {
      return Utils.checkParentInProductList(
        products,
        parentProduct.parent,
        selectedProject
      );
    }

    return false;
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
    selectedProject: IBank
  ): Parentable<INeed>[] {
    const associatedNeeds: Parentable<INeed>[] = [];

    selectedProject.needs.forEach((need: Parentable<INeed>) => {
      const associatedRequirements: IRequirement[] = [];
      need.requirements.forEach((requirement: IRequirement) => {
        const associatedVariants: IVariant[] = [];
        requirement.variants.forEach((variant: IVariant) => {
          if (
            variant.useProduct &&
            variant.products.some((p) => p === selectedProduct.id)
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

  static findVariantsUsedBySpesification(
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

  static findAssociatedRequirements(
    selectedProduct: IProduct,
    selectedProject: IBank
  ): [{ [key: string]: IRequirement[] }, Nestable<INeed>[], IVariant[]] {
    const relevantRequirements: { [key: string]: IRequirement[] } = {};
    let needList: Nestable<INeed>[] = [];
    const variantList: IVariant[] = [];
    selectedProject.needs.forEach((element) => {
      element.requirements.forEach((req: IRequirement) => {
        req.variants.forEach((variant: IVariant) => {
          if (
            variant.products.includes(selectedProduct.id) ||
            Utils.checkParentInProductList(
              variant.products,
              selectedProduct.parent,
              selectedProject
            )
          ) {
            variantList.push(variant);
            if (element.id in relevantRequirements) {
              const prevArray = relevantRequirements[element.id];
              relevantRequirements[element.id] = [...prevArray, req];
              needList.push(element);
              if (
                !needList.some((e) => e.id === element.parent) &&
                element.parent.length > 0
              ) {
                const parentNeed = Utils.ensure(
                  selectedProject.needs.find(
                    (need) => need.id === element.parent
                  )
                );
                needList.push(parentNeed);
              }
            } else {
              relevantRequirements[element.id] = [];
              relevantRequirements[element.id] = [req];
              needList.push(element);
              if (
                !needList.some((e) => e.id === element.parent) &&
                element.parent.length > 0
              ) {
                const parentList = Utils.findNeedParents(
                  element,
                  [],
                  selectedProject
                );
                needList = [...needList, ...parentList];
              }
            }
          }
        });
      });
    });
    return [relevantRequirements, needList, variantList];
  }

  /*
    Checks if this object has any subneeds
  */
  static checkIfParent<T extends IBaseModel>(
    items: Nestable<T>[],
    id: string
  ): boolean {
    const mappedArray = this.unflatten(items)[1];
    const childArray = mappedArray[id].children;
    if (childArray === undefined) {
      return false;
    }
    return childArray.length > 0;
  }

  static findRequirementText(id: string, variants: IVariant[]): string {
    const variant = Utils.ensure(variants.find((v: IVariant) => v.id === id));
    return variant.requirementText;
  }

  static checkIfNeedHasChildWithRequirements(
    listofneed: Nestable<INeed>[],
    requirementList: string[]
  ): boolean {
    let foundMatch = false;
    listofneed.forEach((element) => {
      if (element.requirements.length > 0) {
        element.requirements.forEach((requirement) => {
          if (requirementList.includes(requirement.id)) foundMatch = true;
        });
        return foundMatch;
      }
      if (element.children && element.children.length > 0) {
        return Utils.checkIfNeedHasChildWithRequirements(
          element.children,
          requirementList
        );
      }
      return foundMatch;
    });
    return foundMatch;
  }

  static checkIfNeedHasSelectedRequirements(
    element: Nestable<INeed>,
    requirementList: string[]
  ): boolean {
    let used = false;
    if (element.requirements.length > 0) {
      element.requirements.forEach((requirement) => {
        if (requirementList.includes(requirement.id)) used = true;
      });
    }
    if (element.children && element.children.length > 0 && !used) {
      used = Utils.checkIfNeedHasChildWithRequirements(
        element.children,
        requirementList
      );
    }
    return used;
  }

  static calculateCheckBoxPoints(
    weightTrue: number,
    weightFalse: number,
    answer: boolean
  ): number {
    if (answer) {
      return weightTrue;
    }
    return weightFalse;
  }

  static addRelativeProperty<T extends IBaseModel>(
    element: T,
    bankId: string
  ): T {
    const newElement = { ...element };
    newElement.sourceRel = bankId;
    return newElement;
  }

  static inheritList<T extends IBaseModel>(list: T[], bankId: string): T[] {
    return list.map((element: T) => {
      return this.addRelativeProperty(element, bankId);
    });
  }

  static inheritListwithSublist(
    list: Parentable<INeed>[],
    bankId: string
  ): Parentable<INeed>[] {
    return list.map((element: Parentable<INeed>) => {
      const newElement = { ...element };
      const newRequirementList = this.inheritList(element.requirements, bankId);

      newElement.requirements = newRequirementList;
      return newElement;
    });
  }

  static inheritBank(project: IBank, inheritedBank: IBank): IBank {
    const newProject = { ...project };

    const newProductList = [
      ...project.products,
      ...this.inheritList(
        inheritedBank.products,
        this.ensure(inheritedBank.projectId)
      )
    ];
    const newCodelistList = [
      ...project.codelist,
      ...this.inheritList(
        inheritedBank.codelist,
        this.ensure(inheritedBank.projectId)
      )
    ];

    const newNeedList = [
      ...project.needs,
      ...this.inheritList(
        this.inheritListwithSublist(
          inheritedBank.needs,
          this.ensure(inheritedBank.projectId)
        ),
        this.ensure(inheritedBank.projectId)
      )
    ];
    newProject.needs = newNeedList;
    newProject.products = newProductList;
    newProject.codelist = newCodelistList;

    const newInheritance = {
      title: inheritedBank.title,
      description: inheritedBank.description,
      id: inheritedBank.id,
      projectId: this.ensure(inheritedBank.projectId),
      date: this.ensure(inheritedBank.publishedDate),
      type: inheritedBank.type,
      sourceRel: inheritedBank.sourceRel,
      sourceOriginal: inheritedBank.sourceOriginal
    };
    const inheritedBanks = [...project.inheritedBanks, newInheritance];
    newProject.inheritedBanks = inheritedBanks;
    return newProject;
  }

  static filterRelativeSourceList<T extends IBaseModel>(
    list: T[],
    bankId: string
  ): T[] {
    return list.filter((element) => element.sourceRel !== bankId);
  }

  static removeInheritedBank(
    project: IBank,
    inheritedBank: string,
    inheritedId: string
  ): IBank {
    const newProject = { ...project };

    const newProductList = this.filterRelativeSourceList(
      project.products,
      inheritedBank
    );

    const newCodelistList = this.filterRelativeSourceList(
      project.codelist,
      inheritedBank
    );

    const newNeedList = this.filterRelativeSourceList(
      project.needs,
      inheritedBank
    );
    newProject.needs = newNeedList;
    newProject.products = newProductList;
    newProject.codelist = newCodelistList;

    const inheritedBanks = project.inheritedBanks.filter(
      (element: IInheritedBank) => element.id !== inheritedId
    );
    newProject.inheritedBanks = inheritedBanks;
    return newProject;
  }
}

export default Utils;
