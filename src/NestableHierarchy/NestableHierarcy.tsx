/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Nestable from 'react-nestable';
import 'react-nestable/dist/styles/index.css';
import Utils from '../common/Utils';
import { AccordionContext } from './AccordionContext';

interface IProps {
  dispatchfunc: (projectId: string, itemlist: any) => void;
  inputlist: any[];
  projectId: string;
  component: React.ReactElement;
  depth: number;
}

/**
 * @deprecated Use NestableHierarcy2 instead. This is kept only as a reference for future bugs
 */
export default function NestableHierarcy({
  dispatchfunc,
  inputlist,
  projectId,
  component,
  depth
}: IProps) {
  useEffect(() => {}, [inputlist]);
  const [activeKey, setActiveKey] = useState('');

  const convertTreeToList = (tree: any, key: string, collection: any[]) => {
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

  const flatten = (list: any) => {
    const flattenedCollection: any[] = [];
    list.items.forEach((element: any) => {
      const copy = element;
      copy.parent = '';
      convertTreeToList(element, 'children', flattenedCollection);
    });
    return flattenedCollection;
  };
  const hierarchyList = Utils.unflatten(inputlist)[0];

  const saveOrder = (items: any) => {
    const itemList = flatten(items);
    dispatchfunc(projectId, itemList);
  };

  const onOpenClose = (e: string | null) => {
    if (e) {
      setActiveKey(e);
    } else {
      setActiveKey('');
    }
  };
  const renderItem = ({ item }: any) => {
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
                <p>{item.description}</p>
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
          items={hierarchyList}
          renderItem={renderItem}
          onChange={saveOrder}
          maxDepth={depth}
        />
      </Accordion>
    </AccordionContext.Provider>
  );
}
