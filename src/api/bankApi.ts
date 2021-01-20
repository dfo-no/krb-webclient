import axios from 'axios';
import { Bank } from '../models/Bank';

export const fetchAllBanks = async () => {
  // TODO: rename /catalogue to "banks" or "bank"
  const response = await axios.get(`http://localhost:3001/catalogue`);
  return response.data as Bank[];
};
