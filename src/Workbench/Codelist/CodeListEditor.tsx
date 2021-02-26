/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, FormControl, InputGroup } from 'react-bootstrap';

import styles from './CodeListEditor.module.scss';
import { RootState } from '../../store/store';
import { Code } from '../../models/Code';
import {
  editCodelist,
  putProjectThunk,
  updateCodeList
} from '../../store/reducers/project-reducer';
import Utils from '../../common/Utils';
import { Codelist } from '../../models/Codelist';
import { Bank } from '../../models/Bank';

import NestableHierarcy from '../../NestableHierarchy/Nestable';
import EditCodeForm from './EditCodeForm';
import NewCodeForm from './NewCodeForm';

export default function CodeListEditor(): ReactElement {
  const dispatch = useDispatch();
  const { list } = useSelector((state: RootState) => state.project);
  const { id } = useSelector((state: RootState) => state.selectedProject);
  const { listId } = useSelector((state: RootState) => state.selectedCodeList);
  const [toggleEditor, setToggleEditor] = useState(false);
  const [editmode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

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

  const handleTitleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setDescription(event.target.value);
  };

  const handleEditCodelist = () => {
    setEditMode(true);
  };

  const onEditCodelist = () => {
    dispatch(
      editCodelist({
        projectId: id,
        codelistId: selectedCodeList.id,
        title,
        description
      })
    );
    dispatch(putProjectThunk(id));
    setEditMode(false);
  };

  function renderHeaderSection(edit: boolean) {
    if (edit) {
      return (
        <Card className="mt-3">
          <Card.Body>
            <label htmlFor="title">Title</label>
            <InputGroup className="mb-3 30vw">
              <FormControl
                name="title"
                onChange={handleTitleChange}
                defaultValue={selectedCodeList.title}
              />
            </InputGroup>
            <label htmlFor="description">Description</label>
            <InputGroup>
              <FormControl
                name="description"
                onChange={handleDescriptionChange}
                defaultValue={selectedCodeList.description}
              />
            </InputGroup>
            <FormControl
              name="codelistId"
              type="hidden"
              value={selectedCodeList.id}
            />
            <Button className="mt-2" onClick={onEditCodelist}>
              Save
            </Button>
          </Card.Body>
        </Card>
      );
    }
    return (
      <div className={styles.codelistSection}>
        <h1>{selectedCodeList.title}</h1>
        <h5>{selectedCodeList.description}</h5>
        <Button onClick={handleEditCodelist}>Edit</Button>
      </div>
    );
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
      {renderHeaderSection(editmode)}
      <h4>Codes</h4>
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
