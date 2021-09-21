import { get } from 'lodash';
import { BaseModel } from '../models/BaseModel';
import ModelType from '../models/ModelType';
import { Nestable } from '../models/Nestable';
import { Parentable } from '../models/Parentable';
import Utils from './Utils';

interface Car extends BaseModel {
  id: string;
  title: string;
  type: ModelType.need;
}
describe('Utils functions should work', () => {
  test('Utils.parentable2Nestable', () => {
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
        id: '0e998bb7-bc0f-41d8-9199-800b46145ba9',
        title: 'Moskovich',
        parent: 'ee7d9375-aee7-42c2-a6d7-9fa1541d56ef',
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

    const items = Utils.parentable2Nestable<Car>(cars);

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
      `[0].children[1].children[0].children[0].children[0].title`
    );
    expect(result6).toEqual('Moskovich');

    const result7 = get(
      items,
      `[0].children[1].children[0].children[0].children[0].children`
    );
    expect(result7).toBeUndefined();
  });

  test('Utils.nestable2Levelable', () => {
    const cars: Nestable<Car>[] = [
      {
        id: 'aa28e225-7a76-4c57-bb22-ec87b3131762',
        title: 'Maserati',
        parent: '',
        type: ModelType.need,
        level: 1,
        children: [
          {
            id: 'bb60be0f-44e9-4ea9-a755-476fbc6dd85d',
            title: 'Porche',
            parent: 'aa28e225-7a76-4c57-bb22-ec87b3131762',
            type: ModelType.need,
            level: 2
          },
          {
            id: 'cc60be0f-44e9-4ea9-a755-476fbc6dd855',
            title: 'Ferrari',
            parent: 'aa28e225-7a76-4c57-bb22-ec87b3131762',
            type: ModelType.need,
            level: 2,
            children: [
              {
                id: 'dd029ba3-aa01-4150-bd43-8d754bcfd890',
                title: 'Lamborgini',
                parent: 'cc60be0f-44e9-4ea9-a755-476fbc6dd855',
                type: ModelType.need,
                level: 3,
                children: [
                  {
                    id: 'ee7d9375-aee7-42c2-a6d7-9fa1541d56ef',
                    title: 'Fiat',
                    parent: 'dd029ba3-aa01-4150-bd43-8d754bcfd890',
                    type: ModelType.need,
                    level: 4,
                    children: [
                      {
                        id: '0e998bb7-bc0f-41d8-9199-800b46145ba9',
                        title: 'Moskovich',
                        parent: 'ee7d9375-aee7-42c2-a6d7-9fa1541d56ef',
                        type: ModelType.need,
                        level: 5
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'ffb9bfe0-0b87-4e2d-95c8-9b703e655e61',
        title: 'Volvo',
        parent: '',
        type: ModelType.need,
        level: 1
      }
    ];

    const leveled = Utils.nestable2Levelable(cars);

    expect(leveled[0].title).toBe('Maserati');
    expect(leveled[6].title).toBe('Volvo');
    expect(leveled.length).toBe(7);
  });

  test('Utils.truncate', () => {
    expect(Utils.truncate(undefined)).toEqual('');

    // Possible bug: integer variable is included in the total: Expected result could be 'abcde$'
    expect(Utils.truncate('abcdefghijk', 5, '$')).toEqual('abcd$');

    // Possible bug: emojii is two bytes, and is included in the integer. Expected result should be 'abcde⚛️'
    expect(Utils.truncate('abcdefghijk', 5, '⚛️')).toEqual('abc⚛️');
  });

  test('Utils.capitalizeFirstLetter', () => {
    expect(Utils.capitalizeFirstLetter('bobbo')).toEqual('Bobbo');
    expect(Utils.capitalizeFirstLetter('A')).toEqual('A');
    expect(Utils.capitalizeFirstLetter('a')).toEqual('A');
    expect(Utils.capitalizeFirstLetter('')).toEqual('');
  });
});
