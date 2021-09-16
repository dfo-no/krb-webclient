import { get } from 'lodash';
import { BaseModel } from '../models/BaseModel';
import ModelType from '../models/ModelType';
import { Parentable } from '../models/Parentable';
import Utils from './Utils';

interface Car extends BaseModel {
  id: string;
  title: string;
  type: ModelType.need;
}

test('Utils.toNestable works', () => {
  const cars: Parentable<Car>[] = [
    {
      id: 'aa28e225-7a76-4c57-bb22-ec87b3131762',
      title: 'Maserati',
      parent: '',
      type: ModelType.need
    },
    {
      id: 'bb60be0f-44e9-4ea9-a755-476fbc6dd85d',
      title: 'Porche',
      parent: 'aa28e225-7a76-4c57-bb22-ec87b3131762',
      type: ModelType.need
    },
    {
      id: 'cc60be0f-44e9-4ea9-a755-476fbc6dd855',
      title: 'Ferrari',
      parent: 'aa28e225-7a76-4c57-bb22-ec87b3131762',
      type: ModelType.need
    },
    {
      id: 'dd029ba3-aa01-4150-bd43-8d754bcfd890',
      title: 'Lamborgini',
      parent: 'cc60be0f-44e9-4ea9-a755-476fbc6dd855',
      type: ModelType.need
    },
    {
      id: 'ee7d9375-aee7-42c2-a6d7-9fa1541d56ef',
      title: 'Fiat',
      parent: 'dd029ba3-aa01-4150-bd43-8d754bcfd890',
      type: ModelType.need
    },
    {
      id: 'ffb9bfe0-0b87-4e2d-95c8-9b703e655e61',
      title: 'Volvo',
      parent: '',
      type: ModelType.need
    }
  ];

  const items = Utils.toNestable<Car>(cars);

  // Check that the props are correct
  expect(items[1].title).toEqual('Volvo');
  expect(items[0]?.children?.length).toEqual(2);

  const result1 = get(items, `[0].children.1.title`);

  expect(result1).toEqual('Ferrari');

  const result2 = get(items, `[0].children[1].children[0].title`);
  expect(result2).toEqual('Lamborgini');

  const result3 = get(items, `[0].children[1].children[0].children[0].title`);
  expect(result3).toEqual('Fiat');

  const result4 = get(items, `[1].title`);
  expect(result4).toEqual('Volvo');

  // Make sure end-items don't have children property
  const result5 = get(items, `[1].children`);
  expect(result5).toBeUndefined();

  const result6 = get(
    items,
    `[0].children[1].children[0].children[0].children`
  );
  expect(result6).toBeUndefined();
});
