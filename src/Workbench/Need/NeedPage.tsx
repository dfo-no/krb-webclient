import React, { ReactElement, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';

import { useRouteMatch } from 'react-router';
import { Need } from '../../models/Need';
import { RootState } from '../../store/store';
import Utils from '../../common/Utils';
import NewNeedForm from './NewNeedForm';
import EditNeedForm from './EditNeedForm';
import NestableHierarcy from '../../NestableHierarchy/Nestable';
import {
  getProjectsThunk,
  putProjectThunk,
  updateNeedList
} from '../../store/reducers/project-reducer';
import SuccessAlert from '../SuccessAlert';
import { Nestable } from '../../models/Nestable';
import { selectProject } from '../../store/reducers/selectedProject-reducer';

interface RouteParams {
  projectId?: string;
}

function NeedPage(): ReactElement {
  const projectMatch = useRouteMatch<RouteParams>('/workbench/:projectId/need');
  const { id } = useSelector((state: RootState) => state.selectedProject);
  const { list } = useSelector((state: RootState) => state.project);
  const [showAlert, setShowAlert] = useState(false);
  const [toggleEditor, setToggleEditor] = useState(false);
  const dispatch = useDispatch();

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
    dispatch(putProjectThunk(projectId));
  };

  return (
    <>
      <h3 className="mt-3">Needs</h3>
      <Button
        onClick={() => {
          setToggleEditor(true);
        }}
        className="mb-4"
      >
        New Need
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
