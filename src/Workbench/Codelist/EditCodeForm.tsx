import { joiResolver } from '@hookform/resolvers/joi';
import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BsTrashFill } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';
import ErrorSummary from '../../Form/ErrorSummary';
import InputRow from '../../Form/InputRow';
import { IAlert } from '../../models/IAlert';
import { EditCodeSchema, ICode } from '../../models/ICode';
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
  element: ICode;
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
  } = useForm<ICode>({
    resolver: joiResolver(EditCodeSchema),
    defaultValues: element
  });

  useEffect(() => {
    if (element) {
      reset(JSON.parse(JSON.stringify(element)));
    }
  }, [element, reset]);

  const onSubmit = (code: ICode) => {
    const alert: IAlert = {
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

  const deleteCode = (code: ICode) => {
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
