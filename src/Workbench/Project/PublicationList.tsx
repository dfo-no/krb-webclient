import { joiResolver } from '@hookform/resolvers/joi';
import format from 'date-fns/format';
import React, { ReactElement, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BsPencilSquare, BsTrashFill } from 'react-icons/bs';
import * as Constants from '../../common/Constants';
import ErrorSummary from '../../Form/ErrorSummary';
import { Bank } from '../../models/Bank';
import { PutProjectSchema } from '../../models/Project';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  deleteProjectByIdThunk,
  editPublication,
  putSelectedProjectThunk,
  removePublication
} from '../../store/reducers/project-reducer';
import css from './PublicationList.module.scss';

export default function PublicationList(): ReactElement {
  const dispatch = useAppDispatch();
  const { project } = useAppSelector((state) => state.project);
  const [editId, setEditId] = useState('');

  const { control, register, reset, formState, handleSubmit } = useForm<
    Omit<Bank, 'needs'>
  >({
    criteriaMode: 'all',
    resolver: joiResolver(PutProjectSchema),
    defaultValues: project
  });
  const { errors } = formState;

  useEffect(() => {
    if (project) {
      reset(JSON.parse(JSON.stringify(project)));
    }
  }, [project, reset]);

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

  const onSubmit = (post: Bank) => {
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
                      isInvalid={
                        !!(
                          errors.publications &&
                          errors.publications[index] &&
                          errors.publications[index]?.comment
                        )
                      }
                    />
                    {errors.publications &&
                      errors.publications[index] &&
                      errors.publications[index]?.comment && (
                        <Form.Control.Feedback type="invalid" as="div">
                          {errors.publications[index]?.comment?.message}
                        </Form.Control.Feedback>
                      )}
                  </Form.Group>
                  <Button className="mr-1" onClick={handleSubmit(onSubmit)}>
                    {t('save')}
                  </Button>
                  <Button variant="warning" onClick={() => setEditId('')}>
                    {t('cancel')}
                  </Button>
                </>
              ) : (
                <Row>
                  <Nav.Link href={`/bank/${field.bankId}`}>
                    {` ${format(
                      new Date(field.date),
                      Constants.DATE_FORMAT_SHORT
                    )} ${field.comment}`}
                  </Nav.Link>
                  <div className={css.listGroup__spacer} />
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
