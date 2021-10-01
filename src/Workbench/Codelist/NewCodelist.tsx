import { joiResolver } from '@hookform/resolvers/joi';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import InputRow from '../../Form/InputRow';
import { Codelist, PostCodelistSchema } from '../../models/Codelist';
import ModelType from '../../models/ModelType';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addCodelist,
  putSelectedProjectThunk
} from '../../store/reducers/project-reducer';

function NewCodelist(): React.ReactElement {
  const dispatch = useAppDispatch();
  const [validated] = useState(false);
  const { project } = useAppSelector((state) => state.project);
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const defaultValues: Codelist = {
    id: '',
    title: '',
    description: '',
    codes: [],
    type: ModelType.codelist,
    source_original: project.id,
    source_rel: null
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Codelist>({
    resolver: joiResolver(PostCodelistSchema),
    defaultValues
  });

  const onNewCodeSubmit = (post: Codelist) => {
    const newCodelist = { ...post };
    newCodelist.id = uuidv4();
    dispatch(addCodelist(newCodelist));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      reset();
      setShow(false);
    });
  };

  return (
    <>
      <Button className="mb-4" onClick={() => setShow(true)}>
        {t('new codelist')}
      </Button>
      {show && (
        <Card className="mb-4">
          <Card.Body>
            <Form
              onSubmit={handleSubmit(onNewCodeSubmit)}
              autoComplete="off"
              noValidate
              validated={validated}
            >
              <InputRow
                control={control}
                name="title"
                errors={errors}
                label={t('Title')}
              />
              <InputRow
                control={control}
                name="description"
                errors={errors}
                label={t('Description')}
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
            </Form>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default NewCodelist;
