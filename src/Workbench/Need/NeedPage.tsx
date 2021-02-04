import React, { ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';
import { Accordion, Button, Card, ListGroup } from 'react-bootstrap';
import { Need } from '../../models/Need';
import styles from './NeedPage.module.scss';
import { RootState } from '../../store/rootReducer';
import { Utils } from '../../common/Utils';
import NewNeedForm from './NewNeedForm';
import { AccordionContext } from './AccordionContext';
import EditNeedForm from './EditNeedForm';

function NeedPage(): ReactElement {
  const { id } = useSelector((state: RootState) => state.selectedProject);
  const { list } = useSelector((state: RootState) => state.project);
  const [activeKey, setActiveKey] = useState('');

  if (list.length === 0 || !id) {
    return <div>Loading NeedPage....</div>;
  }
  let project = Utils.ensure(list.find((banks) => banks.id === id));

  const onOpenClose = (e: any) => {
    setActiveKey(e);
  };

  const renderNeeds = (list: any) => {
    return list.map((element: Need, index: number) => {
      let indexString = (index + 1).toString();
      return (
        <Card key={index}>
          <Accordion.Toggle as={Card.Header} eventKey={indexString}>
            <Button>{element.tittel}</Button>
            <span>&nbsp;{element.beskrivelse}</span>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={indexString}>
            <Card.Body>
              Body&nbsp;{indexString}
              <EditNeedForm project={project} need={element}></EditNeedForm>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      );
    });
  };

  return (
    <AccordionContext.Provider value={{ onOpenClose: onOpenClose }}>
      <ListGroup className={styles.needs}>
        <Accordion activeKey={activeKey} onSelect={onOpenClose}>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              <Button>Add Need</Button>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <NewNeedForm project={project}></NewNeedForm>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          {renderNeeds(project.needs)}
        </Accordion>
      </ListGroup>
    </AccordionContext.Provider>
  );
}

export default NeedPage;
