import { Bank } from '../models/Bank';
import { BaseModel } from '../models/BaseModel';
import { BooleanAsString } from '../models/ICheckboxQuestion';
import { IVariant } from '../models/IVariant';
import { Need } from '../models/Need';
import { Nestable } from '../models/Nestable';
import { Product } from '../models/Product';
import { Requirement } from '../models/Requirement';

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

  /* static unflatten<T extends Hierarchical>(
    items: T[]
  ): [T[], { [key: string]: T }] {
    const hierarchy: T[] = [];
    const mappedArr: { [key: string]: T } = {};

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
  } */

  static unflatten<T extends BaseModel>(
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

  static findNeedParents(
    element: Nestable<Need>,
    parents: Nestable<Need>[],
    selectedProject: Bank
  ): Nestable<Need>[] {
    const parentList = parents;
    const parentNeed = Utils.ensure(
      selectedProject.needs.find((need: Need) => need.id === element.parent)
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
    selectedProject: Bank
  ): boolean {
    if (parentId === '') return false;
    const parentProduct = Utils.ensure(
      selectedProject.products.find(
        (product: Product) => product.id === parentId
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

  static findAssociatedRequirements(
    selectedProduct: Product,
    selectedProject: Bank
  ): [{ [key: string]: Requirement[] }, Nestable<Need>[], IVariant[]] {
    const relevantRequirements: { [key: string]: Requirement[] } = {};
    let needList: Nestable<Need>[] = [];
    const variantList: IVariant[] = [];
    selectedProject.needs.forEach((element) => {
      element.requirements.forEach((req: Requirement) => {
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

  static checkIfParent<T extends BaseModel>(
    items: Nestable<T>[],
    id: string
  ): boolean {
    const mappedArray = this.unflatten(items)[1];
    const childArray = mappedArray[id].children;
    if (childArray === undefined) {
      return false;
    }
    if (childArray.length > 0) return true;

    return false;
  }

  static findRequirementText(id: string, variants: IVariant[]): string {
    const variant = Utils.ensure(variants.find((v: IVariant) => v.id === id));
    return variant.requirementText;
  }

  static checkIfNeedHasChildWithRequirements(
    listofneed: Nestable<Need>[],
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
    element: Nestable<Need>,
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
}

export default Utils;
