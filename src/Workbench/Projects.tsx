import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { IBank } from '../Nexus/entities/IBank';
import Nexus from '../Nexus/Nexus';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  deleteProjectThunk,
  selectProject
} from '../store/reducers/project-reducer';

function Projects(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((state) => state.project);
  const { t } = useTranslation();
  const history = useHistory();

  async function onDelete(project: IBank) {
    dispatch(deleteProjectThunk(project));
  }

  const renderProjects = (projectList: IBank[]) => {
    projectList
      .slice()
      .sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));
    const projects = projectList.map((element: IBank) => {
      return (
        <ListGroup.Item key={element.id}>
          {/* TODO: fix styling  */}
          <Row>
            <Col>
              <Link
                to={`/workbench/${element.id}/admin`}
                onClick={() => dispatch(selectProject(element))}
              >
                <h5>{element.title}</h5>
              </Link>
            </Col>
            <Col sm={1} className="p-0">
              <Button variant="warning" onClick={() => onDelete(element)}>
                <DeleteIcon />
              </Button>
            </Col>
          </Row>
          <Row className="ml-1">
            <p>{element.description}</p>
          </Row>
        </ListGroup.Item>
      );
    });
    return <ListGroup className=" mt-5">{projects}</ListGroup>;
  };

  return (
    <>
      <h3 className="mt-3 ">{t('Projects')} </h3>
      <Button
        onClick={() => history.push('/workbench/project/new')}
        variant="primary"
      >
        {t('new project')}
      </Button>
      {renderProjects(list)}
    </>
  );
}

export default Projects;
