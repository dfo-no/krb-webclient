import { joiResolver } from '@hookform/resolvers/joi';
import React, { ReactElement, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BsTrashFill } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';
import ErrorSummary from '../../Form/ErrorSummary';
import InputRow from '../../Form/InputRow';
import { Alert } from '../../models/Alert';
import { BaseTagSchema, Tag } from '../../models/Tag';
import { useAppDispatch } from '../../store/hooks';
import { addAlert } from '../../store/reducers/alert-reducer';
import {
  editTag,
  putSelectedProjectThunk,
  removeTag
} from '../../store/reducers/project-reducer';

interface IProps {
  element: Tag;
}

export default function EditTagForm({ element }: IProps): ReactElement {
  const dispatch = useAppDispatch();
  const [validated] = useState(false);
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Tag>({
    resolver: joiResolver(BaseTagSchema),
    defaultValues: element
  });

  const onEditTagSubmit = (post: Tag) => {
    const newTag = { ...post };
    if (newTag.children) {
      delete newTag.children;
    }
    dispatch(editTag(newTag));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      reset();
    });

    const alert: Alert = {
      id: uuidv4(),
      style: 'success',
      text: 'Successfully edited tag'
    };
    dispatch(addAlert({ alert }));
  };

  const deleteTag = () => {
    const deletableTag = { ...element };
    if (deletableTag.children) {
      delete deletableTag.children;
    }
    dispatch(removeTag(deletableTag));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      reset();
    });

    const alert: Alert = {
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
          onSubmit={handleSubmit(onEditTagSubmit)}
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

          <Button className="mt-2  ml-3" type="submit">
            {t('save')}
          </Button>
          <Button className="mt-2  ml-3" variant="warning" onClick={deleteTag}>
            {t('delete')} <BsTrashFill />
          </Button>

          <ErrorSummary errors={errors} />
        </Form>
      </Card.Body>
    </Card>
  );
}
