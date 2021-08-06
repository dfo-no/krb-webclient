import React, { ReactElement, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { BsPencil } from 'react-icons/bs';
import { useRouteMatch } from 'react-router';
import Utils from '../../common/Utils';
import { Bank } from '../../models/Bank';
import { Code } from '../../models/Code';
import { Codelist } from '../../models/Codelist';
import NestableHierarcy from '../../NestableHierarchy/Nestable';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  putProjectByIdThunk,
  updateCodeList
} from '../../store/reducers/project-reducer';
import { selectCodeList } from '../../store/reducers/selectedCodelist-reducer';
import { selectProject } from '../../store/reducers/selectedProject-reducer';
import SuccessAlert from '../SuccessAlert';
import EditCodeForm from './EditCodeForm';
import EditCodeListForm from './EditCodeListForm';
import NewCodeForm from './NewCodeForm';

interface RouteParams {
  projectId: string;
  codelistId?: string;
}

export default function CodeListEditor(): ReactElement {
  const projectMatch = useRouteMatch<RouteParams>(
    '/workbench/:projectId/codelist/:codelistId'
  );
  const dispatch = useAppDispatch();

  if (projectMatch?.params.projectId && projectMatch?.params.codelistId) {
    dispatch(selectProject(projectMatch?.params.projectId));
    dispatch(selectCodeList(projectMatch?.params.codelistId));
  }
  const { list } = useAppSelector((state) => state.project);
  const { id } = useAppSelector((state) => state.selectedProject);
  const { listId } = useAppSelector((state) => state.selectedCodeList);
  const [toggleEditor, setToggleEditor] = useState(false);
  const [editmode, setEditMode] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [showAlert]);

  if (list.length === 0 || !id) {
    return <p>Loading codelist editor...</p>;
  }
  if (!listId) {
    return <p>Please select a codelist</p>;
  }

  const selectedProject = Utils.ensure(
    list.find((bank: Bank) => bank.id === id)
  );
  const selectedCodeList = Utils.ensure(
    selectedProject.codelist.find(
      (codelist: Codelist) => codelist.id === listId
    )
  );

  function editCodeList(edit: boolean) {
    if (edit) {
      return (
        <EditCodeListForm
          toggleShow={setEditMode}
          codelistId={selectedCodeList.id}
        />
      );
    }
    return <></>;
  }

  function codeListEditor(show: boolean) {
    if (show) {
      return (
        <NewCodeForm
          codelistId={selectedCodeList.id}
          toggleShow={setToggleEditor}
          toggleAlert={setShowAlert}
        />
      );
    }
    return <></>;
  }

  const newListofCodes = (projectId: string, items: Code[]) => {
    dispatch(
      updateCodeList({ id: projectId, codes: items, codelistId: listId })
    );
    dispatch(putProjectByIdThunk(projectId));
  };

  return (
    <>
      <Row className="m-1">
        <h3>Codelist: {selectedCodeList.title}</h3>
        <Button className="ml-3" onClick={() => setEditMode(true)}>
          <BsPencil />
        </Button>
      </Row>
      <p className="ml-1 mb-4">{selectedCodeList.description}</p>
      {editCodeList(editmode)}
      <h5>Codes</h5>
      <Button onClick={() => setToggleEditor(true)} className="mb-4">
        New Code
      </Button>
      {showAlert && <SuccessAlert toggleShow={setShowAlert} type="code" />}
      {codeListEditor(toggleEditor)}
      <NestableHierarcy
        dispatchfunc={(projectId: string, items: Code[]) =>
          newListofCodes(projectId, items)
        }
        inputlist={selectedCodeList.codes}
        projectId={id}
        component={<EditCodeForm element={selectedCodeList.codes[0]} />}
        depth={1}
      />
    </>
  );
}
