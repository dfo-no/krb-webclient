import React, { ReactElement, useState, useRef } from 'react';
import { useFieldArray } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { BsTrashFill } from 'react-icons/bs';
import Nav from 'react-bootstrap/Nav';
import { v4 as uuidv4 } from 'uuid';
import { format, formatISO } from 'date-fns';

import { InputProps } from '../../models/InputProps';
import { Publication } from '../../models/Publication';
import MODELTYPE from '../../models/ModelType';
import SuccessAlert from '../SuccessAlert';
import css from './PublicationList.module.scss';
import * as Constants from '../../common/Constants';

export default function PublicationList({
  control,
  register,
  errors,
  defaultValues
}: InputProps): ReactElement {
  const { fields, prepend, remove } = useFieldArray({
    keyName: 'guid' /* <- important not to be id! */,
    control,
    name: 'publications'
  });

  const [showAlert, setShowAlert] = useState(false);
  const publishButtonRef = useRef(null);

  const getNextVersion = (fieldList: any) => {
    const maxVal = Math.max(...fieldList.map((p: Publication) => p.version));

    // no publications exists
    if (maxVal === -Infinity) {
      return defaultValues.version + 1;
    }
    return maxVal + 1;
  };

  const addPublication = () => {
    if (!publishButtonRef.current) {
      const convertedDate = formatISO(new Date());
      prepend({
        id: uuidv4(),
        comment: '',
        date: convertedDate,
        version: getNextVersion(fields),
        bankId: defaultValues.id,
        type: MODELTYPE.publication
      });
    }
  };

  return (
    <div>
      <Button onClick={() => addPublication()}>New publication</Button>
      {showAlert && (
        <SuccessAlert toggleShow={setShowAlert} type="publication" />
      )}

      <ListGroup className="mt-4">
        {fields.map((field, index: number) => {
          const date = format(
            new Date(field.date),
            Constants.DATE_FORMAT_SHORT
          );
          return (
            <ListGroup.Item
              as="div"
              key={field.id}
              className={css.listGroup__item}
            >
              <Nav.Link href={`/bank/${field.bankId}`}>
                {` ${date} ${field.comment}`}
              </Nav.Link>
              <Form.Control
                readOnly
                as="input"
                name={`publications[${index}].id`}
                type="hidden"
                ref={register()}
                defaultValue={field.id}
                isInvalid={
                  !!(
                    errors.publications &&
                    errors.publications[index] &&
                    errors.publications[index].id
                  )
                }
              />
              <Form.Control
                readOnly
                as="input"
                name={`publications[${index}].bankId`}
                type="hidden"
                ref={register()}
                defaultValue={field.bankId ? field.bankId : defaultValues.id}
                isInvalid={
                  !!(
                    errors.publications &&
                    errors.publications[index] &&
                    errors.publications[index].bankId
                  )
                }
              />
              <Form.Control
                readOnly
                as="input"
                name={`publications[${index}].type`}
                type="hidden"
                ref={register()}
                defaultValue={field.type}
                isInvalid={
                  !!(
                    errors.publications &&
                    errors.publications[index] &&
                    errors.publications[index].type
                  )
                }
              />
              {field.comment === '' ? (
                <>
                  <Form.Control
                    as="input"
                    name={`publications[${index}].comment`}
                    type="text"
                    ref={register()}
                    defaultValue="Summarize the changes ..."
                    isInvalid={
                      !!(
                        errors.publications &&
                        errors.publications[index] &&
                        errors.publications[index].comment
                      )
                    }
                  />
                  {errors.publications &&
                    errors.publications[index] &&
                    errors.publications[index].comment && (
                      <Form.Control.Feedback type="invalid">
                        {errors.publications[index].comment.message}
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
                  name={`publications[${index}].comment`}
                  type="hidden"
                  ref={register()}
                  defaultValue={field.comment}
                  isInvalid={
                    !!(
                      errors.publications &&
                      errors.publications[index] &&
                      errors.publications[index].comment
                    )
                  }
                />
              )}
              <div className={css.listGroup__spacer} />
              <Button variant="danger" onClick={() => remove(index)}>
                <BsTrashFill />
              </Button>
              <Form.Control
                readOnly
                as="input"
                name={`publications[${index}].date`}
                type="hidden"
                ref={register()}
                defaultValue={field.date}
                isInvalid={
                  !!(
                    errors.publications &&
                    errors.publications[index] &&
                    errors.publications[index].date
                  )
                }
              />
              <Form.Control
                readOnly
                as="input"
                name={`publications[${index}].version`}
                type="hidden"
                ref={register()}
                defaultValue={field.version}
                isInvalid={
                  !!(
                    errors.publications &&
                    errors.publications[index] &&
                    errors.publications[index].version
                  )
                }
              />
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}
