import { joiResolver } from '@hookform/resolvers/joi';
import { get, has, toPath } from 'lodash';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BsPencilSquare, BsTrashFill } from 'react-icons/bs';
import ErrorSummary from '../../Form/ErrorSummary';
import { IBank } from '../../models/IBank';
import { PutProjectSchema } from '../../models/Project';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  deleteProjectByIdThunk,
  editPublication,
  putSelectedProjectThunk,
  removePublication
} from '../../store/reducers/project-reducer';
import css from './PublicationList.module.scss';

export default function PublicationList(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { project } = useAppSelector((state) => state.project);
  const [editId, setEditId] = useState('');

  const { control, register, formState, handleSubmit } = useForm<
    Omit<IBank, 'needs'>
  >({
    criteriaMode: 'all',
    resolver: joiResolver(PutProjectSchema),
    defaultValues: project
  });
  const { errors } = formState;

  const { fields } = useFieldArray({
    name: 'publications',
    control
  });

  const { t } = useTranslation();

  const deletePublication = async (publicationId: string) => {
    dispatch(deleteProjectByIdThunk(publicationId)).then(() => {
      dispatch(removePublication(publicationId));
      dispatch(putSelectedProjectThunk('dummy'));
    });
  };

  const onSubmit = (post: IBank) => {
    const index = post.publications.findIndex(
      (element) => element.id === editId
    );
    if (index !== -1) {
      const pub = post.publications[index];
      dispatch(editPublication(pub));
      dispatch(putSelectedProjectThunk('dummy')).then(() => {
        setEditId('');
      });
    }
  };

  const hasError = (str: string) => {
    let retVal = null;
    const path = toPath(str);
    if (has(errors, path)) {
      retVal = true;
    } else {
      retVal = false;
    }
    return retVal;
  };

  const getError = (str: string) => {
    const path = toPath(str);
    path.push('message');
    return get(errors, path);
  };

  return (
    <Form>
      <ListGroup className="mt-4">
        {fields.map((field, index) => {
          return (
            <ListGroup.Item as="div" key={field.id}>
              {field.id === editId ? (
                <>
                  <Form.Group>
                    <Form.Control
                      as="input"
                      type="text"
                      {...register(`publications.${index}.comment` as const)}
                      placeholder="Summarize the changes ..."
                      defaultValue=""
                      isInvalid={!!hasError(`publications[${index}].comment`)}
                    />
                    {hasError(`publications[${index}].comment`) && (
                      <Form.Control.Feedback type="invalid" as="div">
                        {getError(`publications[${index}].comment.message`)}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <Col sm={1}>
                    <Button className="mr-1" onClick={handleSubmit(onSubmit)}>
                      {t('save')}
                    </Button>
                    <Button variant="warning" onClick={() => setEditId('')}>
                      {t('cancel')}
                    </Button>
                  </Col>
                </>
              ) : (
                <Row>
                  <Col>
                    <Nav.Link href={`/bank/${field.bankId}`}>
                      {t('date.PP', {
                        date: new Date(field.date ? field.date : '')
                      })}
                      {` ${field.comment}`}
                    </Nav.Link>
                    <div className={css.listGroup__spacer} />
                  </Col>
                  <Col sm={1} className="m-0 p-0">
                    <Button
                      className="mr-1"
                      variant="primary"
                      type="button"
                      onClick={() => {
                        setEditId(field.id);
                      }}
                    >
                      <BsPencilSquare />
                    </Button>
                    <Button
                      variant="danger"
                      type="button"
                      onClick={() => {
                        deletePublication(field.id);
                      }}
                    >
                      <BsTrashFill />
                    </Button>
                  </Col>
                </Row>
              )}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      <ErrorSummary errors={errors} />
    </Form>
  );
}
