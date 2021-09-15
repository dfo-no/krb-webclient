import { joiResolver } from '@hookform/resolvers/joi';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BsTrashFill } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import ErrorSummary from '../../Form/ErrorSummary';
import InputRow from '../../Form/InputRow';
import { BaseTagSchema, Tag } from '../../models/Tag';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  editTag,
  putSelectedProjectThunk,
  removeTag
} from '../../store/reducers/project-reducer';

interface IProps {
  tag: Tag;
}

export default function EditTagForm({ tag }: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const [validated] = useState(false);
  const { t } = useTranslation();

  const { project } = useAppSelector((state) => state.project);
  const history = useHistory();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Tag>({
    resolver: joiResolver(BaseTagSchema),
    defaultValues: tag
  });

  const onEditTagSubmit = (post: Tag) => {
    dispatch(editTag(post));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      reset();
    });
  };

  const deleteTag = () => {
    dispatch(removeTag(tag));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      history.push(`/workbench/${project.id}/codelist`);
    });
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
          <Row>
            <Button className="mt-2  ml-3" type="submit">
              {t('save')}
            </Button>
            <Button
              className="mt-2  ml-3"
              variant="warning"
              onClick={deleteTag}
            >
              {t('delete')} <BsTrashFill />
            </Button>
          </Row>
          <ErrorSummary errors={errors} />
        </Form>
      </Card.Body>
    </Card>
  );
}
