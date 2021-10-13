import Utils from './Utils';

describe('Utils functions should work', () => {
  it('Search pure tree', () => {
    interface Node {
      id: number;
      parentId: number | null;
      children: Node[];
    }

    const tree = {
      id: 1,
      parentId: null,
      children: [
        {
          id: 3,
          parentId: 1,
          children: [
            {
              id: 5,
              parentId: 3,
              children: []
            },
            {
              id: 6,
              parentId: 3,
              children: []
            },
            {
              id: 7,
              parentId: 3,
              children: []
            },
            {
              id: 8,
              parentId: 3,
              children: []
            }
          ]
        },
        {
          id: 10,
          parentId: 1,
          children: [
            {
              id: 11,
              parentId: 10,
              children: [
                {
                  id: 12,
                  parentId: 11,
                  children: []
                },
                {
                  id: 8,
                  parentId: 11,
                  children: []
                }
              ]
            },
            {
              id: 8,
              parentId: 10,
              children: []
            }
          ]
        }
      ]
    };

    const search = (id: number, tree2: Node) => {
      const loop = (path: Node[], node: Node): Node[][] => {
        const newLocal =
          node.id === id
            ? [path]
            : node.children.reduce((acc, child: Node) => {
                return acc.concat(loop([...path, node], child));
              }, [] as Node[][]);
        return newLocal;
      };
      return loop([], tree2);
    };

    const search2 = (id: number, tree2: Node) => {
      const para: Node[] = [];
      const loop = (path: Node[], node: Node): Node[][] => {
        const newLocal =
          node.id === id
            ? [path]
            : node.children.reduce((acc, child: Node) => {
                return acc.concat(loop([...path, node], child));
              }, [] as Node[][]);
        return newLocal;
      };
      return loop(para, tree2);
    };

    const paths1 = search(8, tree);
    expect(paths1.length).toBe(3);

    const paths2 = search2(8, tree);
    expect(paths2.length).toBe(3);

    // console.log(paths2);
    // console.log(paths2.map((path) => path.map((node) => node.id)));

    expect(true).toBeTruthy();
    /**
 * [
        [
          { id: 1, parentId: null, children: [Array] },
          { id: 3, parentId: 1, children: [Array] }
        ],
        [
          { id: 1, parentId: null, children: [Array] },
          { id: 10, parentId: 1, children: [Array] },
          { id: 11, parentId: 10, children: [Array] }
        ],
        [
          { id: 1, parentId: null, children: [Array] },
          { id: 10, parentId: 1, children: [Array] }
        ]
      ]

 *
 */

    // console.log(paths.map((path: any) => path.map((node: any) => node.id)));
  });

  it('Search polytree', () => {
    interface Node {
      id: number;
      parentId: number | null;
      children: Node[];
    }

    type PolyTree = Node[];

    const polyTree: PolyTree = [
      {
        id: 1,
        parentId: null,
        children: [
          {
            id: 3,
            parentId: 1,
            children: [
              {
                id: 5,
                parentId: 3,
                children: []
              },
              {
                id: 6,
                parentId: 3,
                children: []
              },
              {
                id: 7,
                parentId: 3,
                children: []
              },
              {
                id: 8,
                parentId: 3,
                children: []
              }
            ]
          },
          {
            id: 10,
            parentId: 1,
            children: [
              {
                id: 11,
                parentId: 10,
                children: [
                  {
                    id: 12,
                    parentId: 11,
                    children: []
                  },
                  {
                    id: 8,
                    parentId: 11,
                    children: []
                  }
                ]
              },
              {
                id: 8,
                parentId: 10,
                children: []
              }
            ]
          }
        ]
      },
      {
        id: 60,
        parentId: null,
        children: [
          {
            id: 61,
            parentId: 60,
            children: [{ id: 88, parentId: 61, children: [] }]
          },
          {
            id: 8,
            parentId: 10,
            children: []
          }
        ]
      },
      {
        id: 70,
        parentId: null,
        children: []
      }
    ];

    //interface Paths =

    const searchPolyTree = (id: number, tree2: PolyTree) => {
      const loop = (path: Node[], node: Node): Node[][] => {
        const newLocal =
          node.id === id
            ? [path]
            : node.children.reduce((acc, child: Node) => {
                return acc.concat(loop([...path, node], child));
              }, [] as Node[][]);
        return newLocal;
      };
      const result = [];

      tree2.forEach((n) => {
        const nodeResult = loop([], n);
        // console.log(nodeResult);
        if (nodeResult.length === 0) {
          //console.log('Not found in this root node');
        } else {
          result.push(nodeResult);
        }
      });
      return result;
    };
    const paths = searchPolyTree(8, polyTree);
    // console.log(paths);
    expect(paths.length).toBe(2);
    expect(paths[0].length).toBe(3);
    expect(paths[1].length).toBe(1);
    /* paths.forEach((v) => {
      v.forEach((r) => {
        r.forEach((g) => {
          //console.log(g.id);
        });
      });
    }); */
    // expect(paths[0])
    // console.log(paths);
    // console.log(paths);
    // console.log(paths.map((path) => path.map((node) => node.id)));

    // console.log(JSON.stringify(paths, null, 2));
    // console.log(paths);
  });
});
