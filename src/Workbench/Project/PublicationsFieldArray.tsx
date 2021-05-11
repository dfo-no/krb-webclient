import React, { ReactElement, useState, useRef } from 'react';
import {
  Control,
  FormState,
  useFieldArray,
  UseFormRegister
} from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { BsTrashFill } from 'react-icons/bs';
import Nav from 'react-bootstrap/Nav';
import { v4 as uuidv4 } from 'uuid';
import format from 'date-fns/format';
import formatISO from 'date-fns/formatISO';

import { useTranslation } from 'react-i18next';
import { Publication } from '../../models/Publication';
import MODELTYPE from '../../models/ModelType';
import SuccessAlert from '../SuccessAlert';
import css from './PublicationList.module.scss';
import * as Constants from '../../common/Constants';
import { ProjectPublicationForm } from './ProjectPublicationForm';

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

  const { fields, remove, prepend } = useFieldArray({
    name: 'publications',
    keyName: 'guid',
    control
  });

  const [showAlert, setShowAlert] = useState(false);
  const publishButtonRef = useRef(null);
  const { t } = useTranslation();

  const getNextVersion = (publications: Publication[]) => {
    if (publications.length === 0) {
      return 1;
    }
    return Math.max(...publications.map((p) => p.version)) + 1;
  };

  const addPublication = () => {
    if (!publishButtonRef.current) {
      const convertedDate = formatISO(new Date());
      const nextVersion = getNextVersion(fields);
      prepend({
        id: uuidv4(),
        comment: '',
        date: convertedDate,
        version: nextVersion,
        bankId: projectId,
        type: MODELTYPE.publication
      });
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
          const formattedDate = format(
            new Date(field.date),
            Constants.DATE_FORMAT_SHORT
          );
          return (
            <ListGroup.Item
              as="div"
              key={field.guid}
              className={css.listGroup__item}
            >
              <Nav.Link href={`/bank/${field.bankId}`}>
                {` ${formattedDate} ${field.comment}`}
              </Nav.Link>
              <Form.Control
                readOnly
                as="input"
                type="hidden"
                {...register(`publications.${index}.id` as const)}
                defaultValue={field.id}
              />
              <Form.Control
                readOnly
                as="input"
                type="hidden"
                {...register(`publications.${index}.bankId` as const)}
                defaultValue={field.bankId}
              />
              <Form.Control
                readOnly
                as="input"
                type="hidden"
                {...register(`publications.${index}.type` as const)}
                defaultValue={field.type}
              />
              {field.comment === '' ? (
                <>
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
                      <Form.Control.Feedback type="invalid">
                        {errors.publications[index]?.comment?.message}
                      </Form.Control.Feedback>
                    )}
                  <Button
                    className="ml-1 mr-1"
                    type="submit"
                    ref={publishButtonRef}
                  >
                    Publish
                  </Button>
                </>
              ) : (
                <Form.Control
                  readOnly
                  as="input"
                  type="hidden"
                  {...register(`publications.${index}.comment` as const)}
                  defaultValue={field.comment}
                />
              )}
              <div className={css.listGroup__spacer} />
              <Button
                variant="danger"
                type="button"
                onClick={() => {
                  remove(index);
                  removePublication(field.id);
                }}
              >
                <BsTrashFill />
              </Button>
              <Form.Control
                readOnly
                as="input"
                type="hidden"
                {...register(`publications.${index}.date` as const)}
                defaultValue={field.date}
              />
              <Form.Control
                readOnly
                as="input"
                type="hidden"
                {...register(`publications.${index}.version` as const)}
                defaultValue={field.version}
              />
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}
