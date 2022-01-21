import { joiResolver } from '@hookform/resolvers/joi';
import Button from '@mui/material/Button';
import { get } from 'lodash';
import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { FieldError, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import ControlledTextInput from '../../../Form/ControlledTextInput';
import ErrorSummary from '../../../Form/ErrorSummary';
import { IAlert } from '../../../models/IAlert';
import ModelType from '../../../models/ModelType';
import { IBank } from '../../../Nexus/entities/IBank';
import {
  IPublication,
  PostPublicationSchema
} from '../../../Nexus/entities/IPublication';
import Nexus from '../../../Nexus/Nexus';
import { bankApi } from '../../../store/api/bankApi';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import {
  prependPublication,
  putSelectedProjectThunk,
  updateSelectedVersion
} from '../../../store/reducers/project-reducer';

export default function NewPublication(): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [addBank] = bankApi.useAddBankMutation();

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
  const nexus = Nexus.getInstance();

  const onSubmit = (post: IPublication) => {
    const publication = { ...post };

    const newBank = nexus.publicationService.generateBankFromProject(project);
    const nextVersion = nexus.publicationService.getNextVersion(
      project.publications
    );

    // save the new published Bank
    addBank(newBank)
      .unwrap()
      .then((result: IBank) => {
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
          const alert: IAlert = {
            id: uuidv4(),
            style: 'success',
            text: 'successfully published bank'
          };
          dispatch(addAlert({ alert }));
        });
        reset();
      });
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        {t('new publication')}
      </Button>
      {show && (
        <Card className="mb-4 mt-4">
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <ControlledTextInput
                control={control}
                error={get(errors, `comment`) as FieldError}
                name="comment"
              />
              <Button variant="primary" type="submit">
                {t('save')}
              </Button>
              <Button variant="warning" onClick={() => setShow(false)}>
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
