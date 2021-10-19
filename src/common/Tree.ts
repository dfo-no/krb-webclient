export type Nestable2<T extends BaseModel2> = T & {
  parent: string;
  children: Nestable2<T>[];
};

export type Parentable2<T extends BaseModel2> = T & {
  parent: string | null;
};

export interface BaseModel2 {
  id: string;
}

interface Acc {
  [key: string]: number;
}

export function createTree<T extends BaseModel2>(
  data: Parentable2<T>[]
): Nestable2<T> {
  const idMapping = data.reduce((acc: Acc, el, i) => {
    // eslint-disable-next-line no-param-reassign
    acc[el.id] = i;
    return acc;
  }, {});

  let root: Nestable2<BaseModel2> = {
    id: 'gurba',
    parent: 'A',
    children: []
  };

  data.forEach((el) => {
    const element = el as Nestable2<T>;
    // Handle the root element
    if (element.parent === null) {
      root = element;

      return;
    }
    // Use our mapping to locate the parent element in our data array
    const parentEl = data[idMapping[element.parent]] as Nestable2<T>;
    // Add our current el to its parent's `children` array
    parentEl.children = [
      ...(parentEl.children || []),
      el
    ] as unknown as Nestable2<T>[];

    if (!element.children) {
      element.children = [];
    }
  });
  return root as Nestable2<T>;
}

export function searchTree<T extends BaseModel2>(
  id: string,
  tree2: Nestable2<T>
): Nestable2<T>[] | Nestable2<T>[][] {
  const loop = (
    path: Array<typeof node>,
    node: Nestable2<T>
  ): Nestable2<T>[] | Nestable2<T>[][] => {
    return node.id === id
      ? [node]
      : node.children.reduce((acc: Nestable2<T>[][], child: Nestable2<T>) => {
          return acc.concat(loop([...path, node], child));
        }, []);
  };

  return loop([], tree2);
}

// export function searchPolyTree<T extends BaseModel2(id: string, tree3, Nestable2<T>) {

//}
