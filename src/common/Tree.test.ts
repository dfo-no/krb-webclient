import { get } from 'lodash';
import ModelType from '../models/ModelType';
import { Parentable } from '../models/Parentable';
import { Tag } from '../models/Tag';
import { createPolyTree, createTree, getPaths } from './Tree';

describe('Tree', () => {
  it('createTree', () => {
    const data: Parentable<Tag>[] = [
      {
        id: '76',
        parent: '80',
        title: '76',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      },
      {
        id: '80',
        parent: '62',
        title: '80',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      },
      {
        id: '80',
        parent: '86',
        title: '80',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      },
      {
        id: '87',
        parent: '86',
        title: '87',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      },
      {
        id: '62',
        parent: '74',
        title: '62',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      },
      {
        id: '86',
        parent: '74',
        title: '86',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      },
      {
        id: '56',
        parent: '62',
        title: '56',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      },
      {
        id: '81',
        parent: '80',
        title: '81',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      },
      {
        id: '74',
        parent: '',
        title: '74',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      }
    ];

    const tree = createTree(data);

    expect(get(tree, `id`)).toBe('74');
    expect(get(tree, `title`)).toBe('74');

    expect(get(tree, `children[0].id`)).toBe('62');
    expect(get(tree, `children[0].parent`)).toBe('74');

    expect(get(tree, `children[1].children[0].id`)).toBe('80');
    expect(get(tree, `children[1].children[0].parent`)).toBe('86');
  });

  it('createPolyTree', () => {
    const data: Parentable<Tag>[] = [
      {
        id: '74',
        parent: '',
        title: '74',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      },
      {
        id: '62',
        parent: '74',
        title: '62',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      },
      {
        id: '80',
        parent: '62',
        title: '80',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      },
      {
        id: '80',
        parent: '62',
        title: '80',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      },
      {
        id: '1',
        parent: '',
        title: '1',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      },
      {
        id: '2',
        parent: '1',
        title: '2',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      },
      {
        id: '80',
        parent: '2',
        title: '80',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      }
    ];

    const tree = createPolyTree(data);

    expect(get(tree, `[0].id`)).toBe('74');
    expect(get(tree, `[1].id`)).toBe('1');

    expect(get(tree, `[0].children[0].id`)).toBe('62');
    expect(get(tree, `[0].children[0].parent`)).toBe('74');

    expect(get(tree, `[1].children[0].children[0].id`)).toBe('80');
    expect(get(tree, `[1].children[0].children[0].parent`)).toBe('2');
  });

  it('searchTree', () => {
    const data: Parentable<Tag>[] = [
      {
        id: '74',
        parent: '',
        title: '74',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      },
      {
        id: '62',
        parent: '74',
        title: '62',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      },
      {
        id: '81',
        parent: '62',
        title: '81',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      },
      {
        id: '80',
        parent: '62',
        title: '80',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      },
      {
        id: '80',
        parent: '62',
        title: '80',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      },
      {
        id: '1',
        parent: '',
        title: '1',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      },
      {
        id: '2',
        parent: '1',
        title: '2',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      },
      {
        id: '80',
        parent: '2',
        title: '80',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      }
    ];

    // test multiple paths and found
    const paths1 = getPaths('80', data);
    expect(get(paths1, `[0]`)).toEqual(['74', '62', '80']);
    expect(get(paths1, `[1]`)).toEqual(['1', '2', '80']);

    // test id that does not exist
    const paths2 = getPaths('800', data);
    expect(paths2).toEqual([]);

    // test data that does is empty
    const paths3 = getPaths('800', []);
    expect(paths3).toEqual([]);
  });
});
