export interface Hierarchical {
  id: string;
  children: Hierarchical[];
  parent: string;
}

class Utils {
  static ensure<T>(
    argument: T | undefined | null,
    message = 'This value was promised to be there.'
  ): T {
    if (argument === undefined || argument === null) {
      throw new TypeError(message);
    }
    return argument;
  }

  static truncate(
    str: string | undefined,
    length = 100,
    ending = '...'
  ): string {
    if (str === undefined) {
      return '';
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    }
    return str;
  }

  // make Generic and make Test".
  static unflatten<T extends Hierarchical>(items: any[]): T[] {
    const hierarchy: T[] = [];
    const mappedArr: { [key: string]: T } = {};

    items.forEach((item) => {
      const Id = item.id;
      if (!Object.prototype.hasOwnProperty.call(mappedArr, Id)) {
        mappedArr[Id] = { ...item };
        mappedArr[Id].children = [];
      }
    });
    Object.keys(mappedArr).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(mappedArr, key)) {
        const mappedElem = mappedArr[key];

        if (mappedElem.parent) {
          const parentId = mappedElem.parent;
          mappedArr[parentId].children.push(mappedElem);
        } else {
          hierarchy.push(mappedElem);
        }
      }
    });

    return hierarchy;
  }
}

export default Utils;
