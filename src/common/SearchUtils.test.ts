import SearchUtils from './SearchUtils';
import { ICodelist } from '../Nexus/entities/ICodelist';
import { ITag } from '../Nexus/entities/ITag';
import { ModelType } from '../enums';
import { Parentable } from '../models/Parentable';

describe('SearchUtils functions should work', () => {
  test('SearcUtils.searchParentable', () => {
    const tags: Parentable<ITag>[] = [
      {
        id: 'aa28e225-7a76-4c57-bb22-ec87b3131762',
        title: 'A',
        description: '',
        parent: '',
        type: ModelType.tag,
        sourceOriginal: null,
        sourceRel: null
      },
      {
        id: 'bb60be0f-44e9-4ea9-a755-476fbc6dd85d',
        title: 'A_match',
        parent: 'aa28e225-7a76-4c57-bb22-ec87b3131762',
        type: ModelType.tag,
        sourceOriginal: null,
        sourceRel: null
      },
      {
        id: '5d3fd9ec-9096-11ec-b909-0242ac120002',
        title: 'A_2',
        parent: 'aa28e225-7a76-4c57-bb22-ec87b3131762',
        type: ModelType.tag,
        sourceOriginal: null,
        sourceRel: null
      },
      {
        id: 'ffb9bfe0-0b87-4e2d-95c8-9b703e655e61',
        title: 'B',
        description: 'description_match',
        parent: '',
        type: ModelType.tag,
        sourceOriginal: null,
        sourceRel: null
      },
      {
        id: '1a21a3c0-9096-11ec-b909-0242ac120002',
        title: 'C',
        parent: '',
        type: ModelType.tag,
        sourceOriginal: null,
        sourceRel: null
      },
      {
        id: 'bb60be0f-44e9-4ea9-a755-476fbc6dd85d',
        title: 'C_1',
        parent: '1a21a3c0-9096-11ec-b909-0242ac120002',
        type: ModelType.tag,
        sourceOriginal: null,
        sourceRel: null
      }
    ];

    const result = SearchUtils.searchParentable(tags, 'match');

    // Check that the props are correct
    expect(result.length).toEqual(3);
    expect(result[0].title).toEqual('A');
    expect(result[1].title).toEqual('A_match');
    expect(result[2].title).toEqual('B');
  });

  test('SearcUtils.searchBaseModel', () => {
    const tags: ITag[] = [
      {
        id: 'aa28e225-7a76-4c57-bb22-ec87b3131762',
        title: 'A',
        description: '',
        type: ModelType.tag,
        sourceOriginal: null,
        sourceRel: null
      },
      {
        id: 'bb60be0f-44e9-4ea9-a755-476fbc6dd85d',
        title: 'A_match',
        type: ModelType.tag,
        sourceOriginal: null,
        sourceRel: null
      },
      {
        id: 'ffb9bfe0-0b87-4e2d-95c8-9b703e655e61',
        title: 'B',
        description: 'description_match',
        type: ModelType.tag,
        sourceOriginal: null,
        sourceRel: null
      },
      {
        id: '1a21a3c0-9096-11ec-b909-0242ac120002',
        title: 'C',
        type: ModelType.tag,
        sourceOriginal: null,
        sourceRel: null
      }
    ];

    const result = SearchUtils.searchBaseModel(tags, 'match');

    // Check that the props are correct
    expect(result.length).toEqual(2);
    expect(result[0].title).toEqual('A_match');
    expect(result[1].title).toEqual('B');
  });

  test('SearcUtils.searchCodelist', () => {
    const codelists: ICodelist[] = [
      {
        id: 'aa28e225-7a76-4c57-bb22-ec87b3131762',
        title: 'A',
        description: '',
        codes: [
          {
            id: '9ff1ec02-d83b-11ec-9d64-0242ac120002',
            title: 'A',
            description: 'description_match',
            parent: 'aa28e225-7a76-4c57-bb22-ec87b3131762',
            type: ModelType.code,
            sourceOriginal: null,
            sourceRel: null
          }
        ],
        type: ModelType.codelist,
        sourceOriginal: null,
        sourceRel: null
      },
      {
        id: 'bb60be0f-44e9-4ea9-a755-476fbc6dd85d',
        title: 'B_match',
        description: '',
        codes: [],
        type: ModelType.codelist,
        sourceOriginal: null,
        sourceRel: null
      },
      {
        id: '5d3fd9ec-9096-11ec-b909-0242ac120002',
        title: 'C',
        description: '',
        codes: [],
        type: ModelType.codelist,
        sourceOriginal: null,
        sourceRel: null
      },
      {
        id: 'ffb9bfe0-0b87-4e2d-95c8-9b703e655e61',
        title: 'D',
        description: 'description_match',
        codes: [],
        type: ModelType.codelist,
        sourceOriginal: null,
        sourceRel: null
      },
      {
        id: '1a21a3c0-9096-11ec-b909-0242ac120002',
        title: 'E',
        description: '',
        codes: [
          {
            id: '972d15d8-d83b-11ec-9d64-0242ac120002',
            title: 'code_match',
            description: '',
            parent: '1a21a3c0-9096-11ec-b909-0242ac120002',
            type: ModelType.code,
            sourceOriginal: null,
            sourceRel: null
          }
        ],
        type: ModelType.codelist,
        sourceOriginal: null,
        sourceRel: null
      }
    ];

    const result = SearchUtils.searchCodelist(codelists, 'match');

    // Check that the props are correct
    expect(result.length).toEqual(4);
    expect(result[0].title).toEqual('A');
    expect(result[1].title).toEqual('B_match');
    expect(result[2].title).toEqual('D');
    expect(result[3].title).toEqual('E');
  });
});
