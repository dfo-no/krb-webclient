import React, { ReactElement, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Utils from '../../common/Utils';
import { Tag } from '../../models/Tag';
import { AccordionContext } from '../../NestableHierarchy/AccordionContext';
import { useAppSelector } from '../../store/hooks';
import EditTagForm from './EditTagForm';

export default function TagList(): ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const [activeKey, setActiveKey] = useState('');
  const onOpenClose = (e: string | null) => {
    if (e) {
      setActiveKey(e);
    } else {
      setActiveKey('');
    }
  };
  const renderList = () => {
    const sorted = project.tags
      .slice()
      .sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1));
    return sorted.map((item: Tag) => {
      return (
        <Accordion.Item eventKey={item.id} key={item.id}>
          <h2 className="accordion-header">
            <Accordion.Button>
              {Utils.capitalizeFirstLetter(item.title)}
            </Accordion.Button>
          </h2>
          <Accordion.Collapse eventKey={item.id}>
            <Accordion.Body>
              <EditTagForm tag={item} />
            </Accordion.Body>
          </Accordion.Collapse>
        </Accordion.Item>
      );
    });
  };

  return (
    <AccordionContext.Provider value={{ onOpenClose }}>
      <Accordion activeKey={activeKey} onSelect={(e) => onOpenClose(e)}>
        {renderList()}
      </Accordion>
    </AccordionContext.Provider>
  );
}
