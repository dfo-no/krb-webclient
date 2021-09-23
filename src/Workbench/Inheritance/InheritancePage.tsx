import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { InheritedBank } from '../../models/InheritedBank';
import { useAppSelector } from '../../store/hooks';

export default function InheritancePage(): ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const { t } = useTranslation();

  const renderInheritedBanks = (inheritanceList: InheritedBank[]) => {
    inheritanceList
      .slice()
      .sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));
    const projects = inheritanceList.map((element: InheritedBank) => {
      return (
        <>
          <Row className="d-flex justify-content-between ml-1">
            <Col>
              <h5>{element.title}</h5>
            </Col>
          </Row>
          <Row className="ml-1">
            <p>{element.description}</p>
          </Row>
        </>
      );
    });
    return <div className=" mt-5">{projects}</div>;
  };

  return (
    <>
      <h3 className="m-3 ">{t('Avhengigheter')} </h3>
      <Row>
        <Col className="d-flex justify-content-end">
          <Link to="/workbench/:projectId/inheritance/search">
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
