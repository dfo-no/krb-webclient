import React, { ReactElement, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import { BsPencil } from 'react-icons/bs';
import { useAppSelector } from '../../store/hooks';
import EditProjectForm from './EditProjectForm';
import NewPublication from './NewPublication';
import PublicationList from './PublicationList';

function ProjectPage(): ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const [editMode, setEditMode] = useState(false);

  const { t } = useTranslation();

  function editProjectForm(edit: boolean) {
    if (edit) {
      return <EditProjectForm toggleShow={setEditMode} />;
    }
    return <></>;
  }

  return (
    <div>
      <Col sm={8}>
        <h3>
          {project.title}
          <Button className="ml-3" onClick={() => setEditMode(true)}>
            <BsPencil />
          </Button>
        </h3>
      </Col>
      <h6 className="ml-1 mb-3">{project.description}</h6>
      {editProjectForm(editMode)}
      <h4>{t('publications')}</h4>

      <NewPublication />
      <PublicationList />
    </div>
  );
}

export default ProjectPage;
