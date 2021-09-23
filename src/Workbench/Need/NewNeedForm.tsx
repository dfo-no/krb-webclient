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
import { Alert } from '../../models/Alert';
import ModelType from '../../models/ModelType';
import { Need, PostNeedSchema } from '../../models/Need';
import { Nestable } from '../../models/Nestable';
import { useAppDispatch } from '../../store/hooks';
import { addAlert } from '../../store/reducers/alert-reducer';
import {
  addNeed,
  putSelectedProjectThunk
} from '../../store/reducers/project-reducer';

function NewNeedForm(): ReactElement {
  const dispatch = useAppDispatch();
  const [validated] = useState(false);
  const [show, setShow] = useState(false);
  const { t } = useTranslation();

  const defaultValues: Need = {
    id: '',
    title: '',
    description: '',
    requirements: [],
    type: ModelType.need
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Need>({
    resolver: joiResolver(PostNeedSchema),
    defaultValues
  });

  const onSubmit = (post: Nestable<Need>) => {
    const need = { ...post };
    need.id = uuidv4();
    if (need.children) {
      delete need.children;
    }
    dispatch(addNeed(need));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      setShow(false);
      reset();
    });
    const alert: Alert = {
      id: uuidv4(),
      style: 'success',
      text: 'Successfully added new need'
    };
    dispatch(addAlert({ alert }));
  };

  return (
    <>
      <Button
        onClick={() => {
          setShow(true);
        }}
        className="mb-4"
      >
        {t('new need')}
      </Button>
      {show && (
        <Card className="mb-4">
          <Card.Body>
            <Form
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
              noValidate
              validated={validated}
            >
              <InputRow
                control={control}
                name="title"
                label={t('Title')}
                errors={errors}
              />
              <InputRow
                control={control}
                name="description"
                label={t('Description')}
                errors={errors}
              />
              <Button className="mt-2  ml-3" type="submit">
                {t('save')}
              </Button>
              <Button
                className="mt-2 ml-3 btn-warning"
                onClick={() => setShow(false)}
              >
                Avbryt
              </Button>
              <ErrorSummary errors={errors} />
            </Form>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default NewNeedForm;
