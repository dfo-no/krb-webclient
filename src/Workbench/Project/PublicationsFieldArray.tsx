import format from 'date-fns/format';
import React, { ReactElement, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import {
  Control,
  FormState,
  useFieldArray,
  UseFormRegister
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BsTrashFill } from 'react-icons/bs';
import * as Constants from '../../common/Constants';
import ModelType from '../../models/ModelType';
import { Publication } from '../../models/Publication';
import { useAppDispatch } from '../../store/hooks';
import { prependPublication } from '../../store/reducers/project-reducer';
import SuccessAlert from '../SuccessAlert';
import { ProjectPublicationForm } from './ProjectPublicationForm';
import css from './PublicationList.module.scss';

type IProps = {
  register: UseFormRegister<ProjectPublicationForm>;
  control: Control<ProjectPublicationForm>;
  formState: FormState<ProjectPublicationForm>;
  projectId: string;
  removePublication: (publicationId: string) => Promise<void>;
};

export default function PublicationsFieldArray({
  control,
  register,
  formState,
  projectId,
  removePublication
}: IProps): ReactElement {
  const { errors } = formState;

  const { fields, remove } = useFieldArray({
    name: 'publications',
    control
  });

  const dispatch = useAppDispatch();

  const [showAlert, setShowAlert] = useState(false);
  const publishButtonRef = useRef(null);
  const { t } = useTranslation();

  const getNextVersion = (publications: Publication[]) => {
    if (publications.length === 0) {
      return 1;
    }
    return Math.max(...publications.map((p) => p.version)) + 1;
  };

  const cancelPublish = () => {
    remove(0);
  };

  const addPublication = () => {
    if (!publishButtonRef.current) {
      const nextVersion = getNextVersion(fields);

      const newPublication: Publication = {
        id: '',
        comment: '',
        date: '',
        version: nextVersion,
        bankId: projectId,
        type: ModelType.publication
      };

      dispatch(prependPublication({ projectId, publication: newPublication }));
    }
  };

  return (
    <div>
      <Button onClick={() => addPublication()}>{t('new publication')}</Button>
      {showAlert && (
        <SuccessAlert toggleShow={setShowAlert} type="publication" />
      )}

      <ListGroup className="mt-4">
        {fields.map((field, index) => {
          return (
            <ListGroup.Item as="div" key={field.id}>
              {field.id === '' ? (
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
                  <Button className="mr-1" type="submit" ref={publishButtonRef}>
                    {t('publish')}
                  </Button>
                  <Button variant="warning" onClick={() => cancelPublish()}>
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
                    variant="danger"
                    type="button"
                    onClick={() => {
                      // remove(index);
                      removePublication(field.id);
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
    </div>
  );
}
