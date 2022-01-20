import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import { useTranslation } from 'react-i18next';
import { BsPencil } from 'react-icons/bs';
import { useAppSelector } from '../../../store/hooks';
import {
  getAlbefaticalSortedBanksThunk,
  getBanksThunk,
  getDateSortedBanksThunk
} from '../../../store/reducers/bank-reducer';
import { store } from '../../../store/store';
import EditProjectForm from './EditProjectForm';
import NewPublication from './NewPublication';
import PublicationList from './PublicationList';

function ProjectPage(): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const [editMode, setEditMode] = useState(false);

  const { t } = useTranslation();

  function editProjectForm(edit: boolean) {
    if (edit) {
      return <EditProjectForm toggleShow={setEditMode} />;
    }
    return <></>;
  }

  useEffect(() => {
    store.dispatch(getBanksThunk());
    store.dispatch(getAlbefaticalSortedBanksThunk());
    store.dispatch(getDateSortedBanksThunk());
  }, [project.publications]);

  return (
    <div>
      <Col sm={8}>
        <h3>
          {project.title}
          <Button variant="primary" onClick={() => setEditMode(true)}>
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
