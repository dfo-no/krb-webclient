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
import { Codelist, PostCodelistSchema } from '../../models/Codelist';
import Nexus from '../../Nexus/Nexus';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addAlert } from '../../store/reducers/alert-reducer';
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
  const nexus = Nexus.getInstance();

  const defaultValues: Codelist =
    nexus.codelistService.generateDefaultCodelistValues(project.id);

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
    const alert: Alert = {
      id: uuidv4(),
      style: 'success',
      text: 'Successfully added codelist'
    };
    const newCodelist = nexus.codelistService.createCodelistWithId(post);
    dispatch(addCodelist(newCodelist));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      dispatch(addAlert({ alert }));
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
              <ControlledTextInput
                control={control}
                name="title"
                error={get(errors, `title`) as FieldError}
                label={t('Title')}
              />
              <ControlledTextInput
                control={control}
                name="description"
                error={get(errors, `description`) as FieldError}
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
              <ErrorSummary errors={errors} />
            </Form>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default NewCodelist;
