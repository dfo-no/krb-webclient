import React, { ReactElement, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

import { Need } from '../../models/Need';
import { RootState } from '../../store/store';
import Utils from '../../common/Utils';
import NewNeedForm from './NewNeedForm';
import EditNeedForm from './EditNeedForm';
import NestableHierarcy from '../../NestableHierarchy/Nestable';
import {
  putProjectThunk,
  updateNeedList
} from '../../store/reducers/project-reducer';
import SuccessBobbo from '../SuccessBobbo';

function NeedPage(): ReactElement {
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

  const newNeedList = (projectId: string, items: Need[]) => {
    dispatch(updateNeedList({ id: projectId, needs: items }));
    dispatch(putProjectThunk(projectId));
  };

  return (
    <>
      <h3>Needs</h3>
      <Button
        onClick={() => {
          setToggleEditor(true);
        }}
        className="mb-4"
      >
        New Need
      </Button>
      {showAlert && <SuccessBobbo toggleShow={setShowAlert} type="need" />}
      {newNeed(toggleEditor)}
      <NestableHierarcy
        dispatchfunc={(projectId: string, items: Need[]) =>
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
