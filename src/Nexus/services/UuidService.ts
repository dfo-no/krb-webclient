import { v4 as uuidv4 } from 'uuid';

export default class UuidService {
  generateId = (): string => {
    return uuidv4();
  };
}
