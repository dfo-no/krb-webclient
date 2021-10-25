import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import { BsTrash } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Utils from '../../common/Utils';
import { InheritedBank } from '../../models/InheritedBank';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { putProjectThunk } from '../../store/reducers/project-reducer';

export default function InheritancePage(): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const removeInheritance = (id: string) => {
    const updatedProject = Utils.removeInheritedBank(project, id);
    dispatch(putProjectThunk(updatedProject));
  };

  const renderInheritedBanks = (inheritanceList: InheritedBank[]) => {
    inheritanceList
      .slice()
      .sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));
    const projects = inheritanceList.map((element: InheritedBank) => {
      return (
        <div key={element.id}>
          <Row className="d-flex justify-content-between ml-1">
            <Col>
              <h5>{element.title}</h5>
            </Col>
            <Col className="d-flex justify-content-end">
              <Button onClick={() => removeInheritance(element.id)}>
                <BsTrash />
              </Button>
            </Col>
          </Row>
          <Row className="ml-1">
            <p>{element.description}</p>
          </Row>
        </div>
      );
    });
    return <div className=" mt-5">{projects}</div>;
  };

  return (
    <>
      <h3 className="m-3 ">{t('Avhengigheter')} </h3>
      <Row>
        <Col className="d-flex justify-content-end">
          <Link to={`/workbench/${project.id}/inheritance/explore`}>
            <Button>Utforsk</Button>
          </Link>
        </Col>
      </Row>
      {project.inheritedBanks.length === 0 && (
        <Row>
          <p>Ingen Avhengigheter</p>
        </Row>
      )}
      {renderInheritedBanks(project.inheritedBanks)}
    </>
  );
}
