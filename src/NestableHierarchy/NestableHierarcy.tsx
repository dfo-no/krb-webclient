import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nestable, { Item } from 'react-nestable';
import 'react-nestable/dist/styles/index.css';
import Utils from '../common/Utils';
import { Parentable } from '../models/Parentable';
import { IBaseModel } from '../Nexus/entities/IBaseModel';
import {
  DFOAccordionElement,
  DFOAccordionProvider
} from '../components/DFOAccordion/DFOAccordion';

interface IProps<T extends IBaseModel> {
  dispatchfunc: (itemlist: Parentable<T>[]) => void;
  inputlist: Parentable<T>[];
  component: React.ReactElement;
  depth: number;
}

const NestableHierarcy = <T extends IBaseModel>({
  dispatchfunc,
  inputlist,
  component,
  depth
}: IProps<T>): React.ReactElement => {
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

  const hierarchyList = Utils.parentable2Nestable(inputlist);

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

  const renderItem = (item: Item, handler: React.ReactNode) => {
    return (
      <DFOAccordionElement
        key={item.id}
        eventKey={item.id}
        header={
          <Row>
            <Col sm={8}>{Utils.capitalizeFirstLetter(item.title)}</Col>
            <Col sm={1}>{handler}</Col>
          </Row>
        }
        body={
          <div>
            {item.sourceRel === null &&
              React.cloneElement(component, { element: item })}
            {item.sourceRel !== null && (
              <>
                <p>{item?.description}</p>
                <p>This item is inherited and readonly </p>
              </>
            )}
          </div>
        }
      />
    );
  };

  return (
    <DFOAccordionProvider
      body={
        <Nestable
          items={hierarchyList}
          renderItem={({ item, handler }) => renderItem(item, handler)}
          onChange={(items) => onChange(items)}
          maxDepth={depth}
          handler={<MoreVertIcon />}
        />
      }
    />
  );
};

export default NestableHierarcy;
