import axios from 'axios';
import { Bank } from '../models/Bank';

export const fetchAllBanks = async () => {
  const response = await axios.get(`http://localhost:3001/banks`);
  return response.data as Bank[];
};
