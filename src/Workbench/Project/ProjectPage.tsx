import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  ListGroup,
  InputGroup,
  FormControl,
  Card
} from 'react-bootstrap';
import dayjs from 'dayjs';

import { RootState } from '../../store/rootReducer';
import { Publication } from '../../models/Publication';
import {
  publishProject,
  editProject
} from '../../store/reducers/kravbank-reducer';
import { Utils } from '../../common/Utils';

export default function ProjectPage(): ReactElement {
  const dispatch = useDispatch();
  const { id } = useSelector((state: RootState) => state.selectedProject);

  const { list } = useSelector((state: RootState) => state.project);

  let project = Utils.ensure(list.find((project) => project.id === id));

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
      id: Utils.getRandomNumber()
    };
    setShowEditor(false);
    dispatch(publishProject(publication));
  };

  const editProjectInfo = () => () => {
    let newproject = {
      id: project.id,
      title: title,
      description: description,
      needs: project.needs,
      requirements: project.requirements,
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
        <Card className="mt-3">
          <Card.Body>
            <label htmlFor="title">Title</label>
            <InputGroup className="mb-3">
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
            <Button className="mt-3" onClick={editProjectInfo()}>
              Save
            </Button>
          </Card.Body>
        </Card>
      );
    } else {
      return (
        <div className="mt-3 mb-5">
          <h1>{project.title}</h1>
          <h5>{project.description}</h5>
          <Button onClick={() => setEditMode(true)}>Edit</Button>
        </div>
      );
    }
  }
  const publicationList = (publications?: Publication[]) => {
    if (publications) {
      const publication = publications.map((element: Publication) => {
        // TODO- Check locale for locale dateformat.
        const date = dayjs(element.date).format('DD/MM/YYYY');
        return (
          <ListGroup.Item key={element.id}>
            <p>{date + '     ' + element.comment}</p>
          </ListGroup.Item>
        );
      });
      return <ListGroup className="mt-3">{publication}</ListGroup>;
    }
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
                onChange={handleCommentChange}
              />
            </InputGroup>
            <Button onClick={handlePublishProject()}>Publish</Button>
          </ListGroup.Item>
        </ListGroup>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      {headerSection(editMode)}
      <h4>Publications</h4>
      <Button className="mb-3" onClick={() => setShowEditor(true)}>
        New publication
      </Button>
      {publicationEditor(showEditor)}
      {publicationList(publications)}
    </>
  );
}
