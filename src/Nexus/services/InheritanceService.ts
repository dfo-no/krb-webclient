/* eslint-disable class-methods-use-this */
import StoreService from './StoreService';
import Utils from '../../common/Utils';
import UuidService from './UuidService';
import { IBank } from '../entities/IBank';
import { IBaseModel } from '../entities/IBaseModel';
import { IInheritedBank } from '../entities/IInheritedBank';
import { INeed } from '../entities/INeed';
import { ModelType } from '../enums';
import { Parentable } from '../../models/Parentable';

export default class InheritanceService {
  UuidService = new UuidService();

  private storeService: StoreService;

  public constructor(store: StoreService) {
    this.storeService = store;
  }

  generateInheritance = (inheritedBank: IBank): IInheritedBank => {
    return {
      title: inheritedBank.title,
      description: inheritedBank.description,
      id: inheritedBank.id,
      projectId: Utils.ensure(inheritedBank.projectId),
      date: Utils.ensure(inheritedBank.publishedDate),
      type: ModelType.inheritedBank,
      sourceOriginal: inheritedBank.projectId,
      sourceRel: null,
    };
  };

  private addRelativeProperty<T extends IBaseModel>(
    element: T,
    bankId: string
  ): T {
    const newElement = { ...element };
    newElement.sourceRel = bankId;
    return newElement;
  }

  private inheritList<T extends IBaseModel>(list: T[], bankId: string): T[] {
    return list.map((element: T) => {
      return this.addRelativeProperty(element, bankId);
    });
  }

  private inheritListwithSublist(
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

  async inheritBank(project: IBank, inheritedBank: IBank): Promise<void> {
    const newProject = { ...project };

    const newProductList = [
      ...project.products,
      ...this.inheritList(
        inheritedBank.products,
        Utils.ensure(inheritedBank.projectId)
      ),
    ];
    const newCodelistList = [
      ...project.codelist,
      ...this.inheritList(
        inheritedBank.codelist,
        Utils.ensure(inheritedBank.projectId)
      ),
    ];

    const newNeedList = [
      ...project.needs,
      ...this.inheritList(
        this.inheritListwithSublist(
          inheritedBank.needs,
          Utils.ensure(inheritedBank.projectId)
        ),
        Utils.ensure(inheritedBank.projectId)
      ),
    ];
    newProject.needs = newNeedList;
    newProject.products = newProductList;
    newProject.codelist = newCodelistList;

    const newInheritance = this.generateInheritance(inheritedBank);

    const inheritedBanks = [...project.inheritedBanks, newInheritance];
    newProject.inheritedBanks = inheritedBanks;
    return this.storeService.setBank(newProject);
  }

  private filterRelativeSourceList<T extends IBaseModel>(
    list: T[],
    bankId: string
  ): T[] {
    return list.filter((element) => element.sourceRel !== bankId);
  }

  async removeInheritedBank(
    project: IBank,
    inheritedBank: string,
    inheritedId: string
  ): Promise<void> {
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
    return this.storeService.setBank(newProject);
  }
}
