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
        title: 'A',
        parent: '',
        type: ModelType.need,
        sourceOriginal: null,
        sourceRel: null
      },
      {
        id: 'bb60be0f-44e9-4ea9-a755-476fbc6dd85d',
        title: 'B_1',
        parent: 'aa28e225-7a76-4c57-bb22-ec87b3131762',
        type: ModelType.need,
        sourceOriginal: null,
        sourceRel: null
      },
      {
        id: 'cc60be0f-44e9-4ea9-a755-476fbc6dd855',
        title: 'C_1',
        parent: 'aa28e225-7a76-4c57-bb22-ec87b3131762',
        type: ModelType.need,
        sourceOriginal: null,
        sourceRel: null
      },
      {
        id: 'dd029ba3-aa01-4150-bd43-8d754bcfd890',
        title: 'D_2',
        parent: 'cc60be0f-44e9-4ea9-a755-476fbc6dd855',
        type: ModelType.need,
        sourceOriginal: null,
        sourceRel: null
      },
      {
        id: '0e998bb7-bc0f-41d8-9199-800b46145ba9',
        title: 'F_4',
        parent: 'ee7d9375-aee7-42c2-a6d7-9fa1541d56ef',
        type: ModelType.need,
        sourceOriginal: null,
        sourceRel: null
      },
      {
        id: 'a85deb14-9549-465f-9183-fe9102c4f8e0',
        title: 'O_2',
        parent: 'ee7d9375-aee7-42c2-a6d7-9fa1541d56ef',
        type: ModelType.need,
        sourceOriginal: null,
        sourceRel: null
      },
      {
        id: 'ee7d9375-aee7-42c2-a6d7-9fa1541d56ef',
        title: 'E_3',
        parent: 'dd029ba3-aa01-4150-bd43-8d754bcfd890',
        type: ModelType.need,
        sourceOriginal: null,
        sourceRel: null
      },

      {
        id: 'ffb9bfe0-0b87-4e2d-95c8-9b703e655e61',
        title: 'K',
        parent: '',
        type: ModelType.need,
        sourceOriginal: null,
        sourceRel: null
      },
      {
        id: '1f22e20c-2777-4ff3-880d-20256f6cb931',
        title: 'K_1',
        parent: 'ffb9bfe0-0b87-4e2d-95c8-9b703e655e61',
        type: ModelType.need,
        sourceOriginal: null,
        sourceRel: null
      },
      {
        id: '293b2bc4-a5f5-4c61-9759-814bc68ee9bb',
        title: 'K_2',
        parent: '1f22e20c-2777-4ff3-880d-20256f6cb931',
        type: ModelType.need,
        sourceOriginal: null,
        sourceRel: null
      },
      {
        id: 'a85deb14-9549-465f-9183-fe9102c4f8e0',
        title: 'O_2',
        parent: '1f22e20c-2777-4ff3-880d-20256f6cb931',
        type: ModelType.need,
        sourceOriginal: null,
        sourceRel: null
      }
    ];

    const items = Utils.parentable2Nestable<Car>(cars);

    // Check that the props are correct
    expect(items[1].title).toEqual('K');
    expect(items[0]?.children?.length).toEqual(2);

    const result1 = get(items, `[0].children.1.title`);

    expect(result1).toEqual('C_1');

    const result2 = get(items, `[0].children[1].children[0].title`);
    expect(result2).toEqual('D_2');

    const result3 = get(items, `[0].children[1].children[0].children[0].title`);
    expect(result3).toEqual('E_3');

    const result4 = get(items, `[1].title`);
    expect(result4).toEqual('K');

    // Make sure end-items have children property
    const result5 = get(items, `[1].children`);
    expect(result5.length).toBe(1);

    const result6 = get(
      items,
      `[0].children[1].children[0].children[0].children[0].title`
    );
    expect(result6).toEqual('F_4');

    const result7 = get(
      items,
      `[0].children[1].children[0].children[0].children[0].children`
    );
    expect(result7.length).toBe(0);
  });

  test('Utils.nestable2Levelable', () => {
    const cars: Nestable<Car>[] = [
      {
        id: 'aa28e225-7a76-4c57-bb22-ec87b3131762',
        title: 'A',
        parent: '',
        type: ModelType.need,
        level: 1,
        sourceOriginal: null,
        sourceRel: null,
        children: [
          {
            id: 'bb60be0f-44e9-4ea9-a755-476fbc6dd85d',
            title: 'B_1',
            parent: 'aa28e225-7a76-4c57-bb22-ec87b3131762',
            type: ModelType.need,
            level: 2,
            sourceOriginal: null,
            sourceRel: null
          },
          {
            id: 'cc60be0f-44e9-4ea9-a755-476fbc6dd855',
            title: 'C_1',
            parent: 'aa28e225-7a76-4c57-bb22-ec87b3131762',
            type: ModelType.need,
            level: 2,
            sourceOriginal: null,
            sourceRel: null,
            children: [
              {
                id: 'dd029ba3-aa01-4150-bd43-8d754bcfd890',
                title: 'D_2',
                parent: 'cc60be0f-44e9-4ea9-a755-476fbc6dd855',
                type: ModelType.need,
                level: 3,
                sourceOriginal: null,
                sourceRel: null,
                children: [
                  {
                    id: 'ee7d9375-aee7-42c2-a6d7-9fa1541d56ef',
                    title: 'E_3',
                    parent: 'dd029ba3-aa01-4150-bd43-8d754bcfd890',
                    type: ModelType.need,
                    level: 4,
                    children: [
                      {
                        id: '0e998bb7-bc0f-41d8-9199-800b46145ba9',
                        title: 'F_4',
                        parent: 'ee7d9375-aee7-42c2-a6d7-9fa1541d56ef',
                        type: ModelType.need,
                        level: 5,
                        sourceOriginal: null,
                        sourceRel: null
                      }
                    ],
                    sourceOriginal: null,
                    sourceRel: null
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'ffb9bfe0-0b87-4e2d-95c8-9b703e655e61',
        title: 'K',
        parent: '',
        type: ModelType.need,
        level: 1,
        sourceOriginal: null,
        sourceRel: null
      }
    ];

    const leveled = Utils.nestable2Levelable(cars);

    expect(leveled[0].title).toBe('A');
    expect(leveled[6].title).toBe('K');
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
