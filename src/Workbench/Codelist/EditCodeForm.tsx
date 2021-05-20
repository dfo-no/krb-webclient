import { joiResolver } from '@hookform/resolvers/joi';
import React, { ReactElement, useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { useDispatch, useSelector } from 'react-redux';
import { BsTrashFill } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { Code } from '../../models/Code';

import {
  deleteCodeInCodelist,
  editCodeInCodelist,
  putProjectThunk
} from '../../store/reducers/project-reducer';
import { RootState } from '../../store/store';
import { AccordionContext } from '../../NestableHierarchy/AccordionContext';
import InputRow from '../../Form/InputRow';
import ErrorSummary from '../../Form/ErrorSummary';

interface IProps {
  element: Code;
}

type FormInput = {
  title: string;
  description: string;
};

const codeSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required()
});

export default function EditCodeForm({ element }: IProps): ReactElement {
  const { id } = useSelector((state: RootState) => state.selectedProject);
  const { listId } = useSelector((state: RootState) => state.selectedCodeList);
  const { onOpenClose } = useContext(AccordionContext);
  const dispatch = useDispatch();
  const [validated] = useState(false);
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(codeSchema),
    defaultValues: {
      title: element.title,
      description: element.description
    }
  });
  if (!id) {
    return <p>No project selected</p>;
  }

  if (!listId) {
    return <p>No codelist selected</p>;
  }

  const edit = (post: FormInput) => {
    const newCode = { ...element };
    newCode.title = post.title;
    newCode.description = post.description;
    dispatch(
      editCodeInCodelist({
        projectId: id,
        codelistId: listId,
        code: newCode
      })
    );
    dispatch(putProjectThunk(id));
    onOpenClose('');
  };

  const removeCode = () => {
    dispatch(
      deleteCodeInCodelist({
        projectId: id,
        codelistId: listId,
        codeId: element.id
      })
    );
    dispatch(putProjectThunk(id));
  };

  return (
    <Form
      onSubmit={handleSubmit(edit)}
      autoComplete="off"
      noValidate
      validated={validated}
    >
      <InputRow control={control} name="title" errors={errors} label="Title" />
      <InputRow
        control={control}
        name="description"
        errors={errors}
        label={t('Description')}
      />
      <Row>
        <Button className="mt-2  ml-3" type="submit">
          {t('save')}
        </Button>
        <Button className="mt-2  ml-3" variant="warning" onClick={removeCode}>
          {t('delete')} <BsTrashFill />
        </Button>
      </Row>
      <ErrorSummary errors={errors} />
    </Form>
  );
}
