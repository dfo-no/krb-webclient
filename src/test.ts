import jsonRaw from '../db/master.json';
import { Bank } from './models/Bank';

const bank: Bank[] = jsonRaw.banks;

console.log(bank);
// for type-checing the master.json file
