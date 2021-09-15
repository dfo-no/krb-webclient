import React, { ReactElement, useState } from 'react';
import { Accordion, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { BsChevronDown } from 'react-icons/bs';
import Utils from '../../common/Utils';
import { Tag } from '../../models/Tag';
import { AccordionContext } from '../../NestableHierarchy/AccordionContext';
import { useAppSelector } from '../../store/hooks';
import EditTagForm from './EditTagForm';

export default function TagList(): ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const [activeKey, setActiveKey] = useState('');
  const onOpenClose = (e: any) => {
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
        <Accordion.Item eventKey={item.id}>
          <Card key={item.id} className="d-flex justify-content-between">
            <Card.Header>
              <Row className="d-flex justify-content-between">
                <h6 className="ml-2 mt-2">
                  {Utils.capitalizeFirstLetter(item.title)}
                </h6>
                <Accordion.Header as={Button} variant="link">
                  <BsChevronDown />
                </Accordion.Header>
              </Row>
            </Card.Header>
            <Accordion.Collapse eventKey={item.id}>
              <Card.Body>
                <EditTagForm tag={item} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
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
