import { v4 as uuidv4 } from 'uuid';
import { Bank } from '../models/Bank';
import ModelType from '../models/ModelType';
import Nexus from './Nexus';

test('Nexus', () => {
  const id = uuidv4();
  const bank: Bank = {
    id,
    title: 'En test bank',
    type: ModelType.bank,
    description: '',
    needs: [],
    tags: [],
    codelist: [],
    products: [],
    version: 0,
    inheritedBanks: [],
    publications: []
  };

  const app = Nexus.getInstance();

  const result = app.load(bank).printTitle().getTitle();

  expect(result).toEqual('En test bank');
});
