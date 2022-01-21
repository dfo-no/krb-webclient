import { joiResolver } from '@hookform/resolvers/joi';
import Button from '@mui/material/Button';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { FieldError, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BsTrashFill } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';
import ControlledTextInput from '../../../Form/ControlledTextInput';
import ErrorSummary from '../../../Form/ErrorSummary';
import { IAlert } from '../../../models/IAlert';
import { Nestable } from '../../../models/Nestable';
import { Parentable } from '../../../models/Parentable';
import { ITag, PutTagSchema } from '../../../Nexus/entities/ITag';
import { useAppDispatch } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import {
  editTag,
  putSelectedProjectThunk,
  removeTag
} from '../../../store/reducers/project-reducer';

interface IProps {
  element: Parentable<ITag>;
}

export default function EditTagForm({ element }: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const [validated] = useState(false);
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Parentable<ITag>>({
    resolver: joiResolver(PutTagSchema),
    defaultValues: element
  });

  useEffect(() => {
    if (element) {
      reset(JSON.parse(JSON.stringify(element)));
    }
  }, [element, reset]);

  const onEditTagSubmit = (post: Nestable<ITag>) => {
    const postTag = { ...post };
    if (postTag.children) {
      delete postTag.children;
    }
    if (postTag.level) {
      delete postTag.level;
    }
    const alert: IAlert = {
      id: uuidv4(),
      style: 'success',
      text: 'Successfully edited tag'
    };
    dispatch(editTag(postTag as Parentable<ITag>));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      dispatch(addAlert({ alert }));
      reset();
    });
  };

  const deleteTag = () => {
    const deletableTag = { ...element };
    dispatch(removeTag(deletableTag));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      reset();
    });

    const alert: IAlert = {
      id: uuidv4(),
      style: 'success',
      text: 'Successfully edited tag'
    };
    dispatch(addAlert({ alert }));
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Form
          onSubmit={handleSubmit((post) => onEditTagSubmit(post))}
          autoComplete="off"
          noValidate
          validated={validated}
        >
          <ControlledTextInput
            control={control}
            name="title"
            label={t('Title')}
            error={get(errors, `description`) as FieldError}
          />
          <Button variant="primary">{t('save')}</Button>
          <Button variant="warning" onClick={deleteTag}>
            {t('delete')} <BsTrashFill />
          </Button>

          <ErrorSummary errors={errors} />
        </Form>
      </Card.Body>
    </Card>
  );
}
