import { joiResolver } from '@hookform/resolvers/joi';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { get, has, toPath } from 'lodash';
import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import ErrorSummary from '../../../Form/ErrorSummary';
import { IAlert } from '../../../models/IAlert';
import { PutProjectSchema } from '../../../models/Project';
import { IBank } from '../../../Nexus/entities/IBank';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import {
  deleteProjectByIdThunk,
  editPublication,
  putSelectedProjectThunk,
  removePublication
} from '../../../store/reducers/project-reducer';
import { selectBank } from '../../../store/reducers/selectedBank-reducer';
import css from './PublicationList.module.scss';

export default function PublicationList(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { project } = useAppSelector((state) => state.project);
  const [editId, setEditId] = useState('');

  const { register, formState, handleSubmit } = useForm<IBank>({
    criteriaMode: 'all',
    resolver: joiResolver(PutProjectSchema),
    defaultValues: project
  });
  const { errors } = formState;

  const { t } = useTranslation();

  const deletePublication = async (publicationId: string, bankId: string) => {
    dispatch(deleteProjectByIdThunk(bankId)).then(() => {
      dispatch(removePublication(publicationId));
      dispatch(putSelectedProjectThunk('dummy')).then(() => {
        const alert: IAlert = {
          id: uuidv4(),
          style: 'success',
          text: 'Successfully deleted published bank'
        };
        dispatch(addAlert({ alert }));
      });
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
  const handleSelectedBank = (bankId: string) => () => {
    dispatch(selectBank(bankId));
  };

  return (
    <form>
      <ListGroup className="mt-4">
        {project.publications.map((field, index) => {
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
                    <Button variant="primary" onClick={handleSubmit(onSubmit)}>
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
                    <Nav.Link
                      href={`/specification/${field.bankId}`}
                      onClick={handleSelectedBank(field.bankId)}
                    >
                      {t('date.PP', {
                        date: new Date(field.date ? field.date : '')
                      })}
                      {` ${field.comment}`}
                    </Nav.Link>
                    <div className={css.listGroup__spacer} />
                  </Col>
                  <Col sm={1} className="m-0 p-0">
                    <Button
                      variant="primary"
                      onClick={() => {
                        setEditId(field.id);
                      }}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      variant="warning"
                      onClick={() => {
                        deletePublication(field.id, field.bankId);
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </Col>
                </Row>
              )}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      <ErrorSummary errors={errors} />
    </form>
  );
}
