import ModelType from '../models/ModelType';
import { Nestable } from '../models/Nestable';
import { ITag } from '../Nexus/entities/ITag';
import SearchUtils from './SearchUtils';

describe('SearchUtils functions should work', () => {
  test('SearcUtils.searcg', () => {
    const tags: Nestable<ITag>[] = [
      {
        id: 'aa28e225-7a76-4c57-bb22-ec87b3131762',
        title: 'A',
        parent: '',
        type: ModelType.tag,
        level: 1,
        sourceOriginal: null,
        sourceRel: null,
        children: [
          {
            id: 'bb60be0f-44e9-4ea9-a755-476fbc6dd85d',
            title: 'A_match',
            parent: 'aa28e225-7a76-4c57-bb22-ec87b3131762',
            type: ModelType.tag,
            level: 2,
            sourceOriginal: null,
            sourceRel: null
          },
          {
            id: '5d3fd9ec-9096-11ec-b909-0242ac120002',
            title: 'A_2',
            parent: 'aa28e225-7a76-4c57-bb22-ec87b3131762',
            type: ModelType.tag,
            level: 2,
            sourceOriginal: null,
            sourceRel: null
          }
        ]
      },
      {
        id: 'ffb9bfe0-0b87-4e2d-95c8-9b703e655e61',
        title: 'B_match',
        parent: '',
        type: ModelType.tag,
        level: 1,
        sourceOriginal: null,
        sourceRel: null
      },
      {
        id: '1a21a3c0-9096-11ec-b909-0242ac120002',
        title: 'C',
        parent: '',
        type: ModelType.tag,
        level: 1,
        sourceOriginal: null,
        sourceRel: null,
        children: [
          {
            id: 'bb60be0f-44e9-4ea9-a755-476fbc6dd85d',
            title: 'C_1',
            parent: '1a21a3c0-9096-11ec-b909-0242ac120002',
            type: ModelType.tag,
            level: 2,
            sourceOriginal: null,
            sourceRel: null
          }
        ]
      }
    ];

    const result = SearchUtils.search(tags, 'match');

    // Check that the props are correct
    expect(result[0].title).toEqual('A');
    expect(result[0]?.children?.length).toEqual(1);
    expect(result[1]?.title).toEqual('B_match');
  });
});
