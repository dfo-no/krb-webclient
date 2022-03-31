import Nestable, { Item } from 'react-nestable';
import 'react-nestable/dist/styles/index.css';
import { Parentable } from '../../../models/Parentable';
import { Nestable as NestableModel } from '../../../models/Nestable';
import React from 'react';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { BaseModelWithTitleAndDesc } from '../../../models/BaseModelWithTitleAndDesc';
import Utils from '../../../common/Utils';

type NestableElementType =
  | React.ReactElement<any, string | React.JSXElementConstructor<any>>
  | string
  | number
  // eslint-disable-next-line @typescript-eslint/ban-types
  | {}
  | Iterable<React.ReactNode>
  | React.ReactPortal
  | boolean
  | null
  | undefined;

interface IProps<T extends BaseModelWithTitleAndDesc> {
  className?: string;
  inputlist: Parentable<T>[];
  dispatchfunc: (newItems: Parentable<T>[]) => void;
  renderItem: (
    item: Parentable<T>,
    handler: NestableElementType,
    collapseIcon?: NestableElementType
  ) => React.ReactElement;
  depth: number;
  renderCollapseIcon?: (obj: { isCollapsed: boolean }) => React.ReactElement;
}

const NestableHierarcy = <T extends BaseModelWithTitleAndDesc>({
  className,
  inputlist,
  dispatchfunc,
  renderItem,
  depth,
  renderCollapseIcon
}: IProps<T>): React.ReactElement => {
  const nestedList = Utils.parentable2Nestable(inputlist);

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

    dispatchfunc(returnList);
  };

  return (
    <Nestable
      className={className}
      items={nestedList}
      renderItem={({ item, handler, collapseIcon }) => {
        return renderItem(
          Utils.nestable2Parentable(item as NestableModel<T>),
          handler,
          collapseIcon
        );
      }}
      onChange={(items) => onChange(items)}
      maxDepth={depth}
      handler={<DragIndicatorIcon />}
      renderCollapseIcon={renderCollapseIcon}
    />
  );
};

export default NestableHierarcy;
