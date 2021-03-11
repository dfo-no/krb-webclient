/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import Nestable from 'react-nestable';
import { Card, Accordion, Button, Row } from 'react-bootstrap';
import { BsChevronDown } from 'react-icons/bs';
import { AccordionContext } from './AccordionContext';
import Utils from '../common/Utils';

export default function NestableHierarcy({
  dispatchfunc,
  inputlist,
  projectId,
  component,
  depth
}) {
  const [activeKey, setActiveKey] = useState('');
  const convertTreeToList = (tree, key, collection) => {
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

  const flatten = (list) => {
    const flattenedCollection = [];
    list.forEach((element) => {
      const copy = element;
      copy.parent = '';
      convertTreeToList(element, 'children', flattenedCollection);
    });
    return flattenedCollection;
  };
  const hierarchyList = Utils.unflatten(inputlist);
  const saveOrder = (items) => {
    const itemList = flatten(items);
    dispatchfunc(projectId, itemList);
  };

  const onOpenClose = (e) => {
    if (e) {
      setActiveKey(e);
    } else {
      setActiveKey('');
    }
  };

  const renderItem = ({ item, collapseIcon, handler }) => {
    return (
      <Card key={item.id}>
        <Card.Header>
          <Row className="d-flex justify-content-between">
            <h6 className="ml-2 mt-2">
              {Utils.capitalizeFirstLetter(item.title)}
              {collapseIcon}
            </h6>
            <Accordion.Toggle as={Button} variant="link" eventKey={item.id}>
              <BsChevronDown />
            </Accordion.Toggle>
          </Row>
        </Card.Header>
        <Accordion.Collapse eventKey={item.id}>
          <Card.Body>
            {React.cloneElement(component, { element: item })}
          </Card.Body>
        </Accordion.Collapse>
        {handler}
      </Card>
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
