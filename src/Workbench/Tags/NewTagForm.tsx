import { joiResolver } from '@hookform/resolvers/joi';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import ErrorSummary from '../../Form/ErrorSummary';
import InputRow from '../../Form/InputRow';
import { IAlert } from '../../models/IAlert';
import { Parentable } from '../../models/Parentable';
import { PostTagSchema, Tag } from '../../models/Tag';
import Nexus from '../../Nexus/Nexus';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addAlert } from '../../store/reducers/alert-reducer';
import {
  addTag,
  putSelectedProjectThunk
} from '../../store/reducers/project-reducer';

export default function NewTagForm(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { project } = useAppSelector((state) => state.project);
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const nexus = Nexus.getInstance();

  const defaultValues = nexus.tagService.generateDefaultTaglistValues(
    project.id
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Parentable<Tag>>({
    resolver: joiResolver(PostTagSchema),
    defaultValues
  });

  const onNewTagSubmit = (post: Parentable<Tag>) => {
    const newTag = nexus.tagService.generateTag(post);
    const alert: IAlert = {
      id: uuidv4(),
      style: 'success',
      text: 'Successfully added tag'
    };
    dispatch(addTag(newTag));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      dispatch(addAlert({ alert }));
      reset();
      setShow(false);
    });
  };

  return (
    <>
      <Button className="mb-4" onClick={() => setShow(true)}>
        {t('new tag')}
      </Button>
      {show && (
        <Card className="mb-4">
          <Card.Body>
            <Form onSubmit={handleSubmit(onNewTagSubmit)} autoComplete="off">
              <InputRow
                control={control}
                name="title"
                errors={errors}
                label={t('Title')}
              />
              <Button className="mt-2  ml-3" type="submit">
                {t('save')}
              </Button>
              <Button
                className="mt-2 ml-3 btn-warning"
                onClick={() => setShow(false)}
              >
                {t('cancel')}
              </Button>
              <ErrorSummary errors={errors} />
            </Form>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
