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
import { IAlert } from '../../models/IAlert';
import ModelType from '../../models/ModelType';
import { IBank } from '../../Nexus/entities/IBank';
import {
  IPublication,
  PostPublicationSchema
} from '../../Nexus/entities/IPublication';
import Nexus from '../../Nexus/Nexus';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addAlert } from '../../store/reducers/alert-reducer';
import { postBankThunk } from '../../store/reducers/bank-reducer';
import {
  prependPublication,
  putSelectedProjectThunk,
  updateSelectedVersion
} from '../../store/reducers/project-reducer';

export default function NewPublication(): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const defaultValues: IPublication = {
    id: '',
    bankId: project.id,
    comment: '',
    date: null,
    type: ModelType.publication,
    version: 1,
    sourceOriginal: null,
    sourceRel: null
  };

  const { control, handleSubmit, reset, formState } = useForm<IPublication>({
    resolver: joiResolver(PostPublicationSchema),
    defaultValues
  });

  const { errors } = formState;

  const onSubmit = async (post: IPublication) => {
    const publication = { ...post };
    const nexus = Nexus.getInstance();

    const newBank = nexus.publicationService.generateBankFromProject(project);
    const nextVersion = nexus.publicationService.getNextVersion(
      project.publications
    );

    // save the new published Bank
    dispatch(postBankThunk(newBank))
      .unwrap()
      .then(async (result: IBank) => {
        // Update Publication with new data
        publication.id = result.id;
        publication.bankId = result.id;
        publication.version = result.version;
        publication.date = result.publishedDate ?? null;
        // add publication to selected Bank
        dispatch(prependPublication(publication));

        // update version on selected bank
        dispatch(updateSelectedVersion(nextVersion));

        // save selected bank to db
        dispatch(putSelectedProjectThunk('dummy')).then(() => {
          setShow(false);
          reset();
          const alert: IAlert = {
            id: uuidv4(),
            style: 'success',
            text: 'successfully published bank'
          };
          dispatch(addAlert({ alert }));
        });
      });
  };

  return (
    <>
      <Button onClick={() => setShow(true)}>{t('new publication')}</Button>
      {show && (
        <Card className="mb-4 mt-4">
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <ControlledTextInput
                control={control}
                error={get(errors, `comment`) as FieldError}
                name="comment"
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
