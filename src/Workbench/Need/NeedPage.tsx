import React, { ReactElement, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { useRouteMatch } from 'react-router';
import Utils from '../../common/Utils';
import { Need } from '../../models/Need';
import { Nestable } from '../../models/Nestable';
import NestableHierarcy from '../../NestableHierarchy/Nestable';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getProjectsThunk,
  putProjectByIdThunk,
  updateNeedList
} from '../../store/reducers/project-reducer';
import { selectProject } from '../../store/reducers/selectedProject-reducer';
import SuccessAlert from '../SuccessAlert';
import EditNeedForm from './EditNeedForm';
import NewNeedForm from './NewNeedForm';

interface RouteParams {
  projectId?: string;
}

function NeedPage(): ReactElement {
  const projectMatch = useRouteMatch<RouteParams>('/workbench/:projectId/need');
  const { id } = useAppSelector((state) => state.selectedProject);
  const { list } = useAppSelector((state) => state.project);
  const [showAlert, setShowAlert] = useState(false);
  const [toggleEditor, setToggleEditor] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [showAlert]);

  useEffect(() => {
    async function fetchEverything() {
      setTimeout(async () => {
        await dispatch(getProjectsThunk());
      }, 10);
    }
    if (!list) {
      fetchEverything();
    }
  }, [dispatch, list]);

  if (projectMatch?.params.projectId) {
    dispatch(selectProject(projectMatch?.params.projectId));
  }

  if (list.length === 0 || !id) {
    return <div>Loading NeedPage....</div>;
  }
  const project = Utils.ensure(list.find((banks) => banks.id === id));

  function newNeed(show: boolean) {
    if (show) {
      return (
        <NewNeedForm toggleAlert={setShowAlert} toggleShow={setToggleEditor} />
      );
    }
    return null;
  }

  const newNeedList = (projectId: string, items: Nestable<Need>[]) => {
    dispatch(updateNeedList({ id: projectId, needs: items }));
    dispatch(putProjectByIdThunk(projectId));
  };

  return (
    <>
      <h3 className="mt-3">{t('Needs')}</h3>
      <Button
        onClick={() => {
          setToggleEditor(true);
        }}
        className="mb-4"
      >
        {t('new need')}
      </Button>
      {showAlert && <SuccessAlert toggleShow={setShowAlert} type="need" />}
      {newNeed(toggleEditor)}
      <NestableHierarcy
        dispatchfunc={(projectId: string, items: Nestable<Need>[]) =>
          newNeedList(projectId, items)
        }
        inputlist={project.needs}
        projectId={id}
        component={<EditNeedForm element={project.needs[0]} />}
        depth={10}
      />
    </>
  );
}

export default NeedPage;
