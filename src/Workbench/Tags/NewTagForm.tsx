import { joiResolver } from '@hookform/resolvers/joi';
import { get } from 'lodash';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { FieldError, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import ControlledTextInput from '../../Form/ControlledTextInput';
import ErrorSummary from '../../Form/ErrorSummary';
import { Alert } from '../../models/Alert';
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
    const alert: Alert = {
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
              <ControlledTextInput
                control={control}
                name="title"
                label={t('Title')}
                error={get(errors, `description`) as FieldError}
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
