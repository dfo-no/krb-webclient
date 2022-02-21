import { joiResolver } from '@hookform/resolvers/joi';
import React, { useEffect, useState } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
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

  return <p>Hello world</p>;
}
