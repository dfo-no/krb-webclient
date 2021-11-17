import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Nestable, { Item } from 'react-nestable';
import 'react-nestable/dist/styles/index.css';
import Utils from '../common/Utils';
import { BaseModel } from '../models/BaseModel';
import { Parentable } from '../models/Parentable';
import { AccordionContext } from './AccordionContext';

interface IProps<T extends BaseModel> {
  dispatchfunc: (itemlist: Parentable<T>[]) => void;
  inputlist: Parentable<T>[];
  component: React.ReactElement;
  depth: number;
}

const NestableHierarcy2 = <T extends BaseModel>({
  dispatchfunc,
  inputlist,
  component,
  depth
}: IProps<T>): React.ReactElement => {
  const [activeKey, setActiveKey] = useState('');

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

  const hierarchyList2 = Utils.parentable2Nestable(inputlist);

  const onOpenClose = (e: string | null) => {
    if (e) {
      setActiveKey(e);
    } else {
      setActiveKey('');
    }
  };

  const onChange = (items: {
    items: Item[];
    dragItem: Item;
    targetPath: number[];
  }) => {
    const itemList = flatten(items);
    const returnList: Parentable<T>[] = [];
    itemList.forEach((elem) => {
      const clone = { ...elem };
      delete clone.level;
      returnList.push(clone as Parentable<T>);
    });
    dispatchfunc(returnList);
  };

  const renderItem = (item: Item) => {
    return (
      <Accordion.Item eventKey={item.id}>
        <h2 className="accordion-header">
          <Accordion.Button>
            {Utils.capitalizeFirstLetter(item.title)}
          </Accordion.Button>
        </h2>
        <Accordion.Collapse eventKey={item.id}>
          <Accordion.Body>
            {item.sourceRel === null &&
              React.cloneElement(component, { element: item })}
            {item.sourceRel !== null && (
              <>
                <p>{item?.description}</p>
                <p>This item is inherited and readonly </p>
              </>
            )}
          </Accordion.Body>
        </Accordion.Collapse>
      </Accordion.Item>
    );
  };

  return (
    <AccordionContext.Provider value={{ onOpenClose }}>
      <Accordion activeKey={activeKey} onSelect={(e) => onOpenClose(e)}>
        <Nestable
          items={hierarchyList2}
          renderItem={({ item }) => renderItem(item)}
          onChange={(items) => onChange(items)}
          maxDepth={depth}
        />
      </Accordion>
    </AccordionContext.Provider>
  );
};

export default NestableHierarcy2;
