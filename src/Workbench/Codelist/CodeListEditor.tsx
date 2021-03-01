/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row } from 'react-bootstrap';
import { BsPencil } from 'react-icons/bs';

import { RootState } from '../../store/store';
import { Code } from '../../models/Code';
import {
  putProjectThunk,
  updateCodeList
} from '../../store/reducers/project-reducer';
import Utils from '../../common/Utils';
import { Codelist } from '../../models/Codelist';
import { Bank } from '../../models/Bank';

import NestableHierarcy from '../../NestableHierarchy/Nestable';
import EditCodeForm from './EditCodeForm';
import NewCodeForm from './NewCodeForm';
import EditCodeListForm from './EditCodeListForm';

export default function CodeListEditor(): ReactElement {
  const dispatch = useDispatch();
  const { list } = useSelector((state: RootState) => state.project);
  const { id } = useSelector((state: RootState) => state.selectedProject);
  const { listId } = useSelector((state: RootState) => state.selectedCodeList);
  const [toggleEditor, setToggleEditor] = useState(false);
  const [editmode, setEditMode] = useState(false);

  if (!id) {
    return <p>Please select a project</p>;
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
        />
      );
    }
    return <></>;
  }

  const newListofCodes = (projectId: string, items: Code[]) => {
    dispatch(
      updateCodeList({ id: projectId, codes: items, codelistId: listId })
    );
    dispatch(putProjectThunk(projectId));
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
