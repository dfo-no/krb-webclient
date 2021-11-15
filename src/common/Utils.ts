import { Bank } from '../models/Bank';
import { IBaseModel } from '../models/IBaseModel';
import { INeed } from '../models/INeed';
import { InheritedBank } from '../models/InheritedBank';
import { IProduct } from '../models/IProduct';
import { IVariant } from '../models/IVariant';
import { Levelable } from '../models/Levelable';
import { Nestable } from '../models/Nestable';
import { Parentable } from '../models/Parentable';
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

  static generatePaddingChars(level: number): string {
    if (level === 0) {
      return '';
    }
    return unescape('  '.replace(/ /g, '%A0').repeat(level - 1));
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

  /**
   *
   * @deprecated use nestable2Levelable instead
   */
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

  static findNeedParents(
    element: Nestable<INeed>,
    parents: Nestable<INeed>[],
    selectedProject: Bank
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
    selectedProject: Bank
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

  static findAssociatedRequirements(
    selectedProduct: IProduct,
    selectedProject: Bank
  ): [{ [key: string]: Requirement[] }, Nestable<INeed>[], IVariant[]] {
    const relevantRequirements: { [key: string]: Requirement[] } = {};
    let needList: Nestable<INeed>[] = [];
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

  static checkIfParent<T extends IBaseModel>(
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

  static inheritBank(project: Bank, inheritedBank: Bank): Bank {
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
      date: this.ensure(inheritedBank.publishedDate)
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

  static removeInheritedBank(project: Bank, inheritedBank: string): Bank {
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
      (element: InheritedBank) => element.id !== inheritedBank
    );
    newProject.inheritedBanks = inheritedBanks;
    return newProject;
  }
}

export default Utils;
