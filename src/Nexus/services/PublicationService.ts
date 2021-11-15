import { IBank } from '../../models/IBank';
import { IPublication } from '../../models/IPublication';
import DateService from './DateService';

export default class PublicationService {
  getNextVersion = (publications: IPublication[]): number => {
    if (publications.length === 0) {
      return 1;
    }
    return Math.max(...publications.map((p) => p.version)) + 1;
  };

  generateBankFromProject = (item: IBank): IBank => {
    // Shallow clone, deep not needed for now as we don't create anything here
    // other than desciption and title
    const newBank: IBank = { ...item };
    newBank.id = '';
    newBank.publishedDate = DateService.getNowString();
    newBank.projectId = item.id;
    newBank.publications = [];
    newBank.version = this.getNextVersion(item.publications);

    return newBank;
  };
}
