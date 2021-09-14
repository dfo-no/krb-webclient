import { joiResolver } from '@hookform/resolvers/joi';
import React, { ReactElement, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import ErrorSummary from '../../Form/ErrorSummary';
import InputRow from '../../Form/InputRow';
import ModelType from '../../models/ModelType';
import { PostTagSchema, Tag } from '../../models/Tag';
import { useAppDispatch } from '../../store/hooks';
import {
  addTag,
  putSelectedProjectThunk
} from '../../store/reducers/project-reducer';

export default function NewTagForm(): ReactElement {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const defaultValues = {
    id: '',
    title: '',
    type: ModelType.tag
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Tag>({
    resolver: joiResolver(PostTagSchema),
    defaultValues
  });

  const onNewTagSubmit = (post: Tag) => {
    const newTag = { ...post };
    newTag.id = uuidv4();
    dispatch(addTag(newTag));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
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
              <Row>
                <Button className="mt-2  ml-3" type="submit">
                  {t('save')}
                </Button>
                <Button
                  className="mt-2 ml-3 btn-warning"
                  onClick={() => setShow(false)}
                >
                  {t('cancel')}
                </Button>
              </Row>
              <ErrorSummary errors={errors} />
            </Form>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
