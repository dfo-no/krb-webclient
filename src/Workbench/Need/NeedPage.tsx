import React, { ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';
import { Accordion, Button, Card } from 'react-bootstrap';
import { BsPlusSquare } from 'react-icons/bs';
import { Need } from '../../models/Need';
import css from './NeedPage.module.scss';
import { RootState } from '../../store/rootReducer';
import Utils from '../../common/Utils';
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
  const project = Utils.ensure(list.find((banks) => banks.id === id));

  const onOpenClose = (e = '') => {
    setActiveKey(e);
  };

  const renderNeeds = (needList: Need[]) => {
    return needList.map((element: Need, index: number) => {
      const indexString = (index + 1).toString();
      return (
        <Card key={element.id}>
          <Accordion.Toggle as={Card.Header} eventKey={indexString}>
            <h4>{element.tittel}</h4>
            <span>{element.beskrivelse}</span>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={indexString}>
            <Card.Body>
              <EditNeedForm project={project} need={element} />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      );
    });
  };

  return (
    <AccordionContext.Provider value={{ onOpenClose }}>
      <Accordion
        activeKey={activeKey}
        onSelect={(e) => onOpenClose(e)}
        className={`${css.needs}`}
      >
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            <Button className="iconText">
              <BsPlusSquare />
              <span>Add new need</span>
            </Button>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <NewNeedForm />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        {renderNeeds(project.needs)}
      </Accordion>
    </AccordionContext.Provider>
  );
}

export default NeedPage;
