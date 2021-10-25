/* eslint-disable class-methods-use-this */
import Utils from '../../common/Utils';
import { Bank } from '../../models/Bank';
import { BaseModel } from '../../models/BaseModel';
import { InheritedBank } from '../../models/InheritedBank';
import { Need } from '../../models/Need';
import { Parentable } from '../../models/Parentable';
import StoreService from './StoreService';
import UuidService from './UuidService';

export default class InheritanceService {
  UuidService = new UuidService();

  private storeService: StoreService;

  public constructor(store: StoreService) {
    this.storeService = store;
  }

  generateInheritance = (inheritedBank: Bank): InheritedBank => {
    return {
      title: inheritedBank.title,
      description: inheritedBank.description,
      id: inheritedBank.id,
      projectId: Utils.ensure(inheritedBank.projectId),
      date: Utils.ensure(inheritedBank.publishedDate)
    };
  };

  private addRelativeProperty<T extends BaseModel>(
    element: T,
    bankId: string
  ): T {
    const newElement = { ...element };
    newElement.sourceRel = bankId;
    return newElement;
  }

  private inheritList<T extends BaseModel>(list: T[], bankId: string): T[] {
    return list.map((element: T) => {
      return this.addRelativeProperty(element, bankId);
    });
  }

  private inheritListwithSublist(
    list: Parentable<Need>[],
    bankId: string
  ): Parentable<Need>[] {
    return list.map((element: Parentable<Need>) => {
      const newElement = { ...element };
      const newRequirementList = this.inheritList(element.requirements, bankId);

      newElement.requirements = newRequirementList;
      return newElement;
    });
  }

  public inheritBank(project: Bank, inheritedBank: Bank): void {
    const newProject = { ...project };

    const newProductList = [
      ...project.products,
      ...this.inheritList(
        inheritedBank.products,
        Utils.ensure(inheritedBank.projectId)
      )
    ];
    const newCodelistList = [
      ...project.codelist,
      ...this.inheritList(
        inheritedBank.codelist,
        Utils.ensure(inheritedBank.projectId)
      )
    ];

    const newNeedList = [
      ...project.needs,
      ...this.inheritList(
        this.inheritListwithSublist(
          inheritedBank.needs,
          Utils.ensure(inheritedBank.projectId)
        ),
        Utils.ensure(inheritedBank.projectId)
      )
    ];
    newProject.needs = newNeedList;
    newProject.products = newProductList;
    newProject.codelist = newCodelistList;

    const newInheritance = this.generateInheritance(inheritedBank);

    const inheritedBanks = [...project.inheritedBanks, newInheritance];
    newProject.inheritedBanks = inheritedBanks;
    this.storeService.setBank(newProject);
  }

  private filterRelativeSourceList<T extends BaseModel>(
    list: T[],
    bankId: string
  ): T[] {
    return list.filter((element) => element.sourceRel !== bankId);
  }

  public removeInheritedBank(project: Bank, inheritedBank: string): void {
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
    this.storeService.setBank(newProject);
  }
}
