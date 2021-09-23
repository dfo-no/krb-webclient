import { joiResolver } from '@hookform/resolvers/joi';
import React, { ReactElement, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ErrorSummary from '../../Form/ErrorSummary';
import InputRow from '../../Form/InputRow';
import { Bank } from '../../models/Bank';
import ModelType from '../../models/ModelType';
import { PostPublicationSchema, Publication } from '../../models/Publication';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { postBankThunk } from '../../store/reducers/bank-reducer';
import {
  prependPublication,
  putSelectedProjectThunk,
  updateSelectedVersion
} from '../../store/reducers/project-reducer';

export default function NewPublication(): ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const defaultValues: Publication = {
    id: '',
    bankId: project.id,
    comment: '',
    date: '',
    type: ModelType.publication,
    version: 1
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Publication>({
    resolver: joiResolver(PostPublicationSchema),
    defaultValues
  });

  const getNextVersion = (publications: Publication[]) => {
    if (publications.length === 0) {
      return 1;
    }
    return Math.max(...publications.map((p) => p.version)) + 1;
  };

  const generateBankFromProject = (item: Bank) => {
    // Shallow clone, deep not needed for now as we don't create anything here other than desciption and title
    const newBank: Bank = { ...project };
    newBank.id = '';
    newBank.publishedDate = new Date().toISOString();
    newBank.publications = [];
    newBank.version = getNextVersion(item.publications);
    return newBank;
  };

  const onSubmit = async (post: Publication) => {
    const publication = { ...post };
    const newBank = generateBankFromProject(project);
    const nextVersion = getNextVersion(project.publications);

    // save the new published Bank
    dispatch(postBankThunk(newBank))
      .unwrap()
      .then(async (result: Bank) => {
        // Update Publication with new data
        publication.id = result.id;
        publication.bankId = result.id;
        publication.version = result.version;
        publication.date = result.publishedDate ?? '';

        // add publication to selected Bank
        dispatch(prependPublication(publication));

        // update version on selected bank
        dispatch(updateSelectedVersion(nextVersion));

        // save selected bank to db
        dispatch(putSelectedProjectThunk('dummy')).then(() => {
          setShow(false);
          reset();
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
              <InputRow
                control={control}
                name="comment"
                errors={errors}
                label={t('Comment')}
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
