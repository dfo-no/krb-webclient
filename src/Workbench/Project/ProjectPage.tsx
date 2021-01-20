import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ListGroup, InputGroup, FormControl } from 'react-bootstrap';
import dayjs from 'dayjs';

import { RootState } from '../../store/configureStore';
import { Publication } from '../../models/Publication';
import {
  publishProject,
  editProject
} from '../../store/reducers/kravbank-reducer';

import styles from './ProjectPage.module.scss';

export default function ProjectPage(): ReactElement {
  const dispatch = useDispatch();
  const { projects, selectedProject } = useSelector(
    (state: RootState) => state.kravbank
  );
  let projectindex = projects.findIndex(
    (project) => project.id === selectedProject
  );
  const project = projects[projectindex];
  const publications = project.publications;
  const [showEditor, setShowEditor] = useState(false);
  const [comment, setComment] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handlePublishProject = () => () => {
    let versionNumber = publications ? publications[-1].version + 1 : 1;
    let convertedDate = dayjs(new Date()).toJSON();
    const publication: Publication = {
      date: convertedDate,
      comment: comment,
      version: versionNumber,
      id: Math.random()
    };
    setShowEditor(false);
    dispatch(publishProject(publication));
  };

  const editProjectInfo = () => () => {
    let newproject = {
      id: project.id,
      title: title,
      description: description,
      behov: project.behov,
      krav: project.krav,
      codelist: project.codelist,
      version: project.version,
      publications: project.publications
    };
    setEditMode(false);
    dispatch(editProject(newproject));
  };

  const handleCommentChange = (event: any) => {
    setComment(event.target.value);
  };

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };

  function headerSection(editmode: boolean) {
    if (editmode) {
      return (
        <div className={styles.header}>
          <label htmlFor="title">Title</label>
          <InputGroup className="mb-3 30vw">
            <FormControl
              name="title"
              onChange={handleTitleChange}
              defaultValue={project.title}
            />
          </InputGroup>
          <label htmlFor="description">Description</label>
          <InputGroup>
            <FormControl
              name="description"
              onChange={handleDescriptionChange}
              defaultValue={project.description}
            />
          </InputGroup>
          <Button
            onClick={editProjectInfo()}
            className={styles.header__saveButton}
          >
            Save
          </Button>
        </div>
      );
    } else {
      return (
        <div className={styles.header}>
          <h1>{project.title}</h1>
          <h5>{project.description}</h5>{' '}
          <Button onClick={() => setEditMode(true)}>Edit</Button>
        </div>
      );
    }
  }
  const publicationList = (publications?: Publication[]) => {
    if (publications) {
      const jsx = publications.map((element: Publication) => {
        const date = dayjs(element.date);
        return (
          <ListGroup.Item key={element.id}>
            <p>
              {dayjs(date).get('date') +
                '.' +
                (dayjs(date).get('month') + 1) +
                '.' +
                dayjs(date).get('year') +
                '     ' +
                element.comment}
            </p>
          </ListGroup.Item>
        );
      });
      return <ListGroup className={styles.publicationList}>{jsx}</ListGroup>;
    }
  };

  const publicationEditor = (show: boolean) => {
    if (show) {
      return (
        <div className={styles.publication}>
          <ListGroup.Item>
            <label htmlFor="title">Comment</label>
            <InputGroup className="mb-3 30vw">
              <FormControl
                className="input-sm"
                name="title"
                placeholder="What did you change?"
                onChange={handleCommentChange}
              />
            </InputGroup>
            <Button
              onClick={handlePublishProject()}
              className={styles.publication__addButton}
            >
              Publish
            </Button>
          </ListGroup.Item>
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      {headerSection(editMode)}
      <h4>Publications</h4>
      <Button onClick={() => setShowEditor(true)}>New publication</Button>
      {publicationEditor(showEditor)}
      {publicationList(publications)}
    </>
  );
}
