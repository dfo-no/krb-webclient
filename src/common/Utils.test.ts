import { BaseModel } from '../models/BaseModel';
import ModelType from '../models/ModelType';
import { Nestable } from '../models/Nestable';
import Utils from './Utils';

// eslint-disable-next-line jest/no-export
export interface Car extends BaseModel {
  id: string;
  title: string;
  type: ModelType.need;
}

test('Utils.unflatten is type safe', () => {
  const cars: Nestable<Car>[] = [
    {
      id: 'ad28e225-7a76-4c57-bb22-ec87b3131762',
      title: 'Maserati',
      parent: '',
      type: ModelType.need
    },
    {
      id: '4f60be0f-44e9-4ea9-a755-476fbc6dd85d',
      title: 'MG',
      parent: 'ad28e225-7a76-4c57-bb22-ec87b3131762',
      type: ModelType.need
    },
    {
      id: 'ca029ba3-aa01-4150-bd43-8d754bcfd890',
      title: 'Porche',
      parent: 'ad28e225-7a76-4c57-bb22-ec87b3131762',
      type: ModelType.need
    },
    { id: 'dddd', title: 'leaf', parent: '', type: ModelType.need }
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [items] = Utils.unflatten(cars);

  expect(true).toBeTruthy();
});
