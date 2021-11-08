import { joiResolver } from '@hookform/resolvers/joi';
import { get } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FieldError, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BsTrashFill } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';
import ControlledTextInput from '../../Form/ControlledTextInput';
import ErrorSummary from '../../Form/ErrorSummary';
import { Alert } from '../../models/Alert';
import { Code, EditCodeSchema } from '../../models/Code';
import { AccordionContext } from '../../NestableHierarchy/AccordionContext';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addAlert } from '../../store/reducers/alert-reducer';
import {
  editCodeInCodelist,
  putSelectedProjectThunk,
  removeCode
} from '../../store/reducers/project-reducer';
import {
  editCodeInSelectedCodelist,
  removeCodeInSelectedCodelist
} from '../../store/reducers/selectedCodelist-reducer';

interface IProps {
  element: Code;
}

export default function EditCodeForm({ element }: IProps): React.ReactElement {
  const { codelist } = useAppSelector((state) => state.selectedCodeList);
  const { onOpenClose } = useContext(AccordionContext);
  const dispatch = useAppDispatch();
  const [validated] = useState(false);
  const { t } = useTranslation();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<Code>({
    resolver: joiResolver(EditCodeSchema),
    defaultValues: element
  });

  useEffect(() => {
    if (element) {
      reset(JSON.parse(JSON.stringify(element)));
    }
  }, [element, reset]);

  const onSubmit = (code: Code) => {
    const alert: Alert = {
      id: uuidv4(),
      style: 'success',
      text: 'Successfully edited code'
    };
    dispatch(
      editCodeInCodelist({
        codelistId: codelist.id,
        code
      })
    );
    dispatch(editCodeInSelectedCodelist(code));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      dispatch(addAlert({ alert }));
    });

    onOpenClose('');
  };

  const deleteCode = (code: Code) => {
    dispatch(
      removeCode({
        codelistId: codelist.id,
        code
      })
    );
    dispatch(removeCodeInSelectedCodelist(code));
    dispatch(putSelectedProjectThunk('dummy'));
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      noValidate
      validated={validated}
    >
      <ControlledTextInput
        control={control}
        name="title"
        error={get(errors, `title`) as FieldError}
        label="Title"
      />
      <ControlledTextInput
        control={control}
        name="description"
        error={get(errors, `description`) as FieldError}
        label={t('Description')}
      />
      <Button className="mt-2  ml-3" type="submit">
        {t('save')}
      </Button>
      <Button className="mt-2 ml-3 btn-warning" onClick={() => onOpenClose('')}>
        {t('cancel')}
      </Button>
      <Button
        className="mt-2  ml-3"
        variant="warning"
        onClick={() => deleteCode(element)}
      >
        {t('delete')} <BsTrashFill />
      </Button>
      <ErrorSummary errors={errors} />
    </Form>
  );
}
