import { BaseModel2, createTree, Parentable2, searchTree } from './Tree';

describe('Tree', () => {
  it('Should be nodeable', () => {
    interface Foo extends BaseModel2 {
      name: string;
    }

    const data: Parentable2<Foo>[] = [
      { id: '56', parent: '62', name: '56' },
      { id: '81', parent: '80', name: '81' },
      { id: '74', parent: null, name: '74' },
      { id: '76', parent: '80', name: '76' },
      { id: '80', parent: '62', name: '80' },
      { id: '80', parent: '86', name: '80' },
      { id: '87', parent: '86', name: '87' },
      { id: '62', parent: '74', name: '62' },
      { id: '86', parent: '74', name: '86' }
    ];

    const tree = createTree(data);
    console.log(JSON.stringify(tree, null, 2));

    const result = searchTree('1', tree);
    console.log(result);
    expect(true).toBeTruthy();
  });
});
