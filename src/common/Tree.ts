import { cloneDeep } from 'lodash';
import { IBaseModel } from '../models/IBaseModel';
import { Levelable } from '../models/Levelable';
import ModelType from '../models/ModelType';
import { Nestable } from '../models/Nestable';
import { Parentable } from '../models/Parentable';
import Utils from './Utils';

interface IAcc {
  [key: string]: number;
}

export interface ITreePath {
  id: string;
  title: string;
  parent: string;
}

/**
 *  A tree will only contain a single root, and be in object form
 */
export function createTree<T extends IBaseModel>(
  data: Parentable<T>[]
): Nestable<T> {
  const idMapping = data.reduce((acc: IAcc, el, i) => {
    // eslint-disable-next-line no-param-reassign
    acc[el.id] = i;
    return acc;
  }, {});

  let root: Nestable<IBaseModel> = {
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
export function createPolyTree<T extends IBaseModel>(
  data: Parentable<T>[]
): Nestable<T>[] {
  const idMapping = data.reduce((acc: IAcc, el, i) => {
    // eslint-disable-next-line no-param-reassign
    acc[el.id] = i;
    return acc;
  }, {});

  const root: Nestable<IBaseModel>[] = [];

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

const makePaths = <T extends IBaseModel>(
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

export const getPathsArray = <T extends IBaseModel>(
  id: string,
  data: Parentable<T>[]
): string[][] | string[] => {
  const clone = cloneDeep(data);
  const tree = createPolyTree(clone);

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

export const filterDuplicateArray = (data: string[][]): string[] => {
  const stringArrays = data.map((e) => JSON.stringify(e));
  const uniqueStringArray = new Set(stringArrays);
  const uniqueArray = Array.from(uniqueStringArray, (x) => JSON.parse(x));
  return uniqueArray;
};

export const getPaths = <T extends IBaseModel>(
  ids: string[],
  data: Parentable<T>[]
): Levelable<T>[] => {
  const result: Parentable<T>[] = [];

  ids.forEach((id) => {
    const paths = getPathsArray(id, data);

    // TODO: line 165 to 175 is shit an can possibly be removed og refactored
    const normalizedArray = normalize2DArray(paths);
    const uniqueArray = filterDuplicateArray(normalizedArray);
    uniqueArray.forEach((res) => {
      const need = data.find((n) => n.id === res);
      if (need) {
        const clone = { ...need, children: [] } as Parentable<T>;
        result.push(clone);
      }
    });
  });

  const foo = result.filter(
    (v, i, a) => a.findIndex((t) => t.id === v.id) === i
  );
  return Utils.parentable2Levelable(foo);
};
