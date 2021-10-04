import { Bank } from '../../models/Bank';
import { Publication } from '../../models/Publication';
import DateService from './DateService';

export default class PublicationService {
  getNextVersion = (publications: Publication[]): number => {
    if (publications.length === 0) {
      return 1;
    }
    return Math.max(...publications.map((p) => p.version)) + 1;
  };

  generateBankFromProject = (item: Bank): Bank => {
    const dateService = new DateService();

    // Shallow clone, deep not needed for now as we don't create anything here
    // other than desciption and title
    const newBank: Bank = { ...item };
    newBank.id = '';
    newBank.publishedDate = dateService.getDate();
    newBank.publications = [];
    newBank.version = this.getNextVersion(item.publications);

    return newBank;
  };
}
