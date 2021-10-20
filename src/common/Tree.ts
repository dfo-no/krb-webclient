import { BaseModel } from '../models/BaseModel';
import ModelType from '../models/ModelType';
import { Nestable } from '../models/Nestable';
import { Parentable } from '../models/Parentable';

interface Acc {
  [key: string]: number;
}

/**
 *  A tree will only contain a single root, and be in object form
 */
export function createTree<T extends BaseModel>(
  data: Parentable<T>[]
): Nestable<T> {
  const idMapping = data.reduce((acc: Acc, el, i) => {
    // eslint-disable-next-line no-param-reassign
    acc[el.id] = i;
    return acc;
  }, {});

  let root: Nestable<BaseModel> = {
    id: 'gurba',
    parent: 'A',
    children: [],
    type: ModelType.tag,
    sourceOriginal: '',
    sourceRel: ''
  };

  data.forEach((el) => {
    const element = el as Nestable<T>;
    // Handle the root element
    if (element.parent === '') {
      root = element;

      return;
    }
    // Use our mapping to locate the parent element in our data array
    const parentEl = data[idMapping[element.parent]] as Nestable<T>;
    // Add our current el to its parent's `children` array
    parentEl.children = [
      ...(parentEl.children || []),
      el
    ] as unknown as Nestable<T>[];

    if (!element.children) {
      element.children = [];
    }
  });
  return root as Nestable<T>;
}

/**
 * A PolyTree can contain more than one root, and is always in Array form
 */
export function createPolyTree<T extends BaseModel>(
  data: Parentable<T>[]
): Nestable<T>[] {
  const idMapping = data.reduce((acc: Acc, el, i) => {
    // eslint-disable-next-line no-param-reassign
    acc[el.id] = i;
    return acc;
  }, {});

  const root: Nestable<BaseModel>[] = [];

  data.forEach((el) => {
    const element = el as Nestable<T>;
    // Handle the root element
    if (element.parent === '') {
      root.push(element);

      return;
    }
    // Use our mapping to locate the parent element in our data array
    const parentEl = data[idMapping[element.parent]] as Nestable<T>;
    // Add our current el to its parent's `children` array
    parentEl.children = [
      ...(parentEl.children || []),
      el
    ] as unknown as Nestable<T>[];

    if (!element.children) {
      element.children = [];
    }
  });
  return root as Nestable<T>[];
}

const makePaths = <T extends BaseModel>(
  tags: Nestable<T>[],
  res: { [key: string]: [] } = {},
  prefix: string[] = []
) => {
  tags.forEach((tag) => {
    const values = [...prefix, tag.id];

    if (res[tag.id]) {
      const existing = res[tag.id];
      Object.assign(res, { [tag.id]: [existing, values] });
    } else {
      Object.assign(res, { [tag.id]: values });
    }

    if (tag.children) {
      makePaths(tag.children, res, values);
    }
  });
  return res;
};

export const getPathsArray = <T extends BaseModel>(
  id: string,
  data: Parentable<T>[]
): string[][] | string[] => {
  const tree = createPolyTree(data);
  const paths = makePaths(tree);

  return paths[id] ? paths[id] : [];
};

export const normalize2DArray = (data: string[] | string[][]): string[][] => {
  const result: string[][] = [];
  data.forEach((element) => {
    if (Array.isArray(element[0])) {
      const temp = element as string[];
      temp.forEach((elem2) => {
        const tmp1 = elem2 as unknown as string[];
        result.push(tmp1);
      });
    } else {
      const temp2 = element as string[];
      result.push(temp2);
    }
  });
  return result;
};

export const filterDuplicateArray = (data: string[][]): string[][] => {
  const stringArrays = data.map((e) => JSON.stringify(e));
  const uniqueStringArray = new Set(stringArrays);
  const uniqueArray = Array.from(uniqueStringArray, (x) => JSON.parse(x));
  return uniqueArray;
};

export const getPaths = <T extends BaseModel>(
  id: string,
  data: Parentable<T>[]
): string[][] => {
  const paths = getPathsArray(id, data);
  const normalizedArray = normalize2DArray(paths);
  const uniqueArray = filterDuplicateArray(normalizedArray);
  return uniqueArray;
};
