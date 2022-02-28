import { Item } from 'react-nestable';
import 'react-nestable/dist/styles/index.css';
import { Parentable } from '../models/Parentable';
import { IBaseModel } from '../Nexus/entities/IBaseModel';

const NestableHierarcy = <T extends IBaseModel>(
  dispatch: (item: Parentable<T>, index: number) => void
) => {
  const convertTreeToList = (tree: Item, key: string, collection: Item[]) => {
    if ((!tree[key] || tree[key].length === 0) && collection.includes(tree)) {
      const copiedTree = { ...tree };
      delete copiedTree.children;
      collection.push(copiedTree);
      return;
    }
    if (!collection.includes(tree)) {
      const copiedTree = { ...tree };
      delete copiedTree.children;
      collection.push(copiedTree);
    }
    for (let i = 0; i < tree[key].length; i += 1) {
      const child = tree[key][i];
      child.parent = tree.id === undefined ? '' : tree.id;
      convertTreeToList(child, key, collection);
    }
  };

  const flatten = (list: {
    items: Item[];
    dragItem?: Item;
    targetPath?: number[];
  }) => {
    const flattenedCollection: Item[] = [];
    list.items.forEach((element) => {
      const copy = element;
      copy.parent = '';
      convertTreeToList(element, 'children', flattenedCollection);
    });
    return flattenedCollection;
  };

  const onChange = (items: {
    items: Item[];
    dragItem: Item;
    targetPath: number[];
  }) => {
    // Nestable til Parentable
    const itemList = flatten(items);
    const returnList: Parentable<T>[] = [];
    itemList.forEach((elem) => {
      const clone = { ...elem };
      delete clone.level;
      returnList.push(clone as Parentable<T>);
    });
    const positionOfReturn = returnList.findIndex(
      (item) => item.id === items.dragItem.id
    );

    dispatch(returnList[positionOfReturn], positionOfReturn);
  };

  return { onChange };
};

export default NestableHierarcy;
