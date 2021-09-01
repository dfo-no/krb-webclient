import { joiResolver } from '@hookform/resolvers/joi';
import React, { ReactElement, useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BsTrashFill } from 'react-icons/bs';
import ErrorSummary from '../../Form/ErrorSummary';
import InputRow from '../../Form/InputRow';
import { Code, EditCodeSchema } from '../../models/Code';
import { AccordionContext } from '../../NestableHierarchy/AccordionContext';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
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

export default function EditCodeForm({ element }: IProps): ReactElement {
  const { codelist } = useAppSelector((state) => state.selectedCodeList);
  const { onOpenClose } = useContext(AccordionContext);
  const dispatch = useAppDispatch();
  const [validated] = useState(false);
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<Code>({
    resolver: joiResolver(EditCodeSchema),
    defaultValues: element
  });

  const onSubmit = (code: Code) => {
    dispatch(
      editCodeInCodelist({
        codelistId: codelist.id,
        code
      })
    );
    dispatch(editCodeInSelectedCodelist(code));
    dispatch(putSelectedProjectThunk('dummy'));
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
        <Button
          className="mt-2 ml-3 btn-warning"
          onClick={() => onOpenClose('')}
        >
          {t('cancel')}
        </Button>
        <Button
          className="mt-2  ml-3"
          variant="warning"
          onClick={() => deleteCode(element)}
        >
          {t('delete')} <BsTrashFill />
        </Button>
      </Row>
      <ErrorSummary errors={errors} />
    </Form>
  );
}
