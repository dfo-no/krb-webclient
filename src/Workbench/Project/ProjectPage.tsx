/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  ListGroup,
  InputGroup,
  FormControl,
  Row
} from 'react-bootstrap';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import { BsPencil } from 'react-icons/bs';
import { RootState } from '../../store/store';
import { Publication } from '../../models/Publication';
import {
  putProjectThunk,
  addPublication,
  incrementProjectVersion
} from '../../store/reducers/project-reducer';
import { postBankThunk } from '../../store/reducers/bank-reducer';
import Utils from '../../common/Utils';
import { selectBank } from '../../store/reducers/selectedBank-reducer';
import EditProjectForm from './EditProjectForm';
import SuccessBobbo from '../SuccessAlert';
import MODELTYPE from '../../models/ModelType';

function ProjectPage(): ReactElement {
  const dispatch = useDispatch();
  const { id } = useSelector((state: RootState) => state.selectedProject);
  const { list } = useSelector((state: RootState) => state.project);
  const [showEditor, setShowEditor] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [comment, setComment] = useState('');
  const [editMode, setEditMode] = useState(false);
  if (!list) {
    return <p>Loading ....</p>;
  }

  const project = Utils.ensure(list.find((element) => element.id === id));

  const handlePublishProject = () => () => {
    const versionNumber = project.publications
      ? project.publications[project.publications.length - 1].version + 1
      : 1;

    const convertedDate = dayjs(new Date()).toJSON();
    const publishedProject = { ...project };
    publishedProject.publishedDate = convertedDate;
    publishedProject.id = '';
    dispatch(postBankThunk(publishedProject));

    const publication: Publication = {
      date: convertedDate,
      comment,
      version: versionNumber,
      id: '',
      bankId: publishedProject.id,
      type: MODELTYPE.publication
    };
    setShowEditor(false);

    dispatch(addPublication({ projectId: project.id, publication }));
    dispatch(incrementProjectVersion(project.id));
    dispatch(putProjectThunk(project.id));
    setShowAlert(true);
  };

  const handleSelectedPublication = (bankId: string) => () => {
    dispatch(selectBank(bankId));
  };

  const handleCommentChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setComment(event.target.value);
  };

  function editProjectForm(edit: boolean) {
    if (edit) {
      return <EditProjectForm toggleShow={setEditMode} project={project} />;
    }
    return <></>;
  }
  const publicationList = (publications?: Publication[]) => {
    if (publications) {
      const publication = publications.map((element: Publication) => {
        const date = dayjs(element.date).format('DD/MM/YYYY');
        return (
          <ListGroup.Item key={element.id}>
            <Link
              to={`/bank/${element.bankId}`}
              onClick={handleSelectedPublication(element.bankId)}
            >
              <p>{`${date}     ${element.comment}`}</p>
            </Link>
          </ListGroup.Item>
        );
      });
      return <ListGroup className="mt-4">{publication}</ListGroup>;
    }
    return <></>;
  };

  const publicationEditor = (show: boolean) => {
    if (show) {
      return (
        <ListGroup className="mt-3">
          <ListGroup.Item>
            <label htmlFor="title">Comment</label>
            <InputGroup className="mb-3 30vw">
              <FormControl
                className="input-sm"
                name="title"
                placeholder="What did you change?"
                onChange={(e) => handleCommentChange(e)}
              />
            </InputGroup>
            <Button onClick={handlePublishProject()}>Publish</Button>
          </ListGroup.Item>
        </ListGroup>
      );
    }
    return <></>;
  };

  return (
    <>
      <Row className="ml-1 mt-3">
        <h3> {project.title} </h3>
        <Button className="ml-3" onClick={() => setEditMode(true)}>
          <BsPencil />
        </Button>
      </Row>
      <h6 className="ml-1 mb-3">{project.description}</h6>
      {editProjectForm(editMode)}
      <h4>Publications</h4>
      <Button className="mb-3" onClick={() => setShowEditor(true)}>
        New publication
      </Button>
      {showAlert && (
        <SuccessBobbo toggleShow={setShowAlert} type="publication" />
      )}
      {publicationEditor(showEditor)}
      {publicationList(project.publications)}
    </>
  );
}

export default ProjectPage;
