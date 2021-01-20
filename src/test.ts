import jsonRaw from '../db/master.json';
import { Bank } from './models/Bank';

const bank: Bank[] = jsonRaw.catalogue;

console.log(bank);
// for type-checing the master.json file
