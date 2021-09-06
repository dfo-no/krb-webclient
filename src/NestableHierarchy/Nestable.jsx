/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { BsChevronDown } from 'react-icons/bs';
import Nestable from 'react-nestable';
import 'react-nestable/dist/styles/index.css';
import Utils from '../common/Utils';
import { AccordionContext } from './AccordionContext';
import css from './Nestable.scss';

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
    list.items.forEach((element) => {
      const copy = element;
      copy.parent = '';
      convertTreeToList(element, 'children', flattenedCollection);
    });
    return flattenedCollection;
  };
  const hierarchyList = Utils.unflatten(inputlist)[0];
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
      <Accordion.Item eventKey={item.id}>
        <Card key={item.id}>
          <Card.Header>
            <Row className="d-flex justify-content-between">
              <h6 className="ml-2 mt-2">
                {Utils.capitalizeFirstLetter(item.title)}
                {collapseIcon}
              </h6>
              <Accordion.Header as={Button} variant="link">
                <BsChevronDown />
              </Accordion.Header>
            </Row>
          </Card.Header>
          <Accordion.Body eventKey={item.id}>
            <Card.Body>
              {React.cloneElement(component, { element: item })}
            </Card.Body>
          </Accordion.Body>
          {handler}
        </Card>
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
